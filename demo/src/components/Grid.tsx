import React, { createContext, useContext, useMemo, useCallback } from 'react';
import { View, Dimensions, StyleSheet } from 'react-native';
import type { ViewStyle, StyleProp } from 'react-native';

// Types
export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
export type ResponsiveValue<T> = T | Partial<Record<Breakpoint, T>>;
export type GridDirection = 'row' | 'column' | 'row-reverse' | 'column-reverse';
export type GridWrap = 'wrap' | 'nowrap' | 'wrap-reverse';
export type GridSize = number | 'auto' | 'grow';

export interface GridProps {
  children: React.ReactNode;
  container?: boolean;
  size?: ResponsiveValue<GridSize>;
  offset?: ResponsiveValue<number | 'auto'>;
  columns?: ResponsiveValue<number>;
  spacing?: ResponsiveValue<number>;
  rowSpacing?: ResponsiveValue<number>;
  columnSpacing?: ResponsiveValue<number>;
  direction?: ResponsiveValue<GridDirection>;
  wrap?: ResponsiveValue<GridWrap>;
  style?: StyleProp<ViewStyle>;
  testID?: string;
}

// Default breakpoints
const DEFAULT_BREAKPOINTS = {
  xs: 0,
  sm: 600,
  md: 900,
  lg: 1200,
  xl: 1536,
};

// Grid Context
interface GridContextValue {
  columns: number;
  spacing: number;
  rowSpacing: number;
  columnSpacing: number;
  direction: GridDirection;
  wrap: GridWrap;
  breakpoint: Breakpoint;
}

const GridContext = createContext<GridContextValue>({
  columns: 12,
  spacing: 0,
  rowSpacing: 0,
  columnSpacing: 0,
  direction: 'row',
  wrap: 'wrap',
  breakpoint: 'xs',
});

// Breakpoint Provider Context
interface BreakpointContextValue {
  breakpoints: Record<Breakpoint, number>;
  currentBreakpoint: Breakpoint;
  screenWidth: number;
}

const BreakpointContext = createContext<BreakpointContextValue>({
  breakpoints: DEFAULT_BREAKPOINTS,
  currentBreakpoint: 'xs',
  screenWidth: 0,
});

// Breakpoint Provider
export const BreakpointProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [screenData, setScreenData] = React.useState(() => {
    const { width } = Dimensions.get('window');
    return { width };
  });

  React.useEffect(() => {
    const subscription = Dimensions.addEventListener('change', ({ window }) => {
      setScreenData({ width: window.width });
    });

    return () => subscription?.remove();
  }, []);

  const getCurrentBreakpoint = useCallback((width: number): Breakpoint => {
    const breakpoints = DEFAULT_BREAKPOINTS;
    if (width >= breakpoints.xl) return 'xl';
    if (width >= breakpoints.lg) return 'lg';
    if (width >= breakpoints.md) return 'md';
    if (width >= breakpoints.sm) return 'sm';
    return 'xs';
  }, []);

  const contextValue = useMemo(() => ({
    breakpoints: DEFAULT_BREAKPOINTS,
    currentBreakpoint: getCurrentBreakpoint(screenData.width),
    screenWidth: screenData.width,
  }), [screenData.width, getCurrentBreakpoint]);

  return (
    <BreakpointContext.Provider value={contextValue}>
      {children}
    </BreakpointContext.Provider>
  );
};

// Utility function to resolve responsive values
const resolveResponsiveValue = <T,>(
  value: ResponsiveValue<T>,
  breakpoint: Breakpoint,
  fallback: T
): T => {
  if (typeof value === 'object' && value !== null) {
    const breakpointOrder: Breakpoint[] = ['xs', 'sm', 'md', 'lg', 'xl'];
    const currentIndex = breakpointOrder.indexOf(breakpoint);
    
    // Look for the value at the current breakpoint or the nearest smaller one
    for (let i = currentIndex; i >= 0; i--) {
      const bp = breakpointOrder[i];
      if (value[bp] !== undefined) {
        return value[bp] as T;
      }
    }
    
    return fallback;
  }
  
  return value as T;
};

// Grid Component
export const Grid: React.FC<GridProps> = ({
  children,
  container = false,
  size,
  offset,
  columns = 12,
  spacing = 0,
  rowSpacing,
  columnSpacing,
  direction = 'row',
  wrap = 'wrap',
  style,
  testID,
}) => {
  const breakpointContext = useContext(BreakpointContext);
  const gridContext = useContext(GridContext);
  const currentBreakpoint = breakpointContext.currentBreakpoint;

  // Resolve responsive values
  const resolvedColumns = resolveResponsiveValue(columns, currentBreakpoint, 12);
  const resolvedSpacing = resolveResponsiveValue(spacing, currentBreakpoint, 0);
  const resolvedRowSpacing = resolveResponsiveValue(rowSpacing || spacing, currentBreakpoint, resolvedSpacing);
  const resolvedColumnSpacing = resolveResponsiveValue(columnSpacing || spacing, currentBreakpoint, resolvedSpacing);
  const resolvedDirection = resolveResponsiveValue(direction, currentBreakpoint, 'row');
  const resolvedWrap = resolveResponsiveValue(wrap, currentBreakpoint, 'wrap');
  const resolvedSize = size ? resolveResponsiveValue(size, currentBreakpoint, 'auto') : undefined;
  const resolvedOffset = offset ? resolveResponsiveValue(offset, currentBreakpoint, 0) : 0;

  // Create grid context for container
  const gridContextValue = useMemo(() => ({
    columns: resolvedColumns,
    spacing: resolvedSpacing,
    rowSpacing: resolvedRowSpacing,
    columnSpacing: resolvedColumnSpacing,
    direction: resolvedDirection,
    wrap: resolvedWrap,
    breakpoint: currentBreakpoint,
  }), [resolvedColumns, resolvedSpacing, resolvedRowSpacing, resolvedColumnSpacing, resolvedDirection, resolvedWrap, currentBreakpoint]);

  // Calculate item styles
  const itemStyles = useMemo(() => {
    if (!resolvedSize || container) return {};

    const { columns: contextColumns, columnSpacing: contextColumnSpacing, rowSpacing: contextRowSpacing } = gridContext;
    
    let flexBasis: string | number = 'auto';
    let flexGrow = 0;
    let flexShrink = 0;

    if (resolvedSize === 'grow') {
      flexGrow = 1;
      flexBasis = 0;
    } else if (typeof resolvedSize === 'number') {
      const percentage = (resolvedSize / contextColumns) * 100;
      flexBasis = `${percentage}%`;
    }

    return StyleSheet.create({
      item: {
        flexGrow,
        flexShrink,
        flexBasis: flexBasis as any,
        marginLeft: resolvedOffset && typeof resolvedOffset === 'number' ? `${(resolvedOffset / contextColumns) * 100}%` as any : 0,
        paddingHorizontal: contextColumnSpacing / 2,
        paddingVertical: contextRowSpacing / 2,
      }
    }).item;
  }, [resolvedSize, resolvedOffset, container, gridContext]);

  // Container styles
  const containerStyles = useMemo(() => {
    if (!container) return {};

    return StyleSheet.create({
      container: {
        flexDirection: resolvedDirection as any,
        flexWrap: resolvedWrap as any,
        marginHorizontal: -resolvedColumnSpacing / 2,
        marginVertical: -resolvedRowSpacing / 2,
      }
    }).container;
  }, [container, resolvedDirection, resolvedWrap, resolvedColumnSpacing, resolvedRowSpacing]);

  const combinedStyles = [
    container ? containerStyles : itemStyles,
    style,
  ] as StyleProp<ViewStyle>;

  if (container) {
    return (
      <GridContext.Provider value={gridContextValue}>
        <View style={combinedStyles} testID={testID}>
          {children}
        </View>
      </GridContext.Provider>
    );
  }

  return (
    <View style={combinedStyles} testID={testID}>
      {children}
    </View>
  );
};

export const useGridContext = (): GridContextValue => {
  return useContext(GridContext);
};