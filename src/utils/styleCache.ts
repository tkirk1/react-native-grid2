import { I18nManager } from 'react-native';
import { GridDirection } from '../types';

// Cache for memoized styles to improve performance
const styleCache = new Map<string, any>();

/**
 * Generates and caches item styles based on span, columns, and spacing
 */
export const getItemStyles = (
  span: number,
  columns: number,
  columnSpacing: number,
  rowSpacing: number,
  direction: GridDirection
) => {
  const cacheKey = `${span}-${columns}-${columnSpacing}-${rowSpacing}-${direction}-${I18nManager.isRTL}`;
  
  if (styleCache.has(cacheKey)) {
    return styleCache.get(cacheKey);
  }

  const isRow = direction === 'row' || direction === 'row-reverse';
  
  // Calculate flex basis as percentage
  const widthPercentage = (span / columns) * 100;
  
  // Calculate padding based on direction
  const horizontalPadding = isRow ? columnSpacing / 2 : 0;
  const verticalPadding = !isRow ? rowSpacing / 2 : 0;

  const styles = {
    flexBasis: `${widthPercentage}%`,
    maxWidth: `${widthPercentage}%`,
    paddingHorizontal: horizontalPadding,
    paddingVertical: verticalPadding,
    ...(I18nManager.isRTL && isRow && {
      // RTL support: swap padding for horizontal layouts
      paddingLeft: horizontalPadding,
      paddingRight: horizontalPadding,
    }),
  };

  // Cache the computed styles
  styleCache.set(cacheKey, styles);
  
  return styles;
};

/**
 * Clears the style cache (useful for testing or memory management)
 */
export const clearStyleCache = () => {
  styleCache.clear();
};

/**
 * Gets the current cache size (useful for debugging)
 */
export const getStyleCacheSize = () => {
  return styleCache.size;
};
