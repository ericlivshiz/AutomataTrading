'use client'

import * as React from 'react'
import { ChevronRight } from 'lucide-react'
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

interface StockConditionDropdownProps {
  onConditionChange?: (value: StockConditionValue) => void;
}

export default function StockConditionDropdown({ onConditionChange }: StockConditionDropdownProps) {
  const [selectedCondition, setSelectedCondition] = React.useState<string | null>(null);
  const [conditionValue, setConditionValue] = React.useState<StockConditionValue>({ condition: '' });

  const handleConditionSelect = (condition: string) => {
    setSelectedCondition(condition);
    const newValue = { condition };
    setConditionValue(newValue);
    onConditionChange?.(newValue);
  };

  const handleValueChange = (newValue: Partial<StockConditionValue>) => {
    const updatedValue = { ...conditionValue, ...newValue };
    setConditionValue(updatedValue);
    onConditionChange?.(updatedValue);
  };

  const renderConditionInput = () => {
    if (!selectedCondition) return null;

    switch (selectedCondition) {
      case 'Above Price':
      case 'Below Price':
        return (
          <PriceInput
            value={conditionValue.value?.toString() || ''}
            onChange={(e) => handleValueChange({ value: e.target.value })}
          />
        );
      
      case 'Price Change %':
        return (
          <PriceInput
            value={conditionValue.value?.toString() || ''}
            onChange={(e) => handleValueChange({ value: e.target.value })}
            className="w-[100px]"
          />
        );

      case 'Price Range':
      case 'MACD':
        return (
          <RangeInputs
            minValue={conditionValue.value?.toString() || ''}
            maxValue={conditionValue.value2?.toString() || ''}
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
            value={conditionValue.value?.toString() || ''}
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
            value={conditionValue.value?.toString()}
            onSelect={(time) => handleValueChange({ value: time })}
          />
        );

      case 'Day of Week':
        return (
          <DayOfWeekInput
            value={conditionValue.value?.toString()}
            onSelect={(day) => handleValueChange({ value: day })}
          />
        );

      default:
        return null;
    }
  };

  const getDisplayText = () => {
    if (!selectedCondition) return 'Select Condition';
    
    const { value, value2, dateRange, specificDate } = conditionValue;
    
    if (!value && !dateRange && !specificDate) return selectedCondition;

    switch (selectedCondition) {
      case 'Above Price':
      case 'Below Price':
        return `${selectedCondition} $${value}`;
      case 'Price Change %':
        return `${selectedCondition} ${value}%`;
      case 'Price Range':
        return value2 ? `${selectedCondition} $${value} - $${value2}` : selectedCondition;
      case 'Moving Average':
      case 'RSI':
      case 'Bollinger Bands':
        return `${selectedCondition} Period: ${value}`;
      case 'MACD':
        return value2 ? `${selectedCondition} Fast: ${value}, Slow: ${value2}` : selectedCondition;
      case 'Date Range':
        if (dateRange?.from && dateRange?.to) {
          const fromDate = dateRange.from.toLocaleDateString();
          const toDate = dateRange.to.toLocaleDateString();
          return `${selectedCondition}: ${fromDate} - ${toDate}`;
        }
        return selectedCondition;
      case 'Specific Date':
        if (specificDate) {
          return `${selectedCondition}: ${specificDate.toLocaleDateString()}`;
        }
        return selectedCondition;
      case 'Time of Day':
        return value ? `${selectedCondition}: ${value}` : selectedCondition;
      case 'Day of Week':
        return value ? `${selectedCondition}: ${value}` : selectedCondition;
      default:
        return selectedCondition;
    }
  };

  return (
    <div className="flex items-center space-x-2">
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="outline" className="w-[200px] gradient-blue justify-between">
            {getDisplayText()}
            <ChevronRight className="ml-2 h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-56 gradient-blue border-none">
          <DropdownMenuGroup>
            {Object.entries(stockConditions).map(([category, conditions]) => (
              <DropdownMenuSub key={category}>
                <DropdownMenuSubTrigger className="cursor-pointer">
                  <span>{category}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-56 gradient-blue border-none">
                    {conditions.map((condition) => (
                      <DropdownMenuItem
                        key={condition}
                        onSelect={() => handleConditionSelect(condition)}
                        className="cursor-pointer"
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
  );
}
