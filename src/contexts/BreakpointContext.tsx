import React, { createContext, useContext, useMemo } from 'react';
import { BreakpointContextValue, BreakpointProviderProps } from '../types';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { DEFAULT_BREAKPOINTS } from '../utils/breakpoints';

const BreakpointContext = createContext<BreakpointContextValue | undefined>(undefined);

/**
 * Provider component that supplies breakpoint context to child components
 */
export const BreakpointProvider: React.FC<BreakpointProviderProps> = ({ 
  children, 
  breakpoints 
}) => {
  const customBreakpoints = useMemo(() => 
    breakpoints ? { ...DEFAULT_BREAKPOINTS, ...breakpoints } : DEFAULT_BREAKPOINTS,
    [breakpoints]
  );

  const { breakpoint, screenWidth } = useBreakpoint(breakpoints);

  const value = useMemo<BreakpointContextValue>(() => ({
    breakpoints: customBreakpoints,
    currentBreakpoint: breakpoint,
    screenWidth,
  }), [customBreakpoints, breakpoint, screenWidth]);

  return (
    <BreakpointContext.Provider value={value}>
      {children}
    </BreakpointContext.Provider>
  );
};

/**
 * Hook to access breakpoint context
 */
export const useBreakpointContext = (): BreakpointContextValue => {
  const context = useContext(BreakpointContext);
  if (!context) {
    throw new Error('useBreakpointContext must be used within a BreakpointProvider');
  }
  return context;
};
