import { jsx as _jsx } from "react/jsx-runtime";
import { createContext, useContext, useMemo } from 'react';
import { useBreakpoint } from '../hooks/useBreakpoint';
import { DEFAULT_BREAKPOINTS } from '../utils/breakpoints';
const BreakpointContext = createContext(undefined);
/**
 * Provider component that supplies breakpoint context to child components
 */
export const BreakpointProvider = ({ children, breakpoints }) => {
    const customBreakpoints = useMemo(() => breakpoints ? { ...DEFAULT_BREAKPOINTS, ...breakpoints } : DEFAULT_BREAKPOINTS, [breakpoints]);
    const { breakpoint, screenWidth } = useBreakpoint(breakpoints);
    const value = useMemo(() => ({
        breakpoints: customBreakpoints,
        currentBreakpoint: breakpoint,
        screenWidth,
    }), [customBreakpoints, breakpoint, screenWidth]);
    return (_jsx(BreakpointContext.Provider, { value: value, children: children }));
};
/**
 * Hook to access breakpoint context
 */
export const useBreakpointContext = () => {
    const context = useContext(BreakpointContext);
    if (!context) {
        throw new Error('useBreakpointContext must be used within a BreakpointProvider');
    }
    return context;
};
//# sourceMappingURL=BreakpointContext.js.map