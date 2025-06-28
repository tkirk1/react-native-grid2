import React from 'react';
import { View, Text, TouchableOpacity } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';
import { Grid } from './Grid';
import { styles } from '../styles/styles';
import type { DemoScreen } from '../../App';

interface NavigationProps {
  currentScreen: DemoScreen;
  onScreenChange: (screen: DemoScreen) => void;
}

interface NavButtonProps {
  title: string;
  screen: DemoScreen;
  isActive: boolean;
  onPress: () => void;
}

const NavButton: React.FC<NavButtonProps> = ({ title, isActive, onPress }) => (
  <TouchableOpacity
    style={[styles.navButton, isActive && styles.navButtonActive]}
    onPress={onPress}
    activeOpacity={0.7}
  >
    <Text style={[styles.navButtonText, isActive && styles.navButtonTextActive]}>
      {title}
    </Text>
  </TouchableOpacity>
);

export const Navigation: React.FC<NavigationProps> = ({ currentScreen, onScreenChange }) => {
  const navItems = [
    { screen: 'cards' as const, title: 'Cards' },
    { screen: 'dashboard' as const, title: 'Dashboard' },
    { screen: 'table' as const, title: 'Table' },
  ];

  return (
    <SafeAreaView edges={['top']} style={styles.navigation}>
      <View style={styles.navContainer}>
        <Text style={styles.navTitle}>React Native Grid2</Text>
        
        <Grid container spacing={8} style={styles.navButtons}>
          {navItems.map((item) => (
            <Grid key={item.screen} size={4}>
              <NavButton
                title={item.title}
                screen={item.screen}
                isActive={currentScreen === item.screen}
                onPress={() => onScreenChange(item.screen)}
              />
            </Grid>
          ))}
        </Grid>
      </View>
    </SafeAreaView>
  );
};
