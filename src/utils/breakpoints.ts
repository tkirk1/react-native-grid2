import { BreakpointValues } from '../types';

/**
 * Default breakpoint values matching MUI Grid 2 breakpoints
 */
export const DEFAULT_BREAKPOINTS: BreakpointValues = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

/**
 * Common device breakpoints for testing
 */
export const DEVICE_BREAKPOINTS = {
  // Mobile devices (portrait)
  MOBILE_SMALL: 320,   // iPhone SE
  MOBILE_MEDIUM: 375,  // iPhone 12/13/14
  MOBILE_LARGE: 414,   // iPhone 12/13/14 Pro Max
  
  // Mobile devices (landscape)
  MOBILE_LANDSCAPE_SMALL: 568,  // iPhone SE landscape
  MOBILE_LANDSCAPE_MEDIUM: 667, // iPhone 12/13/14 landscape
  MOBILE_LANDSCAPE_LARGE: 896,  // iPhone 12/13/14 Pro Max landscape
  
  // Tablets
  TABLET_SMALL: 768,   // iPad Mini
  TABLET_MEDIUM: 834,  // iPad Air
  TABLET_LARGE: 1024,  // iPad Pro 11"
  TABLET_XL: 1366,     // iPad Pro 12.9"
  
  // Desktop
  DESKTOP_SMALL: 1280,
  DESKTOP_MEDIUM: 1440,
  DESKTOP_LARGE: 1920,
} as const;

/**
 * Validates breakpoint values
 */
export const validateBreakpoints = (breakpoints: Partial<BreakpointValues>): boolean => {
  const keys = Object.keys(breakpoints) as Array<keyof BreakpointValues>;
  const sortedKeys = keys.sort((a, b) => {
    const order = ['xs', 'sm', 'md', 'lg', 'xl'];
    return order.indexOf(a) - order.indexOf(b);
  });

  for (let i = 1; i < sortedKeys.length; i++) {
    const current = breakpoints[sortedKeys[i]];
    const previous = breakpoints[sortedKeys[i - 1]];
    
    if (current !== undefined && previous !== undefined && current <= previous) {
      console.warn(
        `Invalid breakpoint configuration: ${sortedKeys[i]} (${current}) should be greater than ${sortedKeys[i - 1]} (${previous})`
      );
      return false;
    }
  }
  
  return true;
};
