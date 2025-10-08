// Legacy volunteer store - kept for backward compatibility with Calendar page
// TODO: Migrate Calendar.tsx to job-related events instead of volunteering

import { create } from 'zustand';
import type { VolunteerOpportunity } from '@/types/volunteer.types';

interface VolunteerState {
  opportunities: VolunteerOpportunity[];
  setOpportunities: (opportunities: VolunteerOpportunity[]) => void;
}

export const useVolunteerStore = create<VolunteerState>((set) => ({
  opportunities: [],
  setOpportunities: (opportunities) => set({ opportunities }),
}));
