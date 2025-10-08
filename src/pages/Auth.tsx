import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { supabase } from '@/integrations/supabase/client';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Separator } from '@/components/ui/separator';
import { useToast } from '@/hooks/use-toast';
import { Loader2, Heart, Eye, EyeOff, Mail, Lock, User as UserIcon, ArrowRight } from 'lucide-react';
import SEO from '@/components/SEO';

type UserType = 'volunteer' | 'organization' | 'school_coordinator';

export default function Auth() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(false);
  const [mode, setMode] = useState<'login' | 'signup'>('login');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Login state
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  
  // Signup state
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupPasswordConfirm, setSignupPasswordConfirm] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [userType, setUserType] = useState<UserType>('volunteer');
  const [dateOfBirth, setDateOfBirth] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const { data, error } = await supabase.auth.signInWithPassword({
        email: loginEmail,
        password: loginPassword,
      });

      if (error) {
        toast({
          variant: 'destructive',
          title: '❌ Błąd logowania',
          description: error.message === 'Invalid login credentials' 
            ? 'Nieprawidłowy email lub hasło' 
            : error.message,
        });
        return;
      }

      if (data.user) {
        toast({
          title: '✅ Zalogowano pomyślnie!',
          description: 'Witamy z powrotem! 🎉',
        });
        navigate('/');
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: '❌ Ups! Coś poszło nie tak',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validation
    if (signupPassword !== signupPasswordConfirm) {
      toast({
        variant: 'destructive',
        title: '❌ Błąd',
        description: 'Hasła nie są identyczne',
      });
      return;
    }

    if (signupPassword.length < 6) {
      toast({
        variant: 'destructive',
        title: '❌ Błąd',
        description: 'Hasło musi mieć minimum 6 znaków',
      });
      return;
    }

    setLoading(true);

    try {
      const redirectUrl = `${window.location.origin}/`;
      
      const { data, error } = await supabase.auth.signUp({
        email: signupEmail,
        password: signupPassword,
        options: {
          emailRedirectTo: redirectUrl,
          data: {
            first_name: firstName,
            last_name: lastName,
            user_type: userType,
            date_of_birth: userType === 'volunteer' ? dateOfBirth : null,
          },
        },
      });

      if (error) {
        toast({
          variant: 'destructive',
          title: '❌ Błąd rejestracji',
          description: error.message,
        });
        return;
      }

      if (data.user) {
        toast({
          title: '✅ Udało się! Konto utworzone!',
          description: 'Możesz się teraz zalogować 🎉',
        });
        
        // Auto-login since email is auto-confirmed
        const { error: loginError } = await supabase.auth.signInWithPassword({
          email: signupEmail,
          password: signupPassword,
        });

        if (!loginError) {
          navigate('/');
        }
      }
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: '❌ Ups! Coś poszło nie tak',
        description: error.message,
      });
    } finally {
      setLoading(false);
    }
  };

  // Check if user is logged in and redirect
  useState(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      if (session) {
        navigate('/');
      }
    });
  });

  const handleGoogleLogin = async () => {
    setLoading(true);
    try {
      const { error } = await supabase.auth.signInWithOAuth({
        provider: 'google',
        options: {
          redirectTo: `${window.location.origin}/`,
        },
      });
      if (error) throw error;
    } catch (error: any) {
      toast({
        variant: 'destructive',
        title: '❌ Błąd logowania',
        description: error.message,
      });
      setLoading(false);
    }
  };

  return (
    <>
      <SEO
        title="Zaloguj się - FOMOjobs"
        description="Zaloguj się do swojego konta FOMOjobs i dołącz do społeczności wolontariuszy w Krakowie."
      />
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary via-accent to-primary/90 dark:from-primary/80 dark:via-accent/80 dark:to-primary/70 p-4">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full max-w-md"
        >
          <div className="text-center mb-8">
            <div className="flex items-center justify-center gap-2 mb-4">
              <Heart className="h-10 w-10 text-white fill-white drop-shadow-lg" />
              <h1 className="text-4xl font-bold text-white drop-shadow-md">
                FOMO<span className="text-secondary">jobs</span>
              </h1>
            </div>
            <p className="text-white/95 text-lg font-medium drop-shadow">
              Dołącz do społeczności wolontariuszy w Krakowie!
            </p>
          </div>

          <Card className="border-0 shadow-2xl bg-card/98 backdrop-blur-sm">
          <Tabs value={mode} onValueChange={(v) => setMode(v as 'login' | 'signup')}>
            <TabsList className="grid w-full grid-cols-2">
              <TabsTrigger value="login">Logowanie</TabsTrigger>
              <TabsTrigger value="signup">Rejestracja</TabsTrigger>
            </TabsList>

            <TabsContent value="login">
              <CardHeader>
                <CardTitle className="text-2xl">Zaloguj się</CardTitle>
                <CardDescription>Witamy z powrotem! Wprowadź swoje dane logowania.</CardDescription>
              </CardHeader>
              <CardContent className="space-y-6">
                <form onSubmit={handleLogin} className="space-y-4">
                  <div className="space-y-2">
                    <Label htmlFor="login-email" className="font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-email"
                        type="email"
                        placeholder="twoj@email.pl"
                        value={loginEmail}
                        onChange={(e) => setLoginEmail(e.target.value)}
                        className="pl-10 h-12"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="login-password" className="font-medium">Hasło</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="login-password"
                        type={showLoginPassword ? "text" : "password"}
                        placeholder="Wprowadź hasło"
                        value={loginPassword}
                        onChange={(e) => setLoginPassword(e.target.value)}
                        className="pl-10 pr-10 h-12"
                        required
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowLoginPassword(!showLoginPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        disabled={loading}
                      >
                        {showLoginPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-primary hover:shadow-primary text-white font-semibold text-lg"
                    disabled={loading}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Zaloguj się
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>

                <div className="relative">
                  <Separator />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="bg-card px-4 text-sm text-muted-foreground">lub</span>
                  </div>
                </div>

                <Button
                  variant="outline"
                  className="w-full h-12 border-2"
                  onClick={handleGoogleLogin}
                  disabled={loading}
                >
                  <svg className="mr-2 w-5 h-5" viewBox="0 0 24 24">
                    <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                    <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                    <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
                    <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
                  </svg>
                  Zaloguj przez Google
                </Button>
              </CardContent>
            </TabsContent>

            <TabsContent value="signup">
              <CardHeader>
                <CardTitle className="text-2xl">Dołącz do nas!</CardTitle>
                <CardDescription>Utwórz nowe konto i zacznij wolontariat</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSignup} className="space-y-4">
                  <div className="space-y-3">
                    <Label className="font-medium">Kim jesteś?</Label>
                    <RadioGroup value={userType} onValueChange={(v) => setUserType(v as UserType)}>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-transparent hover:border-primary/20 transition-colors">
                        <RadioGroupItem value="volunteer" id="volunteer" />
                        <Label htmlFor="volunteer" className="cursor-pointer font-normal flex-1">
                          👤 Wolontariusz
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-transparent hover:border-primary/20 transition-colors">
                        <RadioGroupItem value="organization" id="organization" />
                        <Label htmlFor="organization" className="cursor-pointer font-normal flex-1">
                          🏢 Organizacja
                        </Label>
                      </div>
                      <div className="flex items-center space-x-2 p-3 rounded-lg border-2 border-transparent hover:border-primary/20 transition-colors">
                        <RadioGroupItem value="school_coordinator" id="coordinator" />
                        <Label htmlFor="coordinator" className="cursor-pointer font-normal flex-1">
                          🎓 Koordynator Szkolny
                        </Label>
                      </div>
                    </RadioGroup>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="first-name" className="font-medium">Imię</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="first-name"
                          type="text"
                          placeholder="Jan"
                          value={firstName}
                          onChange={(e) => setFirstName(e.target.value)}
                          className="pl-10 h-11"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="last-name" className="font-medium">Nazwisko</Label>
                      <div className="relative">
                        <UserIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                        <Input
                          id="last-name"
                          type="text"
                          placeholder="Kowalski"
                          value={lastName}
                          onChange={(e) => setLastName(e.target.value)}
                          className="pl-10 h-11"
                          required
                          disabled={loading}
                        />
                      </div>
                    </div>
                  </div>

                  {userType === 'volunteer' && (
                    <div className="space-y-2">
                      <Label htmlFor="dob">Data urodzenia</Label>
                      <Input
                        id="dob"
                        type="date"
                        value={dateOfBirth}
                        onChange={(e) => setDateOfBirth(e.target.value)}
                        max={new Date().toISOString().split('T')[0]}
                        required
                        disabled={loading}
                      />
                    </div>
                  )}

                  <div className="space-y-2">
                    <Label htmlFor="signup-email" className="font-medium">Email</Label>
                    <div className="relative">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-email"
                        type="email"
                        placeholder="twoj@email.pl"
                        value={signupEmail}
                        onChange={(e) => setSignupEmail(e.target.value)}
                        className="pl-10 h-11"
                        required
                        disabled={loading}
                      />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password" className="font-medium">Hasło (min. 6 znaków)</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-password"
                        type={showSignupPassword ? "text" : "password"}
                        placeholder="••••••"
                        value={signupPassword}
                        onChange={(e) => setSignupPassword(e.target.value)}
                        className="pl-10 pr-10 h-11"
                        required
                        minLength={6}
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowSignupPassword(!showSignupPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        disabled={loading}
                      >
                        {showSignupPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="signup-password-confirm" className="font-medium">Potwierdź hasło</Label>
                    <div className="relative">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                      <Input
                        id="signup-password-confirm"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="••••••"
                        value={signupPasswordConfirm}
                        onChange={(e) => setSignupPasswordConfirm(e.target.value)}
                        className="pl-10 pr-10 h-11"
                        required
                        minLength={6}
                        disabled={loading}
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                        disabled={loading}
                      >
                        {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>

                  {(userType === 'organization' || userType === 'school_coordinator') && (
                    <div className="bg-muted/50 p-3 rounded-md text-sm">
                      <p className="text-muted-foreground">
                        ⏳ Twoje konto będzie czekać na weryfikację. Skontaktujemy się z Tobą wkrótce!
                      </p>
                    </div>
                  )}

                  <Button
                    type="submit"
                    className="w-full h-12 bg-gradient-primary hover:shadow-primary text-white font-semibold text-lg"
                    disabled={loading}
                  >
                    {loading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Zapisz się!
                    <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </form>
              </CardContent>
            </TabsContent>
          </Tabs>
        </Card>

        <div className="mt-6 text-center">
          <Button
            variant="ghost"
            onClick={() => navigate('/')}
            className="text-white hover:text-white/90 hover:bg-white/10 font-medium"
          >
            ← Wróć do strony głównej
          </Button>
        </div>
      </motion.div>
    </div>
    </>
  );
}
