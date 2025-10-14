import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useToast } from '@/hooks/use-toast';

export const AlertStep4Time = () => {
  const navigate = useNavigate();
  const { toast } = useToast();

  const handleSave = () => {
    toast({ title: 'Alert utworzony!', description: 'Będziesz otrzymywać powiadomienia o nowych ofertach.' });
    navigate('/my-alerts');
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">4. Kiedy chcesz otrzymywać alerty?</h2>
      <div className="space-y-4 mb-6">
        <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
          <input type="radio" name="time" defaultChecked />
          <span className="font-medium">Codziennie o 9:00</span>
        </label>
        <label className="flex items-center gap-3 p-4 border rounded-lg hover:bg-muted/50 cursor-pointer">
          <input type="radio" name="time" />
          <span className="font-medium">Codziennie o 18:00</span>
        </label>
      </div>
      <Button onClick={handleSave} size="lg" className="w-full">Zapisz alert</Button>
    </div>
  );
};
