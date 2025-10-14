// Step 3: Job Categories Selection - Exact match with original design
// Allows users to select specific job positions grouped by categories

import { useAlertStore } from '@/stores/alertStore';
import { JOB_CATEGORIES } from '@/data/alertData';
import { Checkbox } from '@/components/ui/checkbox';

const Step3Categories = () => {
  const { selectedCategories, toggleCategory, setCategories } = useAlertStore();

  const handleToggle = (id: number) => {
    toggleCategory(id.toString());
  };

  const handleGroupToggle = (groupId: string) => {
    const group = JOB_CATEGORIES.find(g => g.groupId === groupId);
    if (!group) return;

    const allGroupIds = group.positions.map(p => p.id.toString());
    const allSelected = allGroupIds.every(id => selectedCategories.includes(id));

    if (allSelected) {
      // Deselect all in group
      setCategories(
        selectedCategories.filter(id => !allGroupIds.includes(id))
      );
    } else {
      // Select all in group
      const newSelected = [...new Set([...selectedCategories, ...allGroupIds])];
      setCategories(newSelected);
    }
  };

  const isGroupFullySelected = (groupId: string) => {
    const group = JOB_CATEGORIES.find(g => g.groupId === groupId);
    if (!group) return false;
    return group.positions.every(p => selectedCategories.includes(p.id.toString()));
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl font-semibold text-gray-900 mb-3">
          3. Wybierz odpowiednie kategorie stanowisk:
        </h2>
        <p className="text-sm text-gray-600 mb-4">
          Zaznacz wszystkie obszary zawodowe, które odpowiadają Twoim zainteresowaniom lub doświadczeniu.
        </p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-6 gap-y-8">
        {JOB_CATEGORIES.map(group => (
          <div key={group.groupId}>
            {/* Group Header with Group Checkbox */}
            <div className="flex items-center gap-2 mb-2">
              <Checkbox
                checked={isGroupFullySelected(group.groupId)}
                onCheckedChange={() => handleGroupToggle(group.groupId)}
                className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
              />
              <h3 className="text-lg font-medium text-purple-600">
                {group.groupName}
              </h3>
            </div>

            {/* Position Checkboxes */}
            <div className="space-y-2 pt-2 border-t border-gray-200">
              {group.positions.map(position => (
                <label
                  key={position.id}
                  className="flex items-center gap-2 text-sm text-gray-700 hover:text-gray-900 transition-colors duration-200 cursor-pointer"
                >
                  <Checkbox
                    checked={selectedCategories.includes(position.id.toString())}
                    onCheckedChange={() => handleToggle(position.id)}
                    className="data-[state=checked]:bg-purple-600 data-[state=checked]:border-purple-600"
                  />
                  <span className="flex-1">
                    {position.name} (<b>{position.count}</b>)
                  </span>
                </label>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selectedCategories.length === 0 && (
        <p className="text-sm text-red-600">
          ⚠️ Wybierz przynajmniej jedną kategorię stanowisk
        </p>
      )}
    </div>
  );
};

export default Step3Categories;
