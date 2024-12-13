"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { DateRange } from "react-day-picker"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"

interface DateRangeButtonProps {
  onSelect?: (range: DateRange) => void;
}

export function DateRangeButton({ onSelect }: DateRangeButtonProps) {
    const [date, setDate] = React.useState<DateRange | undefined>()
    const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)
  
    const handleSelect = (range: DateRange | undefined) => {
      if (range) {
        setDate(range);
        onSelect?.(range);
      }
    };
  
    return (
      <Popover
        open={isPopoverOpen}
        onOpenChange={(isOpen) => setIsPopoverOpen(isOpen)}
      >
        <PopoverTrigger asChild>
          <Button
            variant={"outline"}
            className={cn(
              "w-[250px] h-[40px] px-3 justify-start text-left font-normal rounded-lg shadow-sm hover:bg-gray-50",
              !date && "text-muted-foreground"
            )}
          >
            <CalendarIcon className="mr-2 h-4 w-4 text-black" />
  
            {date?.from ? (
              date.to ? (
                <span className="text-black">
                  {format(date.from, "LLL dd, y")} - {format(date.to, "LLL dd, y")}
                </span>
              ) : (
                <span className="text-black">{format(date.from, "LLL dd, y")}</span>
              )
            ) : (
              <span className="text-black">Pick a date range</span>
            )}
          </Button>
        </PopoverTrigger>
        <PopoverContent className="w-auto p-0 rounded-lg shadow-lg" align="start">
          <Calendar
            initialFocus
            mode="range"
            defaultMonth={date?.from}
            selected={date}
            onSelect={handleSelect}
            numberOfMonths={2}
          />
        </PopoverContent>
      </Popover>
    )
  }
  
