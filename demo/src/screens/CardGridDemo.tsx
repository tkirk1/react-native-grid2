import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Grid } from '@tkirk1/react-native-grid2';
import { styles } from '../styles/styles';

interface CardProps {
  title: string;
  subtitle: string;
  color: string;
}

const Card: React.FC<CardProps> = ({ title, subtitle, color }) => (
  <View style={[styles.card, { backgroundColor: color }]}>
    <Text style={styles.cardTitle}>{title}</Text>
    <Text style={styles.cardSubtitle}>{subtitle}</Text>
  </View>
);

const cardData = [
  { title: 'Product A', subtitle: 'In Stock', color: '#E3F2FD' },
  { title: 'Product B', subtitle: 'Low Stock', color: '#FFF3E0' },
  { title: 'Product C', subtitle: 'Out of Stock', color: '#FFEBEE' },
  { title: 'Product D', subtitle: 'In Stock', color: '#E8F5E8' },
  { title: 'Product E', subtitle: 'In Stock', color: '#F3E5F5' },
  { title: 'Product F', subtitle: 'Pre-order', color: '#E0F2F1' },
  { title: 'Product G', subtitle: 'In Stock', color: '#FFF8E1' },
  { title: 'Product H', subtitle: 'Discontinued', color: '#EFEBE9' },
  { title: 'Product I', subtitle: 'In Stock', color: '#E1F5FE' },
  { title: 'Product J', subtitle: 'Coming Soon', color: '#FCE4EC' },
  { title: 'Product K', subtitle: 'In Stock', color: '#F1F8E9' },
  { title: 'Product L', subtitle: 'Limited Edition', color: '#E8EAF6' },
];

export const CardGridDemo: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Responsive Card Grid</Text>
        <Text style={styles.description}>
          Cards automatically adjust their layout based on screen size. Try rotating your device!
        </Text>
      </View>

      <Grid container spacing={{ xs: 8, sm: 12, md: 16 }}>
        {cardData.map((card, index) => (
          <Grid
            key={index}
            size={{ xs: 12, sm: 6, md: 4, lg: 3, xl: 2 }}
          >
            <Card {...card} />
          </Grid>
        ))}
      </Grid>

      {/* Featured section with different layout */}
      <View style={styles.sectionHeader}>
        <Text style={styles.sectionTitle}>Featured Products</Text>
      </View>

      <Grid container spacing={16}>
        <Grid size={{ xs: 12, md: 8 }}>
          <View style={[styles.featuredCard, { backgroundColor: '#E3F2FD' }]}>
            <Text style={styles.featuredTitle}>Hero Product</Text>
            <Text style={styles.featuredDescription}>
              This is our flagship product with amazing features and great customer reviews.
            </Text>
          </View>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <Grid container spacing={8}>
            <Grid size={{ xs: 6, md: 12 }}>
              <View style={[styles.smallCard, { backgroundColor: '#FFF3E0' }]}>
                <Text style={styles.smallCardTitle}>Quick Link</Text>
              </View>
            </Grid>
            <Grid size={{ xs: 6, md: 12 }}>
              <View style={[styles.smallCard, { backgroundColor: '#E8F5E8' }]}>
                <Text style={styles.smallCardTitle}>Another Link</Text>
              </View>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </ScrollView>
  );
};
