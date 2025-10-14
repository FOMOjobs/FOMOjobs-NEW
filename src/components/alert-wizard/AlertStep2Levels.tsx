import { Checkbox } from '@/components/ui/checkbox';

const levels = [
  { id: 'entry', name: 'Entry level / Stażysta(ka)', desc: 'np. Stażysta(ka) ds. marketingu internetowego' },
  { id: 'junior', name: 'Junior / Młodszy(a)', desc: 'np. Junior Java Developer, Młodsza Specjalistka ds. SEO' },
  { id: 'mid', name: 'Mid level / Specjalista(ka)', desc: 'np. Specjalistka ds. Social Media, Analityk BI' },
  { id: 'senior', name: 'Senior / Starszy(a)', desc: 'np. Starsza Programistka Python, Senior Data Engineer' },
  { id: 'lead', name: 'Team Leader / Lider(ka)', desc: 'np. Team Lead frontend' },
  { id: 'manager', name: 'Manager / Menedżer(ka)', desc: 'np. Product Manager, HR Managerka' },
];

export const AlertStep2Levels = ({ selected, onChange }: { selected: string[]; onChange: (val: string[]) => void }) => {
  const toggle = (id: string) => {
    onChange(selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">2. Wybierz poziomy doświadczenia:</h2>
      <div className="space-y-3">
        {levels.map(l => (
          <label key={l.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
            <Checkbox checked={selected.includes(l.id)} onCheckedChange={() => toggle(l.id)} />
            <div>
              <div className="font-medium">{l.name}</div>
              <div className="text-sm text-muted-foreground">{l.desc}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
