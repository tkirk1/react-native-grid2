import { jsx as _jsx } from "react/jsx-runtime";
import { useMemo, useContext, createContext } from 'react';
import { View, StyleSheet, I18nManager } from 'react-native';
import { useBreakpoint } from '../hooks/useBreakpoint';
const GridContext = createContext(undefined);
/**
 * Resolves responsive values based on current breakpoint
 */
const resolveResponsiveValue = (value, breakpoint, fallback) => {
    if (value === undefined)
        return fallback;
    if (typeof value === 'object' && value !== null && !Array.isArray(value)) {
        // Try to find the value for current breakpoint, falling back to smaller breakpoints
        const breakpointOrder = ['xl', 'lg', 'md', 'sm', 'xs'];
        const currentIndex = breakpointOrder.indexOf(breakpoint);
        // Check current and smaller breakpoints
        for (let i = currentIndex; i < breakpointOrder.length; i++) {
            const bp = breakpointOrder[i];
            if (bp in value && value[bp] !== undefined) {
                return value[bp];
            }
        }
        return fallback;
    }
    return value;
};
/**
 * Grid component that can act as both container and item
 */
export const Grid = ({ children, container = false, size, offset, columns: columnsProp = 12, spacing: spacingProp = 0, rowSpacing: rowSpacingProp, columnSpacing: columnSpacingProp, direction: directionProp = 'row', wrap: wrapProp = 'wrap', style, testID, ...otherProps }) => {
    const { breakpoint } = useBreakpoint();
    const parentContext = useContext(GridContext);
    // Resolve responsive values
    const columns = resolveResponsiveValue(columnsProp, breakpoint, parentContext?.columns || 12);
    const spacing = resolveResponsiveValue(spacingProp, breakpoint, parentContext?.spacing || 0);
    const rowSpacing = resolveResponsiveValue(rowSpacingProp, breakpoint, parentContext?.rowSpacing || spacing);
    const columnSpacing = resolveResponsiveValue(columnSpacingProp, breakpoint, parentContext?.columnSpacing || spacing);
    const direction = resolveResponsiveValue(directionProp, breakpoint, parentContext?.direction || 'row');
    const wrap = resolveResponsiveValue(wrapProp, breakpoint, parentContext?.wrap || 'wrap');
    const resolvedSize = resolveResponsiveValue(size, breakpoint, undefined);
    const resolvedOffset = resolveResponsiveValue(offset, breakpoint, undefined);
    // Determine if this is a grid item (has size prop or is inside a container)
    const isItem = size !== undefined || (!container && parentContext);
    // Create context value for child components
    const contextValue = useMemo(() => ({
        columns,
        spacing,
        rowSpacing,
        columnSpacing,
        direction,
        wrap,
        breakpoint,
    }), [columns, spacing, rowSpacing, columnSpacing, direction, wrap, breakpoint]);
    // Calculate container styles
    const containerStyle = useMemo(() => {
        if (!container)
            return undefined;
        const isRow = direction === 'row' || direction === 'row-reverse';
        const negativeMargin = spacing > 0 ? -spacing / 2 : 0;
        return {
            flexDirection: direction,
            flexWrap: wrap,
            marginHorizontal: isRow ? negativeMargin : 0,
            marginVertical: !isRow ? negativeMargin : 0,
        };
    }, [container, direction, wrap, spacing]);
    // Calculate item styles
    const itemStyle = useMemo(() => {
        if (!isItem || !parentContext)
            return undefined;
        const parentColumns = parentContext.columns;
        const isRow = parentContext.direction === 'row' || parentContext.direction === 'row-reverse';
        const itemSpacing = parentContext.spacing / 2;
        let width;
        let flex;
        if (resolvedSize === 'grow') {
            flex = 1;
        }
        else if (resolvedSize === 'auto') {
            // Auto width - content based
            width = undefined;
        }
        else if (typeof resolvedSize === 'number') {
            const percentage = (resolvedSize / parentColumns) * 100;
            width = `${percentage}%`;
        }
        // Calculate offset using margin
        const offsetStyle = {};
        if (resolvedOffset !== undefined) {
            if (resolvedOffset === 'auto') {
                if (isRow) {
                    offsetStyle.marginLeft = 'auto';
                }
                else {
                    offsetStyle.marginTop = 'auto';
                }
            }
            else if (typeof resolvedOffset === 'number') {
                const offsetPercentage = (resolvedOffset / parentColumns) * 100;
                if (isRow) {
                    offsetStyle.marginLeft = `${offsetPercentage}%`;
                }
                else {
                    offsetStyle.marginTop = `${offsetPercentage}%`;
                }
            }
        }
        return {
            ...(width && { width }),
            ...(flex && { flex }),
            paddingHorizontal: isRow ? itemSpacing : 0,
            paddingVertical: !isRow ? itemSpacing : 0,
            ...offsetStyle,
            ...(I18nManager.isRTL && isRow && offsetStyle.marginLeft && {
                // RTL support: swap margins for horizontal layouts
                marginRight: offsetStyle.marginLeft,
                marginLeft: undefined,
            }),
        };
    }, [isItem, parentContext, resolvedSize, resolvedOffset]);
    const combinedStyle = [
        container && styles.container,
        containerStyle,
        itemStyle,
        style,
    ].filter(Boolean);
    const content = (_jsx(View, { style: combinedStyle, testID: testID, ...otherProps, children: children }));
    // Only provide context if this is a container
    if (container) {
        return (_jsx(GridContext.Provider, { value: contextValue, children: content }));
    }
    return content;
};
/**
 * Hook to access Grid context
 */
export const useGridContext = () => {
    const context = useContext(GridContext);
    if (!context) {
        throw new Error('useGridContext must be used within a Grid container');
    }
    return context;
};
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        flexWrap: 'wrap',
    },
});
//# sourceMappingURL=Grid.js.map