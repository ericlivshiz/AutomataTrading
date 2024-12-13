import { Input } from '@/components/ui/input';
import { ConditionInputProps } from '@/types/stockConditions';

export function PriceInput({ value, onChange, className }: ConditionInputProps) {
  return (
    <Input
      type="number"
      placeholder="Enter price"
      value={value}
      onChange={onChange}
      className={`w-[120px] gradient-blue border-1px text-black px-2 py-1 rounded-md focus:outline-none ${className}`}
    />
  );
} 