import React from 'react';
import { View, Text, StyleSheet, ScrollView } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { BreakpointProvider, Grid } from '@tkirk1/react-native-grid2';

export type DemoScreen = 'cards' | 'dashboard' | 'table';

const SimpleDemo = () => (
  <ScrollView style={styles.container}>
    <Text style={styles.title}>React Native Grid2 - Expo SDK 53</Text>
    <Text style={styles.subtitle}>Responsive Grid System Demo</Text>
    
    <Grid container spacing={16} style={styles.section}>
      <Grid size={12}>
        <View style={[styles.card, { backgroundColor: '#4F46E5' }]}>
          <Text style={styles.cardText}>Full Width Card</Text>
        </View>
      </Grid>
      
      <Grid size={{ xs: 12, md: 6 }}>
        <View style={[styles.card, { backgroundColor: '#059669' }]}>
          <Text style={styles.cardText}>Responsive Card 1</Text>
        </View>
      </Grid>
      
      <Grid size={{ xs: 12, md: 6 }}>
        <View style={[styles.card, { backgroundColor: '#DC2626' }]}>
          <Text style={styles.cardText}>Responsive Card 2</Text>
        </View>
      </Grid>
      
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <View style={[styles.card, { backgroundColor: '#7C3AED' }]}>
          <Text style={styles.cardText}>Card A</Text>
        </View>
      </Grid>
      
      <Grid size={{ xs: 12, sm: 6, md: 4 }}>
        <View style={[styles.card, { backgroundColor: '#EA580C' }]}>
          <Text style={styles.cardText}>Card B</Text>
        </View>
      </Grid>
      
      <Grid size={{ xs: 12, sm: 12, md: 4 }}>
        <View style={[styles.card, { backgroundColor: '#0891B2' }]}>
          <Text style={styles.cardText}>Card C</Text>
        </View>
      </Grid>
    </Grid>
    
    <View style={styles.info}>
      <Text style={styles.infoText}>Package: react-native-grid2</Text>
      <Text style={styles.infoText}>Compatible with Expo SDK 53</Text>
      <Text style={styles.infoText}>MUI Grid v2 API</Text>
    </View>
  </ScrollView>
);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#ffffff',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
    marginBottom: 8,
    color: '#1F2937',
  },
  subtitle: {
    fontSize: 16,
    textAlign: 'center',
    marginBottom: 20,
    color: '#6B7280',
  },
  section: {
    paddingHorizontal: 16,
  },
  card: {
    padding: 20,
    borderRadius: 8,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cardText: {
    color: 'white',
    fontWeight: '600',
    textAlign: 'center',
  },
  info: {
    padding: 20,
    alignItems: 'center',
  },
  infoText: {
    fontSize: 14,
    color: '#6B7280',
    marginBottom: 4,
  },
});

export default function App() {
  return (
    <BreakpointProvider>
      <StatusBar style="auto" />
      <SimpleDemo />
    </BreakpointProvider>
  );
}
