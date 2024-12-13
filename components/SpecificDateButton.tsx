"use client"

import * as React from "react"
import { format } from "date-fns"
import { CalendarIcon } from 'lucide-react'
import { Calendar } from "@/components/ui/calendar"
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"

interface SpecificDateButtonProps {
  onSelect?: (date: Date) => void;
}

export function SpecificDateButton({ onSelect }: SpecificDateButtonProps) {
  const [date, setDate] = React.useState<Date>()
  const [isPopoverOpen, setIsPopoverOpen] = React.useState(false)

  const handleSelect = (selectedDate: Date | undefined) => {
    if (selectedDate) {
      setDate(selectedDate);
      onSelect?.(selectedDate);
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
            "w-[200px] h-[40px] px-3 justify-start text-left font-normal rounded-lg shadow-sm hover:bg-gray-50",
            !date && "text-black"
          )}
        >
          <CalendarIcon className="mr-2 h-4 w-4 text-black" />
          {date ? (
            <span className="text-black">{format(date, "LLL dd, y")}</span>
          ) : (
            <span className="text-black">Pick a date</span>
          )}
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-auto p-0 rounded-lg shadow-lg" align="start">
        <Calendar
          mode="single"
          selected={date}
          onSelect={handleSelect}
          initialFocus
        />
      </PopoverContent>
    </Popover>
  )
} 