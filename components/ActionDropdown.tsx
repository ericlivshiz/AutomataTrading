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
import { actionTypes } from '@/data/actionTypes'
import { ActionValue } from '@/types/actionTypes'
import { DropDownPopover } from './DropDownPopover'

const stockOptions = [
  { value: 'AAPL', label: 'AAPL' },
  { value: 'GOOGL', label: 'GOOGL' },
  { value: 'MSFT', label: 'MSFT' },
  { value: 'AMZN', label: 'AMZN' },
  // Add more stocks as needed
];

interface ActionDropdownProps {
  onActionChange?: (value: ActionValue) => void;
}

export default function ActionDropdown({ onActionChange }: ActionDropdownProps) {
  const [selectedAction, setSelectedAction] = React.useState<string | null>(null);
  const [actionValue, setActionValue] = React.useState<ActionValue>({ action: '' });

  const handleActionSelect = (action: string) => {
    setSelectedAction(action);
    const newValue = { action };
    setActionValue(newValue);
    onActionChange?.(newValue);
  };

  const handleValueChange = (newValue: Partial<ActionValue>) => {
    const updatedValue = { ...actionValue, ...newValue };
    setActionValue(updatedValue);
    onActionChange?.(updatedValue);
  };

  const renderActionInput = () => {
    if (!selectedAction) return null;

    switch (selectedAction) {
      case 'Place Buy Order':
      case 'Place Sell Order':
        return (
          <div className="flex flex-col space-y-2">
            <DropDownPopover
              onSelect={(symbol) => handleValueChange({ symbol })}
              placeholder="Select Stock"
              options={stockOptions}
            />
            <Input
              type="number"
              placeholder="Quantity"
              value={actionValue.quantity || ''}
              onChange={(e) => handleValueChange({ quantity: Number(e.target.value) })}
              className="w-[200px] gradient-blue"
            />
          </div>
        );

      case 'Send Email':
        return (
          <div className="flex flex-col space-y-2">
            <Input
              type="email"
              placeholder="Email Address"
              value={actionValue.email || ''}
              onChange={(e) => handleValueChange({ email: e.target.value })}
              className="w-[200px] gradient-blue text-black"
            />
            <Input
              type="text"
              placeholder="Message"
              value={actionValue.message || ''}
              onChange={(e) => handleValueChange({ message: e.target.value })}
              className="w-[200px] gradient-blue text-black"
            />
          </div>
        );

      case 'Send Text':
        return (
          <div className="flex flex-col space-y-2">
            <Input
              type="tel"
              placeholder="Phone Number"
              value={actionValue.phoneNumber || ''}
              onChange={(e) => handleValueChange({ phoneNumber: e.target.value })}
              className="w-[200px] gradient-blue text-black"
            />
            <Input
              type="text"
              placeholder="Message"
              value={actionValue.message || ''}
              onChange={(e) => handleValueChange({ message: e.target.value })}
              className="w-[200px] gradient-blue text-black"
            />
          </div>
        );

      default:
        return null;
    }
  };

  const getDisplayText = () => {
    if (!selectedAction) return 'Select Action';
    
    const { action, symbol, quantity, email, message, phoneNumber } = actionValue;

    switch (action) {
      case 'Place Buy Order':
      case 'Place Sell Order':
        if (symbol && quantity) {
          return `${action}: ${symbol} x${quantity}`;
        }
        return action;
      case 'Send Email':
        if (email && message) {
          return `${action} to ${email}`;
        }
        return action;
      case 'Send Text':
        if (phoneNumber && message) {
          return `${action} to ${phoneNumber}`;
        }
        return action;
      default:
        return action;
    }
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
            {Object.entries(actionTypes).map(([category, actions]) => (
              <DropdownMenuSub key={category}>
                <DropdownMenuSubTrigger className="cursor-pointer">
                  <span>{category}</span>
                </DropdownMenuSubTrigger>
                <DropdownMenuPortal>
                  <DropdownMenuSubContent className="w-56 gradient-blue border-none">
                    {actions.map((action) => (
                      <DropdownMenuItem
                        key={action}
                        onSelect={() => handleActionSelect(action)}
                        className="cursor-pointer"
                      >
                        <span>{action}</span>
                      </DropdownMenuItem>
                    ))}
                  </DropdownMenuSubContent>
                </DropdownMenuPortal>
              </DropdownMenuSub>
            ))}
          </DropdownMenuGroup>
        </DropdownMenuContent>
      </DropdownMenu>

      {renderActionInput()}
    </div>
  );
} 