import { BreakpointValues } from '../types';
/**
 * Default breakpoint values matching MUI Grid 2 breakpoints
 */
export declare const DEFAULT_BREAKPOINTS: BreakpointValues;
/**
 * Common device breakpoints for testing
 */
export declare const DEVICE_BREAKPOINTS: {
    readonly MOBILE_SMALL: 320;
    readonly MOBILE_MEDIUM: 375;
    readonly MOBILE_LARGE: 414;
    readonly MOBILE_LANDSCAPE_SMALL: 568;
    readonly MOBILE_LANDSCAPE_MEDIUM: 667;
    readonly MOBILE_LANDSCAPE_LARGE: 896;
    readonly TABLET_SMALL: 768;
    readonly TABLET_MEDIUM: 834;
    readonly TABLET_LARGE: 1024;
    readonly TABLET_XL: 1366;
    readonly DESKTOP_SMALL: 1280;
    readonly DESKTOP_MEDIUM: 1440;
    readonly DESKTOP_LARGE: 1920;
};
/**
 * Validates breakpoint values
 */
export declare const validateBreakpoints: (breakpoints: Partial<BreakpointValues>) => boolean;
//# sourceMappingURL=breakpoints.d.ts.map