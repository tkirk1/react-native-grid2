import { useState, useEffect, useCallback } from 'react';
import { Dimensions } from 'react-native';
import { DEFAULT_BREAKPOINTS } from '../utils/breakpoints';
/**
 * Custom hook to determine the current breakpoint based on screen width
 */
export const useBreakpoint = (customBreakpoints) => {
    const breakpoints = { ...DEFAULT_BREAKPOINTS, ...customBreakpoints };
    const [dimensions, setDimensions] = useState(() => {
        const { width, height } = Dimensions.get('window');
        return { width, height };
    });
    const getCurrentBreakpoint = useCallback((width) => {
        if (width >= breakpoints.xl)
            return 'xl';
        if (width >= breakpoints.lg)
            return 'lg';
        if (width >= breakpoints.md)
            return 'md';
        if (width >= breakpoints.sm)
            return 'sm';
        return 'xs';
    }, [breakpoints]);
    const [breakpoint, setBreakpoint] = useState(() => getCurrentBreakpoint(dimensions.width));
    useEffect(() => {
        let timeoutId;
        const subscription = Dimensions.addEventListener('change', ({ window }) => {
            // Debounce the breakpoint calculation to avoid excessive re-renders
            clearTimeout(timeoutId);
            timeoutId = setTimeout(() => {
                setDimensions({ width: window.width, height: window.height });
                setBreakpoint(getCurrentBreakpoint(window.width));
            }, 100);
        });
        return () => {
            clearTimeout(timeoutId);
            subscription?.remove();
        };
    }, [getCurrentBreakpoint]);
    return {
        breakpoint,
        screenWidth: dimensions.width,
        screenHeight: dimensions.height,
    };
};
//# sourceMappingURL=useBreakpoint.js.map