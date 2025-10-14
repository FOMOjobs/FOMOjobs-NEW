import FOMOJobsPageLayout from '@/components/FOMOJobsPageLayout';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Edit2, Trash2, Plus } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

const MyAlerts = () => {
  const navigate = useNavigate();

  return (
    <FOMOJobsPageLayout>
      <div className="min-h-screen bg-gradient-to-br from-background via-muted/20 to-background py-12">
        <div className="container mx-auto px-4 max-w-4xl">
          <div className="flex justify-between items-center mb-8">
            <h1 className="text-4xl font-bold text-gradient">Moje Alerty</h1>
            <Button onClick={() => navigate('/alert-wizard')}>
              <Plus className="w-4 h-4 mr-2" />
              Nowy alert
            </Button>
          </div>

          <div className="space-y-4">
            <Card className="p-6">
              <div className="flex justify-between items-start">
                <div>
                  <h3 className="font-semibold text-lg mb-2">Alert IT - Python, Java</h3>
                  <p className="text-sm text-muted-foreground mb-1">Firmy: Capgemini, Comarch</p>
                  <p className="text-sm text-muted-foreground mb-1">Poziomy: Mid, Senior</p>
                  <p className="text-sm text-muted-foreground">Godzina: Codziennie o 9:00</p>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" size="sm"><Edit2 className="w-4 h-4" /></Button>
                  <Button variant="outline" size="sm"><Trash2 className="w-4 h-4" /></Button>
                </div>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </FOMOJobsPageLayout>
  );
};

export default MyAlerts;
