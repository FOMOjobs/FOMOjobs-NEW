import React, { useState } from 'react';
import { Send, Bug, Heart, Lightbulb, MessageSquare, CheckCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useToast } from '@/hooks/use-toast';
import FOMOJobsNavbar from '@/components/FOMOJobsNavbar';
import FOMOJobsFooter from '@/components/landing/FOMOJobsFooter';
import { Helmet } from 'react-helmet-async';

/**
 * FeedbackPage - Zgłoś problem / Daj feedback
 *
 * Przyjazna strona do zgłaszania błędów i feedbacku
 * Casual tone, emoji, przyjazna atmosfera
 */

type FeedbackType = 'bug' | 'feature' | 'praise' | 'other';

const FeedbackPage: React.FC = () => {
  const { toast } = useToast();
  const [selectedType, setSelectedType] = useState<FeedbackType | null>(null);
  const [message, setMessage] = useState('');
  const [email, setEmail] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const feedbackTypes = [
    {
      id: 'bug' as FeedbackType,
      icon: Bug,
      title: '🐛 Coś nie działa',
      description: 'Znalazłeś błąd? Daj nam znać!',
      color: 'from-red-500 to-orange-500',
      bgColor: 'bg-red-50 dark:bg-red-950/20',
      borderColor: 'border-red-200 dark:border-red-800'
    },
    {
      id: 'feature' as FeedbackType,
      icon: Lightbulb,
      title: '💡 Mam pomysł',
      description: 'Podziel się swoją wizją!',
      color: 'from-yellow-500 to-orange-500',
      bgColor: 'bg-yellow-50 dark:bg-yellow-950/20',
      borderColor: 'border-yellow-200 dark:border-yellow-800'
    },
    {
      id: 'praise' as FeedbackType,
      icon: Heart,
      title: '❤️ Pochwała',
      description: 'Coś Ci się spodobało? Super!',
      color: 'from-pink-500 to-purple-500',
      bgColor: 'bg-pink-50 dark:bg-pink-950/20',
      borderColor: 'border-pink-200 dark:border-pink-800'
    },
    {
      id: 'other' as FeedbackType,
      icon: MessageSquare,
      title: '💬 Inne',
      description: 'Po prostu chcesz pogadać? Też fajnie!',
      color: 'from-blue-500 to-cyan-500',
      bgColor: 'bg-blue-50 dark:bg-blue-950/20',
      borderColor: 'border-blue-200 dark:border-blue-800'
    }
  ];

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!selectedType || !message.trim()) {
      toast({
        title: 'Hej! 👋',
        description: 'Wybierz typ feedbacku i napisz wiadomość.',
        variant: 'destructive'
      });
      return;
    }

    setIsSubmitting(true);

    try {
      // TODO: Replace with actual API call
      // await api.post('/api/feedback', {
      //   type: selectedType,
      //   message,
      //   email: email || null,
      //   url: window.location.href,
      //   userAgent: navigator.userAgent
      // });

      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      setSubmitted(true);
      toast({
        title: '✅ Dzięki wielkie!',
        description: 'Twój feedback został wysłany. Odezwiemy się wkrótce!'
      });

      // Reset after 3 seconds
      setTimeout(() => {
        setSubmitted(false);
        setSelectedType(null);
        setMessage('');
        setEmail('');
      }, 3000);

    } catch (error) {
      toast({
        title: 'Ups! 😅',
        description: 'Coś poszło nie tak. Spróbuj ponownie.',
        variant: 'destructive'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <>
      <Helmet>
        <title>Feedback - Zgłoś problem lub pomysł | FOMOjobs</title>
        <meta
          name="description"
          content="Masz pomysł? Znalazłeś błąd? A może chcesz po prostu powiedzieć hej? Napisz do nas!"
        />
      </Helmet>

      <FOMOJobsNavbar />

      <div className="min-h-screen bg-gradient-to-br from-purple-50 via-white to-yellow-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 relative overflow-hidden pt-16">

        {/* Animated gradient orbs */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-300 dark:bg-purple-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-blob" />
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-yellow-300 dark:bg-yellow-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-30 dark:opacity-20 animate-blob animation-delay-4000" />
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-80 h-80 bg-pink-300 dark:bg-pink-600/30 rounded-full mix-blend-multiply dark:mix-blend-normal filter blur-xl opacity-20 dark:opacity-10 animate-blob animation-delay-2000" />
        </div>

        {/* Content */}
        <div className="relative z-10 container max-w-4xl mx-auto px-4 py-16">

          {/* Header */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-to-r from-purple-600 to-yellow-500 bg-clip-text text-transparent">
              Hej! Odzywamy się? 👋
            </h1>
            <p className="text-lg md:text-xl text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
              Znalazłeś błąd? Masz pomysł? A może po prostu chcesz powiedzieć "hej"?
              Jesteśmy tu dla Ciebie! 💜
            </p>
          </div>

          {/* Success State */}
          {submitted ? (
            <div className="max-w-md mx-auto bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 text-center animate-in fade-in zoom-in duration-300">
              <div className="w-20 h-20 bg-gradient-to-r from-green-400 to-emerald-500 rounded-full flex items-center justify-center mx-auto mb-4">
                <CheckCircle className="w-10 h-10 text-white" />
              </div>
              <h2 className="text-2xl font-bold mb-2">Dzięki wielkie! 🎉</h2>
              <p className="text-gray-600 dark:text-gray-300">
                Twoja wiadomość dotarła do nas. Odezwiemy się wkrótce!
              </p>
            </div>
          ) : (
            <>
              {/* Feedback Type Selection */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                {feedbackTypes.map((type) => {
                  const Icon = type.icon;
                  const isSelected = selectedType === type.id;

                  return (
                    <button
                      key={type.id}
                      onClick={() => setSelectedType(type.id)}
                      className={`
                        p-6 rounded-2xl border-2 transition-all duration-300
                        ${isSelected
                          ? `${type.bgColor} ${type.borderColor} shadow-lg scale-105`
                          : 'bg-white dark:bg-gray-800 border-gray-200 dark:border-gray-700 hover:shadow-md hover:scale-102'
                        }
                      `}
                    >
                      <div className="flex items-start gap-4">
                        <div className={`
                          w-12 h-12 rounded-xl flex items-center justify-center flex-shrink-0
                          bg-gradient-to-r ${type.color}
                        `}>
                          <Icon className="w-6 h-6 text-white" />
                        </div>
                        <div className="text-left">
                          <h3 className="font-bold text-lg mb-1">{type.title}</h3>
                          <p className="text-sm text-gray-600 dark:text-gray-400">
                            {type.description}
                          </p>
                        </div>
                      </div>
                    </button>
                  );
                })}
              </div>

              {/* Feedback Form */}
              {selectedType && (
                <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 space-y-6 animate-in fade-in slide-in-from-bottom duration-300">

                  {/* Message */}
                  <div>
                    <Label htmlFor="message" className="text-base font-semibold mb-2">
                      Co chcesz nam powiedzieć? 💬
                    </Label>
                    <Textarea
                      id="message"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      placeholder={
                        selectedType === 'bug'
                          ? 'Np. "Gdy klikam Zapisz CV, wyskakuje błąd..."'
                          : selectedType === 'feature'
                          ? 'Np. "Fajnie byłoby dodać eksport do LinkedIn..."'
                          : selectedType === 'praise'
                          ? 'Np. "Kreator CV jest genialny! Dzięki za to!"'
                          : 'Napisz co masz na myśli...'
                      }
                      rows={6}
                      className="resize-none"
                      required
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Im więcej szczegółów, tym lepiej! (ale nie musisz pisać eseju 😊)
                    </p>
                  </div>

                  {/* Email (optional) */}
                  <div>
                    <Label htmlFor="email" className="text-base font-semibold mb-2">
                      Twój email (opcjonalnie) 📧
                    </Label>
                    <Input
                      id="email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="twoj@email.pl"
                    />
                    <p className="text-xs text-gray-500 mt-1">
                      Jeśli chcesz, żebyśmy Ci odpisali 😊
                    </p>
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full bg-gradient-to-r from-purple-600 to-yellow-500 hover:from-purple-700 hover:to-yellow-600 text-white font-semibold py-6 text-lg shadow-lg hover:shadow-xl transition-all duration-300"
                  >
                    {isSubmitting ? (
                      <>
                        <div className="animate-spin rounded-full h-5 w-5 border-2 border-white border-t-transparent mr-2" />
                        Wysyłam...
                      </>
                    ) : (
                      <>
                        <Send className="w-5 h-5 mr-2" />
                        Wyślij feedback
                      </>
                    )}
                  </Button>
                </form>
              )}

              {/* Additional Info */}
              <div className="mt-8 text-center text-sm text-gray-600 dark:text-gray-400">
                <p className="mb-2">
                  📮 Możesz też napisać bezpośrednio na: <a href="mailto:hello@fomojobs.pl" className="text-purple-600 hover:underline font-medium">hello@fomojobs.pl</a>
                </p>
                <p>
                  🔒 Twoje dane są bezpieczne i nie udostępniamy ich nikomu.
                </p>
              </div>
            </>
          )}
        </div>
      </div>

      <FOMOJobsFooter />
    </>
  );
};

export default FeedbackPage;
