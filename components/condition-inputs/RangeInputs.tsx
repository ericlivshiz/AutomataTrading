import { Input } from '@/components/ui/input';

interface RangeInputsProps {
  minValue: string;
  maxValue: string;
  onMinChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  onMaxChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  minPlaceholder?: string;
  maxPlaceholder?: string;
}

export function RangeInputs({
  minValue,
  maxValue,
  onMinChange,
  onMaxChange,
  minPlaceholder = "Min",
  maxPlaceholder = "Max"
}: RangeInputsProps) {
  return (
    <div className="flex space-x-2">
      <Input
        type="number"
        placeholder={minPlaceholder}
        value={minValue}
        onChange={onMinChange}
        className="w-[80px] gradient-blue border-1px text-black px-2 py-1 rounded-md focus:outline-none"
      />
      <Input
        type="number"
        placeholder={maxPlaceholder}
        value={maxValue}
        onChange={onMaxChange}
        className="w-[80px] gradient-blue border-1px text-black px-2 py-1 rounded-md focus:outline-none"
      />
    </div>
  );
} 