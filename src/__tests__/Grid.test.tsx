import React from 'react';
import { render } from '@testing-library/react-native';
import { View, Text } from 'react-native';
import { Grid } from '../components/Grid';

// Mock useBreakpoint hook
jest.mock('../hooks/useBreakpoint', () => ({
  useBreakpoint: jest.fn(() => ({
    breakpoint: 'md',
    screenWidth: 800,
    screenHeight: 600,
  })),
}));

describe('Grid', () => {
  it('should render children correctly', () => {
    const { getByText } = render(
      <Grid container>
        <Text>Test Content</Text>
      </Grid>
    );

    expect(getByText('Test Content')).toBeTruthy();
  });

  it('should apply container styles when container prop is true', () => {
    const { getByTestId } = render(
      <Grid container testID="grid-container">
        <View />
      </Grid>
    );

    const container = getByTestId('grid-container');
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          flexDirection: 'row',
          flexWrap: 'wrap',
        }),
      ])
    );
  });

  it('should apply custom spacing correctly', () => {
    const { getByTestId } = render(
      <Grid container spacing={16} testID="grid-container">
        <View />
      </Grid>
    );

    const container = getByTestId('grid-container');
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          marginHorizontal: -8, // -spacing/2
        }),
      ])
    );
  });

  it('should handle responsive spacing values', () => {
    const responsiveSpacing = { xs: 8, md: 16, lg: 24 };
    
    const { getByTestId } = render(
      <Grid container spacing={responsiveSpacing} testID="grid-container">
        <View />
      </Grid>
    );

    const container = getByTestId('grid-container');
    // Should use md value (16) since breakpoint is 'md'
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          marginHorizontal: -8, // -16/2
        }),
      ])
    );
  });

  it('should apply custom direction', () => {
    const { getByTestId } = render(
      <Grid container direction="column" testID="grid-container">
        <View />
      </Grid>
    );

    const container = getByTestId('grid-container');
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          flexDirection: 'column',
        }),
      ])
    );
  });

  it('should handle different column and row spacing', () => {
    const { getByTestId } = render(
      <Grid 
        container 
        columnSpacing={12} 
        rowSpacing={8} 
        testID="grid-container"
      >
        <View />
      </Grid>
    );

    const container = getByTestId('grid-container');
    expect(container.props.style).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          marginHorizontal: -6, // -columnSpacing/2
        }),
      ])
    );
  });

  it('should pass through custom styles', () => {
    const customStyle = { backgroundColor: 'red' };
    
    const { getByTestId } = render(
      <Grid container style={customStyle} testID="grid-container">
        <View />
      </Grid>
    );

    const container = getByTestId('grid-container');
    expect(container.props.style).toEqual(
      expect.arrayContaining([customStyle])
    );
  });

  it('should throw error when useGridContext is used outside Grid', () => {
    // This test requires a component that uses useGridContext
    const TestComponent = () => {
      const { useGridContext } = require('../components/Grid');
      useGridContext();
      return <View />;
    };

    expect(() => render(<TestComponent />)).toThrow(
      'useGridContext must be used within a Grid container'
    );
  });
});
