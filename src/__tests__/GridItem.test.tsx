import React from 'react';
import { render } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import { Grid } from '../components/Grid';
import { GridItem } from '../components/GridItem';

// Mock useBreakpoint hook
jest.mock('../hooks/useBreakpoint', () => ({
  useBreakpoint: jest.fn(() => ({
    breakpoint: 'md',
    screenWidth: 800,
    screenHeight: 600,
  })),
}));

describe('GridItem', () => {
  const renderWithGrid = (children: React.ReactNode) => {
    return render(
      <Grid container>
        {children}
      </Grid>
    );
  };

  it('should render children correctly', () => {
    const { getByText } = renderWithGrid(
      <GridItem xs={6}>
        <Text>Test Content</Text>
      </GridItem>
    );

    expect(getByText('Test Content')).toBeTruthy();
  });

  it('should apply correct width based on span', () => {
    const { getByTestId } = renderWithGrid(
      <GridItem xs={6} testID="grid-item">
        <View />
      </GridItem>
    );

    const item = getByTestId('grid-item');
    expect(item.props.style).toEqual(
      expect.objectContaining({
        flexBasis: '50%', // 6/12 * 100%
        maxWidth: '50%',
      })
    );
  });

  it('should use current breakpoint value', () => {
    const { getByTestId } = renderWithGrid(
      <GridItem xs={12} sm={6} md={4} lg={3} testID="grid-item">
        <View />
      </GridItem>
    );

    const item = getByTestId('grid-item');
    // Should use md value (4) since breakpoint is 'md'
    expect(item.props.style).toEqual(
      expect.objectContaining({
        flexBasis: '33.333333333333336%', // 4/12 * 100%
        maxWidth: '33.333333333333336%',
      })
    );
  });

  it('should fallback to smaller breakpoints', () => {
    const { getByTestId } = renderWithGrid(
      <GridItem xs={12} sm={6} testID="grid-item">
        <View />
      </GridItem>
    );

    const item = getByTestId('grid-item');
    // Should use sm value (6) since md is not defined and sm is the next smaller
    expect(item.props.style).toEqual(
      expect.objectContaining({
        flexBasis: '50%', // 6/12 * 100%
        maxWidth: '50%',
      })
    );
  });

  it('should handle boolean values', () => {
    const { getByTestId } = renderWithGrid(
      <GridItem xs={true} testID="grid-item">
        <View />
      </GridItem>
    );

    const item = getByTestId('grid-item');
    // true should equal full width (12 columns)
    expect(item.props.style).toEqual(
      expect.objectContaining({
        flexBasis: '100%', // 12/12 * 100%
        maxWidth: '100%',
      })
    );
  });

  it('should handle auto sizing', () => {
    const { getByTestId } = renderWithGrid(
      <GridItem xs={false} testID="grid-item">
        <View />
      </GridItem>
    );

    const item = getByTestId('grid-item');
    // false should result in auto sizing
    expect(item.props.style).toEqual(
      expect.objectContaining({
        flexGrow: 1,
        flexBasis: 0,
      })
    );
  });

  it('should apply padding based on spacing', () => {
    const { getByTestId } = render(
      <Grid container spacing={16}>
        <GridItem xs={6} testID="grid-item">
          <View />
        </GridItem>
      </Grid>
    );

    const item = getByTestId('grid-item');
    expect(item.props.style).toEqual(
      expect.objectContaining({
        paddingHorizontal: 8, // spacing/2
      })
    );
  });

  it('should default to full width when no breakpoint props provided', () => {
    const { getByTestId } = renderWithGrid(
      <GridItem testID="grid-item">
        <View />
      </GridItem>
    );

    const item = getByTestId('grid-item');
    expect(item.props.style).toEqual(
      expect.objectContaining({
        flexBasis: '100%', // Full width (12/12)
        maxWidth: '100%',
      })
    );
  });

  it('should pass through custom styles', () => {
    const customStyle = { backgroundColor: 'blue' };
    
    const { getByTestId } = renderWithGrid(
      <GridItem xs={6} style={customStyle} testID="grid-item">
        <View />
      </GridItem>
    );

    const item = getByTestId('grid-item');
    expect(item.props.style).toEqual(
      expect.arrayContaining([customStyle])
    );
  });

  it('should warn about invalid span values in development', () => {
    const consoleSpy = jest.spyOn(console, 'warn').mockImplementation();
    
    renderWithGrid(
      <GridItem xs={15} testID="grid-item">
        <View />
      </GridItem>
    );

    expect(consoleSpy).toHaveBeenCalledWith(
      expect.stringContaining('Invalid span value 15')
    );
    
    consoleSpy.mockRestore();
  });

  it('should throw error when used outside Grid container', () => {
    expect(() => {
      render(
        <GridItem xs={6}>
          <View />
        </GridItem>
      );
    }).toThrow('useGridContext must be used within a Grid container');
  });
});
