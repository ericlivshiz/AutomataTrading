export type StockConditionCategory = 'Price-Based' | 'Technical Indicators' | 'Time-Based';

export type StockConditionValue = {
  condition: string;
  value?: string | number;
  value2?: string | number;
  dateRange?: {
    from: Date;
    to: Date;
  };
  specificDate?: Date;
}

export interface ConditionInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
} 