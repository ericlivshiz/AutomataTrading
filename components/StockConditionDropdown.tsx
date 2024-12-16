'use client'

import * as React from 'react'
import { ChevronRight, Plus } from 'lucide-react'
import { Button } from '@/components/ui/button'
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuPortal,
  DropdownMenuSub,
  DropdownMenuSubContent,
  DropdownMenuSubTrigger,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu'
import { DateRangeButton } from './DateRangeButton'
import { PriceInput } from './condition-inputs/PriceInput'
import { RangeInputs } from './condition-inputs/RangeInputs'
import { stockConditions } from '@/data/stockConditions'
import { StockConditionValue } from '@/types/stockConditions'
import { DateRange } from "react-day-picker";
import { SpecificDateButton } from './SpecificDateButton';
import { TimeOfDayInput } from './condition-inputs/TimeOfDayInput';
import { DayOfWeekInput } from './condition-inputs/DayOfWeekInput';
import { Switch } from "@/components/ui/switch"

interface StockConditionDropdownProps {
  onConditionChange?: (value: StockConditionValue[]) => void;
}

interface ConditionOperator {
  isAnd: boolean;
}

interface ConditionGroup {
  id: number;
  conditions: (StockConditionValue | ConditionOperator)[];
  isAnd: boolean;
}

export default function StockConditionDropdown({ onConditionChange }: StockConditionDropdownProps) {
  const [groups, setGroups] = React.useState<ConditionGroup[]>([]);
  const [isAddingCondition, setIsAddingCondition] = React.useState(false);
  const [selectedCondition, setSelectedCondition] = React.useState<string | null>(null);
  const [currentConditionValue, setCurrentConditionValue] = React.useState<StockConditionValue>({ condition: '' });

  const handleConditionSelect = (condition: string) => {
    setSelectedCondition(condition);
    setCurrentConditionValue({ condition });
  };

  const handleValueChange = (newValue: Partial<StockConditionValue>) => {
    const updatedValue = { ...currentConditionValue, ...newValue };
    setCurrentConditionValue(updatedValue);
  };

  const handleOperatorChange = (groupId: number, index: number, isAnd: boolean) => {
    const newGroups = groups.map(group => {
      if (group.id === groupId) {
        const newConditions = [...group.conditions];
        (newConditions[index] as ConditionOperator).isAnd = isAnd;
        return { ...group, conditions: newConditions };
      }
      return group;
    });
    setGroups(newGroups);
    onConditionChange?.(newGroups.flatMap(group => group.conditions.filter((item): item is StockConditionValue => 'condition' in item)));
  };

  const handleGroupOperatorChange = (index: number, isAnd: boolean) => {
    const newGroups = [...groups];
    newGroups[index].isAnd = isAnd;
    setGroups(newGroups);
  };

  const handleAddCondition = (groupId: number) => {
    if (currentConditionValue.condition) {
      const newGroups = groups.map(group => {
        if (group.id === groupId) {
          const newConditions = [...group.conditions];
          if (newConditions.length > 0) {
            newConditions.push({ isAnd: true });
          }
          newConditions.push(currentConditionValue);
          return { ...group, conditions: newConditions };
        }
        return group;
      });
      setGroups(newGroups);
      onConditionChange?.(newGroups.flatMap(group => group.conditions.filter((item): item is StockConditionValue => 'condition' in item)));
      setIsAddingCondition(false);
      setSelectedCondition(null);
      setCurrentConditionValue({ condition: '' });
    }
  };

  const handleAddGroup = () => {
    const newGroupId = groups.length + 1;
    setGroups([...groups, { id: newGroupId, conditions: [], isAnd: true }]);
  };

  const renderConditionInput = () => {
    if (!selectedCondition) return null;

    switch (selectedCondition) {
      case 'Above Price':
      case 'Below Price':
        return (
          <PriceInput
            value={currentConditionValue.value?.toString() || ''}
            onChange={(e) => handleValueChange({ value: e.target.value })}
          />
        );
      
      case 'Price Change %':
        return (
          <PriceInput
            value={currentConditionValue.value?.toString() || ''}
            onChange={(e) => handleValueChange({ value: e.target.value })}
            className="w-[100px]"
          />
        );

      case 'Price Range':
      case 'MACD':
        return (
          <RangeInputs
            minValue={currentConditionValue.value?.toString() || ''}
            maxValue={currentConditionValue.value2?.toString() || ''}
            onMinChange={(e) => handleValueChange({ value: e.target.value })}
            onMaxChange={(e) => handleValueChange({ value2: e.target.value })}
            minPlaceholder={selectedCondition === 'MACD' ? 'Fast' : 'Min Price'}
            maxPlaceholder={selectedCondition === 'MACD' ? 'Slow' : 'Max Price'}
          />
        );

      case 'Moving Average':
      case 'RSI':
      case 'Bollinger Bands':
        return (
          <PriceInput
            value={currentConditionValue.value?.toString() || ''}
            onChange={(e) => handleValueChange({ value: e.target.value })}
            className="w-[100px]"
          />
        );

      case 'Date Range':
        return (
          <DateRangeButton 
            onSelect={(range: DateRange) => {
              if (range?.from && range?.to) {
                handleValueChange({ 
                  dateRange: { 
                    from: range.from, 
                    to: range.to 
                  } 
                });
              }
            }} 
          />
        );

      case 'Specific Date':
        return (
          <SpecificDateButton 
            onSelect={(selectedDate) => {
              handleValueChange({ 
                specificDate: selectedDate 
              });
            }} 
          />
        );

      case 'Time of Day':
        return (
          <TimeOfDayInput
            value={currentConditionValue.value?.toString()}
            onSelect={(time) => handleValueChange({ value: time })}
          />
        );

      case 'Day of Week':
        return (
          <DayOfWeekInput
            value={currentConditionValue.value?.toString()}
            onSelect={(day) => handleValueChange({ value: day })}
          />
        );

      default:
        return null;
    }
  };

  const getDisplayText = (condition: StockConditionValue) => {
    if (!condition.condition) return 'Select Condition';
    
    const { condition: conditionType, value, value2, dateRange, specificDate } = condition;
    
    if (!value && !dateRange && !specificDate) return conditionType;

    switch (conditionType) {
      case 'Above Price':
      case 'Below Price':
        return `${conditionType} $${value}`;
      case 'Price Change %':
        return `${conditionType} ${value}%`;
      case 'Price Range':
        return value2 ? `${conditionType} $${value} - $${value2}` : conditionType;
      case 'Moving Average':
      case 'RSI':
      case 'Bollinger Bands':
        return `${conditionType} Period: ${value}`;
      case 'MACD':
        return value2 ? `${conditionType} Fast: ${value}, Slow: ${value2}` : conditionType;
      case 'Date Range':
        if (dateRange?.from && dateRange?.to) {
          const fromDate = dateRange.from.toLocaleDateString();
          const toDate = dateRange.to.toLocaleDateString();
          return `${conditionType}: ${fromDate} - ${toDate}`;
        }
        return conditionType;
      case 'Specific Date':
        if (specificDate) {
          return `${conditionType}: ${specificDate.toLocaleDateString()}`;
        }
        return conditionType;
      case 'Time of Day':
        return value ? `${conditionType}: ${value}` : conditionType;
      case 'Day of Week':
        return value ? `${conditionType}: ${value}` : conditionType;
      default:
        return conditionType;
    }
  };

  return (
    <div className="space-y-4">
      {/* List of Current Groups and Conditions */}
      <div className="space-y-4">
        {groups.length === 0 ? (
          <div className="text-sm text-gray-200 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 p-3 rounded-md shadow-md">
            You have no current conditions
          </div>
        ) : (
          groups.map((group, groupIndex) => (
            <React.Fragment key={group.id}>
              <div className="p-3 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 rounded-md text-gray-200 shadow-md">
                <div className="font-bold mb-2">Group {group.id}</div>
                {group.conditions.map((item, index) => {
                  if ('condition' in item) {
                    return (
                      <div
                        key={index}
                        className="p-2 bg-gray-800 rounded-md text-gray-200 shadow-sm"
                      >
                        {getDisplayText(item)}
                      </div>
                    );
                  } else {
                    return (
                      <div key={index} className="flex items-center justify-center py-2 space-x-3">
                        <span className={`text-sm ${item.isAnd ? 'text-gray-400' : 'text-gray-200'}`}>OR</span>
                        <Switch
                          checked={item.isAnd}
                          onCheckedChange={(checked) => handleOperatorChange(group.id, index, checked)}
                          className="bg-gradient-to-r from-gray-700 to-gray-800"
                        />
                        <span className={`text-sm ${item.isAnd ? 'text-gray-200' : 'text-gray-400'}`}>AND</span>
                      </div>
                    );
                  }
                })}
              </div>
              {groupIndex < groups.length - 1 && (
                <div className="flex items-center justify-center py-2 space-x-3">
                  <span className={`text-sm ${group.isAnd ? 'text-gray-400' : 'text-gray-200'}`}>OR</span>
                  <Switch
                    checked={group.isAnd}
                    onCheckedChange={(checked) => handleGroupOperatorChange(groupIndex, checked)}
                    className="bg-gradient-to-r from-gray-700 to-gray-800"
                  />
                  <span className={`text-sm ${group.isAnd ? 'text-gray-200' : 'text-gray-400'}`}>AND</span>
                </div>
              )}
            </React.Fragment>
          ))
        )}
      </div>
  
      {/* Add Group and Condition Buttons */}
      {!isAddingCondition && (
        <div className="flex space-x-2">
          <Button
            variant="outline"
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md"
            onClick={handleAddGroup}
          >
            <Plus className="h-4 w-4" />
            Add Group
          </Button>
          <Button
            variant="outline"
            className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md"
            onClick={() => {
              if (groups.length === 0) {
                handleAddGroup();
              }
              setIsAddingCondition(true);
            }}
          >
            <Plus className="h-4 w-4" />
            Add Condition
          </Button>
        </div>
      )}
  
      {/* Condition Selection */}
      {isAddingCondition && (
        <div className="space-y-2 p-3 bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 rounded-md shadow-md">
          <div className="flex items-center space-x-2">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="w-[200px] bg-gradient-to-r from-gray-700 via-gray-800 to-gray-700 text-gray-200 shadow-md justify-between"
                >
                  {selectedCondition || 'Select Condition'}
                  <ChevronRight className="ml-2 h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 border-none shadow-md">
                <DropdownMenuGroup>
                  {Object.entries(stockConditions).map(([category, conditions]) => (
                    <DropdownMenuSub key={category}>
                      <DropdownMenuSubTrigger className="cursor-pointer text-gray-200">
                        <span>{category}</span>
                      </DropdownMenuSubTrigger>
                      <DropdownMenuPortal>
                        <DropdownMenuSubContent className="w-56 bg-gradient-to-r from-gray-800 to-gray-900 text-gray-200 border-none shadow-md">
                          {conditions.map((condition) => (
                            <DropdownMenuItem
                              key={condition}
                              onSelect={() => handleConditionSelect(condition)}
                              className="cursor-pointer text-gray-200 hover:bg-gray-700"
                            >
                              <span>{condition}</span>
                            </DropdownMenuItem>
                          ))}
                        </DropdownMenuSubContent>
                      </DropdownMenuPortal>
                    </DropdownMenuSub>
                  ))}
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
  
            {renderConditionInput()}
          </div>
  
          <div className="flex space-x-2">
            <Button
              variant="outline"
              className="flex-1 bg-gradient-to-r from-gray-700 to-gray-800 text-red-500 hover:from-red-400 hover:to-red-500 shadow-md"
              onClick={() => {
                setIsAddingCondition(false);
                setSelectedCondition(null);
                setCurrentConditionValue({ condition: '' });
              }}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              className="flex-1 bg-gradient-to-r from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 shadow-md"
              onClick={() => handleAddCondition(groups[groups.length - 1].id)}
              disabled={!currentConditionValue.condition}
            >
              Add
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}  