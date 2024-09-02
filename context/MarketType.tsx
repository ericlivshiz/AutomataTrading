'use client';

import React, { createContext, useState } from 'react';

interface MarketTypeContextProps {
  marketType: string;
  setMarketType: (type: string) => void;
}

export const MarketTypeContext = createContext<MarketTypeContextProps>({
  marketType: '',
  setMarketType: () => {},
});

export const MarketTypeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [marketType, setMarketType] = useState('');

  return (
    <MarketTypeContext.Provider value={{ marketType, setMarketType }}>
      {children}
    </MarketTypeContext.Provider>
  );
};
