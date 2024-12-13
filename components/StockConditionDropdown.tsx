'use client'

import * as React from 'react'
import { ChevronRight } from 'lucide-react'

import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
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

const stockConditions = {
  'Price-Based': [
    'Above Price',
    'Below Price',
    'Price Change %',
    'Price Range',
  ],
  'Technical Indicators': [
    'Moving Average',
    'RSI',
    'MACD',
    'Bollinger Bands',
  ],
  'Time-Based': [
    'Time of Day',
    'Day of Week',
    'Specific Date',
    'Date Range',
  ],
}

export default function StockConditionDropdown() {
  const [selectedCondition, setSelectedCondition] = React.useState<string | null>(null);
  const [price, setPrice] = React.useState<string>('');
  const [priceChange, setPriceChange] = React.useState<string>('');
  const [minPrice, setMinPrice] = React.useState<string>('');
  const [maxPrice, setMaxPrice] = React.useState<string>('');
  const [movingAveragePeriod, setMovingAveragePeriod] = React.useState<string>('');
  const [rsiPeriod, setRsiPeriod] = React.useState<string>('');
  const [macdFast, setMacdFast] = React.useState<string>('');
  const [macdSlow, setMacdSlow] = React.useState<string>('');
  const [bollingerPeriod, setBollingerPeriod] = React.useState<string>('');
  const [dateRange, setDateRange] = React.useState<string>('');

  const [showPriceInput, setShowPriceInput] = React.useState(false);
  const [showPriceChangeInput, setShowPriceChangeInput] = React.useState(false);
  const [showPriceRangeInput, setShowPriceRangeInput] = React.useState(false);
  const [showMovingAverageInput, setShowMovingAverageInput] = React.useState(false);
  const [showRsiInput, setShowRsiInput] = React.useState(false);
  const [showMacdInput, setShowMacdInput] = React.useState(false);
  const [showBollingerInput, setShowBollingerInput] = React.useState(false);
  const [showDateRangeInput, setShowDateRangeInput] = React.useState(false);

  const handleConditionSelect = (condition: string) => {
    setSelectedCondition(condition);

    // Reset all input fields
    setShowPriceInput(false);
    setShowPriceChangeInput(false);
    setShowPriceRangeInput(false);
    setShowMovingAverageInput(false);
    setShowRsiInput(false);
    setShowMacdInput(false);
    setShowBollingerInput(false);
    setShowDateRangeInput(false);
    setPrice('');
    setPriceChange('');
    setMinPrice('');
    setMaxPrice('');
    setMovingAveragePeriod('');
    setRsiPeriod('');
    setMacdFast('');
    setMacdSlow('');
    setBollingerPeriod('');

    // Show specific inputs based on condition
    if (condition.includes('Price') && !condition.includes('Change') && !condition.includes('Range')) {
      setShowPriceInput(true);
    } else if (condition.includes('Price Change %')) {
      setShowPriceChangeInput(true);
    } else if (condition.includes('Price Range')) {
      setShowPriceRangeInput(true);
    } else if (condition.includes('Moving Average')) {
      setShowMovingAverageInput(true);
    } else if (condition.includes('RSI')) {
      setShowRsiInput(true);
    } else if (condition.includes('MACD')) {
      setShowMacdInput(true);
    } else if (condition.includes('Bollinger Bands')) {
      setShowBollingerInput(true);
    } else if (condition.includes('Date Range')) {
      setShowDateRangeInput(true);
    }
  };

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value);
  };

  const handlePriceChangePercent = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPriceChange(e.target.value);
  };

  const handleMinPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMinPrice(e.target.value);
  };

  const handleMaxPriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMaxPrice(e.target.value);
  };

  const handleMovingAverageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMovingAveragePeriod(e.target.value);
  };

  const handleRsiChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setRsiPeriod(e.target.value);
  };

  const handleMacdFastChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMacdFast(e.target.value);
  };

  const handleMacdSlowChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMacdSlow(e.target.value);
  };

  const handleBollingerChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setBollingerPeriod(e.target.value);
  };

  const handleDateRangeChange = (e: React.ChangeEvent<HTMLInputElement>) => { 
    setDateRange(e.target.value);
  };

  const getDisplayText = () => {
    if (selectedCondition?.includes('Price') && price) {
      return `${selectedCondition} $${price}`;
    }
    if (selectedCondition?.includes('Price Change %') && priceChange) {
      return `${selectedCondition} ${priceChange}%`;
    }
    if (selectedCondition?.includes('Price Range') && minPrice && maxPrice) {
      return `${selectedCondition} $${minPrice} - $${maxPrice}`;
    }
    if (selectedCondition?.includes('Moving Average') && movingAveragePeriod) {
      return `${selectedCondition} Period: ${movingAveragePeriod}`;
    }
    if (selectedCondition?.includes('Relative Strength Index (RSI)') && rsiPeriod) {
      return `${selectedCondition} Period: ${rsiPeriod}`;
    }
    if (selectedCondition?.includes('MACD') && macdFast && macdSlow) {
      return `${selectedCondition} Fast: ${macdFast}, Slow: ${macdSlow}`;
    }
    if (selectedCondition?.includes('Bollinger Bands') && bollingerPeriod) {
      return `${selectedCondition} Period: ${bollingerPeriod}`;
    }
    if (selectedCondition?.includes('Date Range') && dateRange) {
      return `${selectedCondition} ${dateRange}`;
    }
    
    return selectedCondition || 'Select Condition';
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

      {showPriceInput && (
        <Input
          type="number"
          placeholder="Enter price"
          value={price}
          onChange={handlePriceChange}
          className="w-[120px] gradient-blue border-1px text-black px-2 py-1 rounded-md focus:outline-none"
        />
      )}

      {showPriceChangeInput && (
        <Input
          type="number"
          placeholder="Enter %"
          value={priceChange}
          onChange={handlePriceChangePercent}
          className="w-[120px] gradient-blue border-1px text-black px-2 py-1 rounded-md focus:outline-none"
        />
      )}

      {showPriceRangeInput && (
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Min Price"
            value={minPrice}
            onChange={handleMinPriceChange}
            className="w-[80px] gradient-blue border-1px text-black px-2 py-1 rounded-md focus:outline-none"
          />
          <Input
            type="number"
            placeholder="Max Price"
            value={maxPrice}
            onChange={handleMaxPriceChange}
            className="w-[80px] gradient-blue border-1px text-black px-2 py-1 rounded-md focus:outline-none"
          />
        </div>
      )}

      {showMovingAverageInput && (
        <Input
          type="number"
          placeholder="Period"
          value={movingAveragePeriod}
          onChange={handleMovingAverageChange}
          className="w-[120px] gradient-blue border-1px text-black px-2 py-1 rounded-md focus:outline-none"
        />
      )}

      {showRsiInput && (
        <Input
          type="number"
          placeholder="Period"
          value={rsiPeriod}
          onChange={handleRsiChange}
          className="w-[120px] gradient-blue border-1px text-black px-2 py-1 rounded-md focus:outline-none"
        />
      )}

      {showMacdInput && (
        <div className="flex space-x-2">
          <Input
            type="number"
            placeholder="Fast"
            value={macdFast}
            onChange={handleMacdFastChange}
            className="w-[80px] gradient-blue border-1px text-black px-2 py-1 rounded-md focus:outline-none"
          />
          <Input
            type="number"
            placeholder="Slow"
            value={macdSlow}
            onChange={handleMacdSlowChange}
            className="w-[80px] gradient-blue border-1px text-black px-2 py-1 rounded-md focus:outline-none"
          />
        </div>
      )}

      {showBollingerInput && (
        <Input
          type="number"
          placeholder="Period"
          value={bollingerPeriod}
          onChange={handleBollingerChange}
          className="w-[120px] gradient-blue border-1px text-black px-2 py-1 rounded-md focus:outline-none"
        />
      )}

      {showDateRangeInput && (
        <DateRangeButton />
      ) }
    </div>
  );
}
