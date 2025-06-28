import { I18nManager } from 'react-native';
import { getItemStyles, clearStyleCache, getStyleCacheSize } from '../utils/styleCache';

// Mock I18nManager
jest.mock('react-native', () => ({
  I18nManager: {
    isRTL: false,
  },
}));

describe('styleCache', () => {
  beforeEach(() => {
    clearStyleCache();
    (I18nManager.isRTL as boolean) = false;
  });

  describe('getItemStyles', () => {
    it('should generate correct styles for basic grid item', () => {
      const styles = getItemStyles(6, 12, 16, 8, 'row');
      
      expect(styles).toEqual({
        flexBasis: '50%', // 6/12 * 100%
        maxWidth: '50%',
        paddingHorizontal: 8, // columnSpacing/2
        paddingVertical: 0,
      });
    });

    it('should handle column direction', () => {
      const styles = getItemStyles(4, 12, 16, 8, 'column');
      
      expect(styles).toEqual({
        flexBasis: '33.333333333333336%', // 4/12 * 100%
        maxWidth: '33.333333333333336%',
        paddingHorizontal: 0,
        paddingVertical: 4, // rowSpacing/2
      });
    });

    it('should handle full width item', () => {
      const styles = getItemStyles(12, 12, 16, 8, 'row');
      
      expect(styles).toEqual({
        flexBasis: '100%',
        maxWidth: '100%',
        paddingHorizontal: 8,
        paddingVertical: 0,
      });
    });

    it('should handle RTL layout', () => {
      (I18nManager.isRTL as boolean) = true;
      
      const styles = getItemStyles(6, 12, 16, 8, 'row');
      
      expect(styles).toEqual({
        flexBasis: '50%',
        maxWidth: '50%',
        paddingHorizontal: 8,
        paddingVertical: 0,
        paddingLeft: 8,
        paddingRight: 8,
      });
    });

    it('should not apply RTL padding for column direction', () => {
      (I18nManager.isRTL as boolean) = true;
      
      const styles = getItemStyles(6, 12, 16, 8, 'column');
      
      expect(styles).toEqual({
        flexBasis: '50%',
        maxWidth: '50%',
        paddingHorizontal: 0,
        paddingVertical: 4,
      });
    });

    it('should handle different column counts', () => {
      const styles = getItemStyles(2, 8, 16, 8, 'row');
      
      expect(styles).toEqual({
        flexBasis: '25%', // 2/8 * 100%
        maxWidth: '25%',
        paddingHorizontal: 8,
        paddingVertical: 0,
      });
    });

    it('should handle zero spacing', () => {
      const styles = getItemStyles(6, 12, 0, 0, 'row');
      
      expect(styles).toEqual({
        flexBasis: '50%',
        maxWidth: '50%',
        paddingHorizontal: 0,
        paddingVertical: 0,
      });
    });
  });

  describe('caching', () => {
    it('should cache styles for repeated calls', () => {
      const styles1 = getItemStyles(6, 12, 16, 8, 'row');
      const styles2 = getItemStyles(6, 12, 16, 8, 'row');
      
      // Should return the same object reference
      expect(styles1).toBe(styles2);
    });

    it('should return different styles for different parameters', () => {
      const styles1 = getItemStyles(6, 12, 16, 8, 'row');
      const styles2 = getItemStyles(4, 12, 16, 8, 'row');
      
      expect(styles1).not.toBe(styles2);
      expect(styles1.flexBasis).not.toBe(styles2.flexBasis);
    });

    it('should track cache size correctly', () => {
      expect(getStyleCacheSize()).toBe(0);
      
      getItemStyles(6, 12, 16, 8, 'row');
      expect(getStyleCacheSize()).toBe(1);
      
      getItemStyles(4, 12, 16, 8, 'row');
      expect(getStyleCacheSize()).toBe(2);
      
      // Same parameters should not increase cache size
      getItemStyles(6, 12, 16, 8, 'row');
      expect(getStyleCacheSize()).toBe(2);
    });

    it('should clear cache correctly', () => {
      getItemStyles(6, 12, 16, 8, 'row');
      getItemStyles(4, 12, 16, 8, 'row');
      
      expect(getStyleCacheSize()).toBe(2);
      
      clearStyleCache();
      
      expect(getStyleCacheSize()).toBe(0);
    });

    it('should create separate cache entries for RTL and LTR', () => {
      const ltrStyles = getItemStyles(6, 12, 16, 8, 'row');
      
      (I18nManager.isRTL as boolean) = true;
      const rtlStyles = getItemStyles(6, 12, 16, 8, 'row');
      
      expect(ltrStyles).not.toBe(rtlStyles);
      expect(getStyleCacheSize()).toBe(2);
    });
  });
});
