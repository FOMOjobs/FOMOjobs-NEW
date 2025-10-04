import { Navigation } from '@/components/Navigation';
import { AccessibilityBar } from '@/components/AccessibilityBar';
import { HeroSection } from '@/components/HeroSection';
import { MapView } from '@/components/MapView';
import { FlashcardsSection } from '@/components/sections/FlashcardsSection';
import { FAQSection } from '@/components/sections/FAQSection';
import { ReviewsSection } from '@/components/sections/ReviewsSection';
import { useVolunteerStore } from '@/stores/volunteerStore';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Calendar, MapPin, Users, Clock, Map, Grid3x3 } from 'lucide-react';
import { useState } from 'react';

const Index = () => {
  const { getFilteredOpportunities, opportunities } = useVolunteerStore();
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  
  const filteredOpportunities = selectedCategory === 'all' 
    ? opportunities.slice(0, 12) 
    : opportunities.filter(opp => opp.category === selectedCategory).slice(0, 8);

  const categories = [
    { id: 'all', label: 'Wszystkie', count: opportunities.length },
    { id: 'education', label: 'Edukacja', count: opportunities.filter(o => o.category === 'education').length },
    { id: 'ecology', label: 'Ekologia', count: opportunities.filter(o => o.category === 'ecology').length },
    { id: 'sport', label: 'Sport', count: opportunities.filter(o => o.category === 'sport').length },
    { id: 'culture', label: 'Kultura', count: opportunities.filter(o => o.category === 'culture').length },
    { id: 'social', label: 'Pomoc społeczna', count: opportunities.filter(o => o.category === 'social').length },
    { id: 'health', label: 'Zdrowie', count: opportunities.filter(o => o.category === 'health').length },
  ];

  return (
    <div className="min-h-screen bg-background pb-20">
      <Navigation />
      <main>
        <HeroSection />
        
        {/* How It Works - Flashcards */}
        <FlashcardsSection />
      
      {/* Main Content Section */}
      <section className="py-16 bg-gradient-card">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-8 text-gradient">
            Znajdź wolontariat w Krakowie
          </h2>
          
          {/* Categories Filter */}
          <div className="flex flex-wrap justify-center gap-4 mb-8">
            {categories.map((category) => (
              <Button
                key={category.id}
                variant={selectedCategory === category.id ? "default" : "outline"}
                className={`hover-bounce ${
                  selectedCategory === category.id 
                    ? `category-${category.id === 'all' ? 'education' : category.id} text-white shadow-primary` 
                    : 'border-gradient'
                }`}
                onClick={() => setSelectedCategory(category.id)}
              >
                {category.label} ({category.count})
              </Button>
            ))}
          </div>
          
          {/* View Toggle */}
          <Tabs defaultValue="grid" className="w-full">
            <TabsList className="grid w-full max-w-md mx-auto grid-cols-2 mb-8">
              <TabsTrigger value="grid" className="flex items-center gap-2">
                <Grid3x3 className="h-4 w-4" />
                Lista
              </TabsTrigger>
              <TabsTrigger value="map" className="flex items-center gap-2">
                <Map className="h-4 w-4" />
                Mapa
              </TabsTrigger>
            </TabsList>
            
            <TabsContent value="grid" className="space-y-6">
              {/* Opportunities Grid */}
              <div className="grid md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                {filteredOpportunities.map((opportunity) => (
                  <Card key={opportunity.id} className="hover-lift shadow-card border-0 bg-gradient-card">
                    <CardHeader className="pb-3">
                      <div className="flex items-start justify-between mb-2">
                        <Badge className={`category-${opportunity.category} text-white font-medium`}>
                          {opportunity.category}
                        </Badge>
                        {opportunity.isUrgent && (
                          <Badge variant="destructive" className="animate-pulse">
                            Pilne!
                          </Badge>
                        )}
                      </div>
                      <CardTitle className="text-lg leading-tight">{opportunity.title}</CardTitle>
                      <CardDescription className="text-sm">
                        {opportunity.description.substring(0, 100)}...
                      </CardDescription>
                    </CardHeader>
                    
                    <CardContent className="space-y-3 pb-3">
                      <div className="flex items-center text-sm text-muted-foreground">
                        <MapPin className="h-4 w-4 mr-2" />
                        {opportunity.organization}
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4 mr-2" />
                        {new Date(opportunity.date.start).toLocaleDateString('pl-PL')}
                      </div>
                      
                      <div className="flex items-center text-sm text-muted-foreground">
                        <Clock className="h-4 w-4 mr-2" />
                        {opportunity.timeCommitment}
                      </div>
                      
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-sm">
                          <Users className="h-4 w-4 mr-1" />
                          {opportunity.currentVolunteers}/{opportunity.maxVolunteers}
                        </div>
                        <Badge variant={opportunity.difficulty === 'easy' ? 'secondary' : opportunity.difficulty === 'medium' ? 'default' : 'destructive'}>
                          {opportunity.difficulty}
                        </Badge>
                      </div>
                    </CardContent>
                    
                    <CardFooter>
                      <Button className="w-full bg-gradient-primary hover:shadow-primary text-white border-0">
                        Aplikuj teraz
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="map" className="h-[600px]">
              <div className="h-full rounded-lg overflow-hidden shadow-glow">
                <MapView selectedCategory={selectedCategory} />
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </section>
      
      {/* FAQ Section */}
      <FAQSection />
      
      {/* Reviews Section */}
      <ReviewsSection />
      </main>
      
      <AccessibilityBar />
    </div>
  );
};

export default Index;