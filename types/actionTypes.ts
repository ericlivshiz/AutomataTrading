export type ActionCategory = 'Trading' | 'Notifications';

export type ActionValue = {
  action: string;
  symbol?: string;
  quantity?: number;
  email?: string;
  message?: string;
  phoneNumber?: string;
}

export interface ActionInputProps {
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  className?: string;
} 