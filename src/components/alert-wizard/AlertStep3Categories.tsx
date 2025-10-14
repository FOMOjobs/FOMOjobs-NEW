import { Checkbox } from '@/components/ui/checkbox';

const categories = [
  { id: 'hr_rekrutacja', name: 'Rekrutacja', parent: 'HR' },
  { id: 'hr_bp', name: 'HR Business Partner', parent: 'HR' },
  { id: 'it_support', name: 'IT support / helpdesk', parent: 'IT' },
  { id: 'it_python', name: 'Programowanie Python', parent: 'IT' },
  { id: 'it_java', name: 'Programowanie Java', parent: 'IT' },
  { id: 'finance_ap', name: 'Księgowość AP / AR', parent: 'Finanse' },
  { id: 'marketing', name: 'Marketing digitalowy', parent: 'Marketing' },
];

export const AlertStep3Categories = ({ selected, onChange }: { selected: string[]; onChange: (val: string[]) => void }) => {
  const toggle = (id: string) => {
    onChange(selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id]);
  };

  const grouped = categories.reduce((acc, cat) => {
    if (!acc[cat.parent]) acc[cat.parent] = [];
    acc[cat.parent].push(cat);
    return acc;
  }, {} as Record<string, typeof categories>);

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">3. Wybierz kategorie stanowisk:</h2>
      <p className="text-muted-foreground mb-4">Zaznacz wszystkie obszary zawodowe, które Cię interesują.</p>
      <div className="space-y-6">
        {Object.entries(grouped).map(([parent, cats]) => (
          <div key={parent}>
            <h3 className="font-semibold text-lg mb-2">{parent}</h3>
            <div className="space-y-2">
              {cats.map(c => (
                <label key={c.id} className="flex items-center gap-3 p-2 border rounded hover:bg-muted/50 cursor-pointer">
                  <Checkbox checked={selected.includes(c.id)} onCheckedChange={() => toggle(c.id)} />
                  <span>{c.name}</span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
