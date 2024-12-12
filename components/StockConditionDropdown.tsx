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

const stockConditions = {
  'Price-Based': [
    'Above Price',
    'Below Price',
    'Price Change %',
    'Price Range',
  ],
  'Technical Indicators': [
    'Moving Average',
    'Relative Strength Index (RSI)',
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
  const [selectedCondition, setSelectedCondition] = React.useState<string | null>(null)
  const [price, setPrice] = React.useState<string>('')
  const [showPriceInput, setShowPriceInput] = React.useState(false)

  const handleConditionSelect = (condition: string) => {
    setSelectedCondition(condition)
    setShowPriceInput(condition === 'Above Price' || condition === 'Below Price')
    setPrice('')
  }

  const handlePriceChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setPrice(e.target.value)
  }

  const getDisplayText = () => {
    if (selectedCondition === 'Above Price' && price) {
      return `Price > $${price}`
    } else if (selectedCondition === 'Below Price' && price) {
      return `Price < $${price}`
    } else {
      return selectedCondition || 'Select Condition'
    }
  }

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
    </div>
  )
}

