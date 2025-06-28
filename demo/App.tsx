import React, { useState } from 'react';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { StatusBar } from 'expo-status-bar';
import { BreakpointProvider } from './src/components/Grid';
import { Navigation } from './src/components/Navigation';
import { CardGridDemo } from './src/screens/CardGridDemo';
import { DashboardDemo } from './src/screens/DashboardDemo';
import { TabularDataDemo } from './src/screens/TabularDataDemo';

export type DemoScreen = 'cards' | 'dashboard' | 'table';

export default function App() {
  const [currentScreen, setCurrentScreen] = useState<DemoScreen>('cards');

  const renderScreen = () => {
    switch (currentScreen) {
      case 'cards':
        return <CardGridDemo />;
      case 'dashboard':
        return <DashboardDemo />;
      case 'table':
        return <TabularDataDemo />;
      default:
        return <CardGridDemo />;
    }
  };

  return (
    <SafeAreaProvider>
      <BreakpointProvider>
        <SafeAreaView style={{ flex: 1, backgroundColor: '#f8fafc' }}>
          <StatusBar style="auto" />
          <Navigation currentScreen={currentScreen} onScreenChange={setCurrentScreen} />
          {renderScreen()}
        </SafeAreaView>
      </BreakpointProvider>
    </SafeAreaProvider>
  );
}
