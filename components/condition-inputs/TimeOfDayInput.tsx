import * as React from 'react'
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

interface TimeOfDayInputProps {
  onSelect: (time: string) => void;
  value?: string;
}

export function TimeOfDayInput({ onSelect, value }: TimeOfDayInputProps) {
  const times = [
    "9:30 AM", "10:00 AM", "11:00 AM", "12:00 PM",
    "1:00 PM", "2:00 PM", "3:00 PM", "4:00 PM"
  ];

  return (
    <Select onValueChange={onSelect} value={value}>
      <SelectTrigger className="w-[200px] gradient-blue text-black">
        <SelectValue placeholder="Select time" />
      </SelectTrigger>
      <SelectContent className="gradient-blue border-none">
        {times.map((time) => (
          <SelectItem key={time} value={time} className="cursor-pointer">
            {time}
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
} 