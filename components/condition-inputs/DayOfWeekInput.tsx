import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface DayOfWeekInputProps {
  onSelect: (day: string) => void;
  value?: string;
}

export function DayOfWeekInput({ onSelect, value }: DayOfWeekInputProps) {
  const days = [
    "Monday",
    "Tuesday",
    "Wednesday",
    "Thursday",
    "Friday"
  ];

  return (
    <Select onValueChange={onSelect} value={value}>
      <SelectTrigger className="w-[200px] gradient-blue text-black">
        <SelectValue placeholder="Select day" />
      </SelectTrigger>
      <SelectContent className="gradient-blue border-none">
        {days.map((day) => (
          <SelectItem key={day} value={day} className="cursor-pointer">
            {day}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 