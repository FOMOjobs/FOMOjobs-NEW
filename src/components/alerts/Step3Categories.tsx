// Step 3: Job Categories Selection - Nested Checkboxes by Category Groups
// Allows users to select specific job positions grouped by categories

import { useState } from 'react';
import { useAlertStore } from '@/stores/alertStore';
import { JOB_CATEGORIES } from '@/data/alertData';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import { Briefcase, ChevronLeft, ChevronRight, ChevronDown, ChevronUp } from 'lucide-react';
import { cn } from '@/lib/utils';

const Step3Categories = () => {
  const { selectedCategories, toggleCategory, setCategories, prevStep, nextStep } = useAlertStore();
  const [expandedGroups, setExpandedGroups] = useState<string[]>(
    JOB_CATEGORIES.map((g) => g.groupId) // All groups expanded by default
  );

  const toggleGroup = (groupId: string) => {
    setExpandedGroups((prev) =>
      prev.includes(groupId) ? prev.filter((id) => id !== groupId) : [...prev, groupId]
    );
  };

  const handleSelectAll = () => {
    const allPositionIds = JOB_CATEGORIES.flatMap((group) =>
      group.positions.map((p) => p.id.toString())
    );

    if (selectedCategories.length === allPositionIds.length) {
      setCategories([]);
    } else {
      setCategories(allPositionIds);
    }
  };

  const handleSelectGroup = (groupId: string) => {
    const group = JOB_CATEGORIES.find((g) => g.groupId === groupId);
    if (!group) return;

    const groupPositionIds = group.positions.map((p) => p.id.toString());
    const allSelected = groupPositionIds.every((id) =>
      selectedCategories.includes(id)
    );

    if (allSelected) {
      // Deselect all in group
      setCategories(
        selectedCategories.filter((id) => !groupPositionIds.includes(id))
      );
    } else {
      // Select all in group
      const newSelection = [
        ...selectedCategories,
        ...groupPositionIds.filter((id) => !selectedCategories.includes(id)),
      ];
      setCategories(newSelection);
    }
  };

  const isGroupFullySelected = (groupId: string) => {
    const group = JOB_CATEGORIES.find((g) => g.groupId === groupId);
    if (!group) return false;
    return group.positions.every((p) => selectedCategories.includes(p.id.toString()));
  };

  const isGroupPartiallySelected = (groupId: string) => {
    const group = JOB_CATEGORIES.find((g) => g.groupId === groupId);
    if (!group) return false;
    const selectedCount = group.positions.filter((p) =>
      selectedCategories.includes(p.id.toString())
    ).length;
    return selectedCount > 0 && selectedCount < group.positions.length;
  };

  const canProceed = selectedCategories.length > 0;

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h2 className="text-2xl font-bold text-foreground flex items-center gap-2">
          <Briefcase className="w-6 h-6 text-purple-500" />
          Wybierz kategorie stanowisk
        </h2>
        <p className="text-muted-foreground mt-2">
          Zaznacz stanowiska, które Cię interesują ({selectedCategories.length} wybranych)
        </p>
      </div>

      {/* Select All Button */}
      <div className="flex justify-end">
        <Button
          variant="outline"
          size="sm"
          onClick={handleSelectAll}
          className="text-xs"
        >
          {selectedCategories.length ===
          JOB_CATEGORIES.flatMap((g) => g.positions).length
            ? 'Odznacz wszystkie'
            : 'Zaznacz wszystkie'}
        </Button>
      </div>

      {/* Categories Accordion */}
      <div className="space-y-3 max-h-[500px] overflow-y-auto pr-2">
        {JOB_CATEGORIES.map((group) => {
          const isExpanded = expandedGroups.includes(group.groupId);
          const isFullySelected = isGroupFullySelected(group.groupId);
          const isPartiallySelected = isGroupPartiallySelected(group.groupId);

          return (
            <div
              key={group.groupId}
              className={cn(
                'border-2 rounded-lg overflow-hidden transition-all duration-200',
                isFullySelected && 'border-purple-500 shadow-md',
                isPartiallySelected && !isFullySelected && 'border-yellow-400 shadow-sm',
                !isFullySelected && !isPartiallySelected && 'border-gray-200 dark:border-gray-700'
              )}
            >
              {/* Group Header */}
              <div
                className={cn(
                  'p-4 flex items-center justify-between cursor-pointer hover:bg-gray-50 dark:hover:bg-gray-800 transition-colors',
                  isFullySelected && 'bg-purple-50 dark:bg-purple-900/20',
                  isPartiallySelected && !isFullySelected && 'bg-yellow-50 dark:bg-yellow-900/20'
                )}
              >
                <div className="flex items-center gap-3 flex-1" onClick={() => toggleGroup(group.groupId)}>
                  <button className="text-muted-foreground hover:text-foreground">
                    {isExpanded ? (
                      <ChevronUp className="w-5 h-5" />
                    ) : (
                      <ChevronDown className="w-5 h-5" />
                    )}
                  </button>
                  <h3 className="font-bold text-lg">{group.groupName}</h3>
                  <span className="text-xs text-muted-foreground">
                    ({group.positions.filter((p) => selectedCategories.includes(p.id.toString())).length}/
                    {group.positions.length})
                  </span>
                </div>

                {/* Select All in Group */}
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={(e) => {
                    e.stopPropagation();
                    handleSelectGroup(group.groupId);
                  }}
                  className="text-xs"
                >
                  {isFullySelected ? 'Odznacz grupę' : 'Zaznacz grupę'}
                </Button>
              </div>

              {/* Group Positions */}
              {isExpanded && (
                <div className="p-4 pt-0 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {group.positions.map((position) => {
                    const isSelected = selectedCategories.includes(position.id.toString());

                    return (
                      <div
                        key={position.id}
                        onClick={() => toggleCategory(position.id.toString())}
                        className={cn(
                          'flex items-start gap-2 p-3 border rounded-md cursor-pointer transition-all duration-150 hover:shadow-sm',
                          isSelected
                            ? 'border-purple-400 bg-purple-50 dark:bg-purple-900/20'
                            : 'border-gray-200 dark:border-gray-700 hover:border-purple-300'
                        )}
                      >
                        <Checkbox
                          checked={isSelected}
                          onCheckedChange={() => toggleCategory(position.id.toString())}
                          className="mt-0.5"
                        />
                        <Label
                          htmlFor={position.id.toString()}
                          className="flex-1 cursor-pointer text-sm font-medium leading-tight"
                        >
                          {position.name} ({position.count})
                        </Label>
                      </div>
                    );
                  })}
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Navigation */}
      <div className="flex justify-between pt-6">
        <Button
          onClick={prevStep}
          variant="outline"
          size="lg"
          className="font-semibold"
        >
          <ChevronLeft className="mr-2 w-5 h-5" />
          Wstecz
        </Button>

        <Button
          onClick={nextStep}
          disabled={!canProceed}
          size="lg"
          className="bg-gradient-to-r from-purple-500 to-purple-600 hover:from-purple-600 hover:to-purple-700 text-white font-semibold shadow-lg disabled:opacity-50"
        >
          Dalej: Podsumowanie
          <ChevronRight className="ml-2 w-5 h-5" />
        </Button>
      </div>

      {/* Helper text */}
      {!canProceed && (
        <p className="text-sm text-red-500 text-center">
          Wybierz przynajmniej jedno stanowisko, aby kontynuować
        </p>
      )}
    </div>
  );
};

export default Step3Categories;
