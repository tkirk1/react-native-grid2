import { renderHook, act } from '@testing-library/react-native';
import { Dimensions } from 'react-native';
import { useBreakpoint } from '../hooks/useBreakpoint';

// Mock Dimensions
const mockDimensions = {
  addEventListener: jest.fn(),
  get: jest.fn(),
};

jest.mock('react-native', () => ({
  Dimensions: mockDimensions,
  I18nManager: { isRTL: false },
}));

describe('useBreakpoint', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    mockDimensions.get.mockReturnValue({ width: 800, height: 600 });
  });

  it('should return correct breakpoint for different screen widths', () => {
    const testCases = [
      { width: 320, expected: 'xs' },
      { width: 600, expected: 'sm' },
      { width: 900, expected: 'md' },
      { width: 1200, expected: 'lg' },
      { width: 1536, expected: 'xl' },
    ];

    testCases.forEach(({ width, expected }) => {
      mockDimensions.get.mockReturnValue({ width, height: 600 });
      
      const { result } = renderHook(() => useBreakpoint());
      
      expect(result.current.breakpoint).toBe(expected);
      expect(result.current.screenWidth).toBe(width);
    });
  });

  it('should use custom breakpoints when provided', () => {
    const customBreakpoints = {
      sm: 500,
      md: 800,
    };

    mockDimensions.get.mockReturnValue({ width: 750, height: 600 });
    
    const { result } = renderHook(() => useBreakpoint(customBreakpoints));
    
    expect(result.current.breakpoint).toBe('sm');
  });

  it('should update breakpoint when screen size changes', () => {
    mockDimensions.get.mockReturnValue({ width: 800, height: 600 });
    
    const { result } = renderHook(() => useBreakpoint());
    
    expect(result.current.breakpoint).toBe('sm');

    // Mock dimension change
    const mockListener = mockDimensions.addEventListener.mock.calls[0][1];
    
    act(() => {
      mockListener({ window: { width: 1300, height: 800 } });
      
      // Fast-forward timers to handle debouncing
      jest.advanceTimersByTime(100);
    });

    expect(result.current.breakpoint).toBe('lg');
    expect(result.current.screenWidth).toBe(1300);
  });

  it('should debounce dimension changes', () => {
    jest.useFakeTimers();
    
    mockDimensions.get.mockReturnValue({ width: 800, height: 600 });
    
    const { result } = renderHook(() => useBreakpoint());
    
    const mockListener = mockDimensions.addEventListener.mock.calls[0][1];
    
    // Trigger multiple rapid changes
    act(() => {
      mockListener({ window: { width: 1000, height: 800 } });
      mockListener({ window: { width: 1100, height: 800 } });
      mockListener({ window: { width: 1200, height: 800 } });
    });

    // Should not update immediately
    expect(result.current.screenWidth).toBe(800);

    // Fast-forward past debounce delay
    act(() => {
      jest.advanceTimersByTime(100);
    });

    // Should update to the last value
    expect(result.current.screenWidth).toBe(1200);
    expect(result.current.breakpoint).toBe('lg');
    
    jest.useRealTimers();
  });

  it('should clean up event listeners on unmount', () => {
    const mockRemove = jest.fn();
    mockDimensions.addEventListener.mockReturnValue({ remove: mockRemove });
    
    const { unmount } = renderHook(() => useBreakpoint());
    
    unmount();
    
    expect(mockRemove).toHaveBeenCalled();
  });
});
