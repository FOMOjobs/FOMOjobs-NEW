import { Checkbox } from '@/components/ui/checkbox';

const companies = [
  { id: 'capgemini', name: 'Capgemini Polska', desc: 'Outsourcing IT i procesów biznesowych, konsulting' },
  { id: 'comarch', name: 'Comarch S.A.', desc: 'Oprogramowanie i systemy IT, ERP' },
  { id: 'hsbc', name: 'HSBC', desc: 'Bankowość międzynarodowa, finanse' },
  { id: 'shell', name: 'Shell Business Operations', desc: 'Globalne operacje biznesowe, energia' },
  { id: 'ubs', name: 'UBS', desc: 'Bankowość inwestycyjna, zarządzanie majątkiem' },
];

export const AlertStep1Companies = ({ selected, onChange }: { selected: string[]; onChange: (val: string[]) => void }) => {
  const toggle = (id: string) => {
    onChange(selected.includes(id) ? selected.filter(x => x !== id) : [...selected, id]);
  };

  return (
    <div>
      <h2 className="text-2xl font-bold mb-4">1. Wybierz firmy, które Cię interesują:</h2>
      <div className="space-y-3">
        {companies.map(c => (
          <label key={c.id} className="flex items-start gap-3 p-3 border rounded-lg hover:bg-muted/50 cursor-pointer">
            <Checkbox checked={selected.includes(c.id)} onCheckedChange={() => toggle(c.id)} />
            <div>
              <div className="font-medium">{c.name}</div>
              <div className="text-sm text-muted-foreground">{c.desc}</div>
            </div>
          </label>
        ))}
      </div>
    </div>
  );
};
