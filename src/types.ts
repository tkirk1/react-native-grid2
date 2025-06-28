import { ViewStyle, StyleProp } from 'react-native';

export type Breakpoint = 'xs' | 'sm' | 'md' | 'lg' | 'xl';

export type BreakpointValues = Record<Breakpoint, number>;

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

export interface BreakpointProviderProps {
  children: React.ReactNode;
  breakpoints?: Partial<BreakpointValues>;
}

export interface GridContextValue {
  columns: number;
  spacing: number;
  rowSpacing: number;
  columnSpacing: number;
  direction: GridDirection;
  wrap: GridWrap;
  breakpoint: Breakpoint;
}

export interface BreakpointContextValue {
  breakpoints: BreakpointValues;
  currentBreakpoint: Breakpoint;
  screenWidth: number;
}
