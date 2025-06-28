import { GridDirection } from '../types';
/**
 * Generates and caches item styles based on span, columns, and spacing
 */
export declare const getItemStyles: (span: number, columns: number, columnSpacing: number, rowSpacing: number, direction: GridDirection) => any;
/**
 * Clears the style cache (useful for testing or memory management)
 */
export declare const clearStyleCache: () => void;
/**
 * Gets the current cache size (useful for debugging)
 */
export declare const getStyleCacheSize: () => number;
//# sourceMappingURL=styleCache.d.ts.map