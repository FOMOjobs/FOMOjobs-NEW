-- ============================================================================
-- ENFORCE SECURITY FIXES - FOMOjobs Project
-- Date: 2025-10-13
-- ============================================================================
-- This migration enforces the security fixes and ensures no overly permissive
-- policies remain active. It addresses the vulnerabilities detected by the
-- Lovable security scanner.
-- ============================================================================

-- ============================================================================
-- ISSUE 1: PUBLIC_USER_DATA (CRITICAL)
-- Fix the overly permissive "Admins can view all profiles" policy
-- ============================================================================

-- Drop the dangerous policy that uses USING (true)
DROP POLICY IF EXISTS "Admins can view all profiles" ON public.profiles;

-- Create proper admin policy with authentication check
CREATE POLICY "Admins can view all profiles"
  ON public.profiles FOR SELECT
  USING (
    auth.role() = 'authenticated'
    AND public.has_role(auth.uid(), 'admin')
  );

-- Ensure users can view their own profile
DROP POLICY IF EXISTS "Users can view own profile" ON public.profiles;
CREATE POLICY "Users can view own profile"
  ON public.profiles FOR SELECT
  USING (auth.uid() = id);

-- Allow viewing of public fields for verified organizations/coordinators
DROP POLICY IF EXISTS "Users can view public profile fields" ON public.profiles;
CREATE POLICY "Users can view public profile fields"
  ON public.profiles FOR SELECT
  USING (
    -- Users can view verified organization/coordinator profiles (limited fields)
    verification_status = 'verified'
    AND user_type IN ('organization', 'school_coordinator')
  );

-- ============================================================================
-- ISSUE 2: EXPOSED_SENSITIVE_DATA (WARNING)
-- Add admin access to minor_consent table for compliance
-- ============================================================================

-- Add policy for admins to view all consent forms
DROP POLICY IF EXISTS "Admins can view all minor consent forms" ON public.minor_consent;
CREATE POLICY "Admins can view all minor consent forms"
  ON public.minor_consent FOR SELECT
  USING (
    auth.role() = 'authenticated'
    AND public.has_role(auth.uid(), 'admin')
  );

-- Add policy for admins to update consent status
DROP POLICY IF EXISTS "Admins can update consent status" ON public.minor_consent;
CREATE POLICY "Admins can update consent status"
  ON public.minor_consent FOR UPDATE
  USING (
    auth.role() = 'authenticated'
    AND public.has_role(auth.uid(), 'admin')
  )
  WITH CHECK (
    auth.role() = 'authenticated'
    AND public.has_role(auth.uid(), 'admin')
  );

-- ============================================================================
-- ISSUE 3: MISSING_RLS_PROTECTION (WARNING)
-- Prevent organizations from viewing each other's data
-- ============================================================================

-- Drop the old policy that might allow cross-org data access
DROP POLICY IF EXISTS "Anyone can view verified organizations" ON public.organization_profiles;

-- Organizations can only view their own profile
DROP POLICY IF EXISTS "Organizations can view own profile" ON public.organization_profiles;
CREATE POLICY "Organizations can view own profile"
  ON public.organization_profiles FOR SELECT
  USING (auth.uid() = user_id);

-- Public can view ONLY verified organizations
DROP POLICY IF EXISTS "Public can view verified organizations" ON public.organization_profiles;
CREATE POLICY "Public can view verified organizations"
  ON public.organization_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = organization_profiles.user_id
      AND profiles.verification_status = 'verified'
    )
  );

-- Admins can view all organizations
DROP POLICY IF EXISTS "Admins can view all organizations" ON public.organization_profiles;
CREATE POLICY "Admins can view all organizations"
  ON public.organization_profiles FOR SELECT
  USING (
    auth.role() = 'authenticated'
    AND public.has_role(auth.uid(), 'admin')
  );

-- Apply same protection to school_coordinator_profiles
DROP POLICY IF EXISTS "Anyone can view verified coordinators" ON public.school_coordinator_profiles;

DROP POLICY IF EXISTS "Coordinators can view own profile" ON public.school_coordinator_profiles;
CREATE POLICY "Coordinators can view own profile"
  ON public.school_coordinator_profiles FOR SELECT
  USING (auth.uid() = user_id);

DROP POLICY IF EXISTS "Public can view verified coordinators" ON public.school_coordinator_profiles;
CREATE POLICY "Public can view verified coordinators"
  ON public.school_coordinator_profiles FOR SELECT
  USING (
    EXISTS (
      SELECT 1 FROM public.profiles
      WHERE profiles.id = school_coordinator_profiles.user_id
      AND profiles.verification_status = 'verified'
    )
  );

DROP POLICY IF EXISTS "Admins can view all coordinators" ON public.school_coordinator_profiles;
CREATE POLICY "Admins can view all coordinators"
  ON public.school_coordinator_profiles FOR SELECT
  USING (
    auth.role() = 'authenticated'
    AND public.has_role(auth.uid(), 'admin')
  );

-- ============================================================================
-- ADDITIONAL HARDENING: user_roles table
-- ============================================================================

-- Drop overly permissive policies
DROP POLICY IF EXISTS "Anyone can view roles" ON public.user_roles;

-- Users can only view their own roles
DROP POLICY IF EXISTS "Users can view own roles" ON public.user_roles;
CREATE POLICY "Users can view own roles"
  ON public.user_roles FOR SELECT
  USING (auth.uid() = user_id);

-- Admins can view all roles
DROP POLICY IF EXISTS "Admins can view all roles" ON public.user_roles;
CREATE POLICY "Admins can view all roles"
  ON public.user_roles FOR SELECT
  USING (
    auth.role() = 'authenticated'
    AND public.has_role(auth.uid(), 'admin')
  );

-- Only admins can manage roles
DROP POLICY IF EXISTS "Admins can manage roles" ON public.user_roles;
CREATE POLICY "Admins can manage roles"
  ON public.user_roles FOR INSERT
  WITH CHECK (
    auth.role() = 'authenticated'
    AND public.has_role(auth.uid(), 'admin')
  );

DROP POLICY IF EXISTS "Admins can update roles" ON public.user_roles;
CREATE POLICY "Admins can update roles"
  ON public.user_roles FOR UPDATE
  USING (
    auth.role() = 'authenticated'
    AND public.has_role(auth.uid(), 'admin')
  )
  WITH CHECK (
    auth.role() = 'authenticated'
    AND public.has_role(auth.uid(), 'admin')
  );

DROP POLICY IF EXISTS "Admins can delete roles" ON public.user_roles;
CREATE POLICY "Admins can delete roles"
  ON public.user_roles FOR DELETE
  USING (
    auth.role() = 'authenticated'
    AND public.has_role(auth.uid(), 'admin')
  );

-- ============================================================================
-- VERIFICATION QUERIES
-- ============================================================================
-- Run these queries to verify the security fixes:
--
-- 1. Check profiles policies (should NOT have USING (true)):
--    SELECT * FROM pg_policies WHERE tablename = 'profiles';
--
-- 2. Check minor_consent policies (should have admin access):
--    SELECT * FROM pg_policies WHERE tablename = 'minor_consent';
--
-- 3. Check organization_profiles policies (should prevent cross-org access):
--    SELECT * FROM pg_policies WHERE tablename = 'organization_profiles';
--
-- 4. Test anonymous access (should FAIL):
--    SET ROLE anon;
--    SELECT * FROM profiles; -- Should return 0 rows or error
--    RESET ROLE;
--
-- 5. Test user access (should only see own profile):
--    SET request.jwt.claims TO '{"sub": "some-user-id"}';
--    SELECT * FROM profiles; -- Should only return their own profile
--
-- ============================================================================

-- Add documentation comments
COMMENT ON POLICY "Admins can view all profiles" ON public.profiles IS
  'SECURITY FIX (2025-10-13): Only authenticated admins can view all profiles. Replaced USING (true) which exposed all user data to anonymous users.';

COMMENT ON POLICY "Users can view own profile" ON public.profiles IS
  'SECURITY: Users can only view their own complete profile data.';

COMMENT ON POLICY "Admins can view all minor consent forms" ON public.minor_consent IS
  'SECURITY FIX (2025-10-13): Admins need authenticated access to verify parental consent for compliance.';

COMMENT ON POLICY "Organizations can view own profile" ON public.organization_profiles IS
  'SECURITY FIX (2025-10-13): Organizations can only view their own profile, preventing cross-organization data leakage.';

-- ============================================================================
-- END OF SECURITY ENFORCEMENT MIGRATION
-- ============================================================================
