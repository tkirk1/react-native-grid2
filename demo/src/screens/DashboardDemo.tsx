import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Grid } from '../components/Grid';
import { styles } from '../styles/styles';

interface MetricCardProps {
  title: string;
  value: string;
  change: string;
  changeType: 'positive' | 'negative' | 'neutral';
  color: string;
}

const MetricCard: React.FC<MetricCardProps> = ({ title, value, change, changeType, color }) => (
  <View style={[styles.metricCard, { backgroundColor: color }]}>
    <Text style={styles.metricTitle}>{title}</Text>
    <Text style={styles.metricValue}>{value}</Text>
    <Text style={[
      styles.metricChange,
      changeType === 'positive' && styles.positiveChange,
      changeType === 'negative' && styles.negativeChange,
    ]}>
      {change}
    </Text>
  </View>
);

interface ChartCardProps {
  title: string;
  height: number;
  color: string;
}

const ChartCard: React.FC<ChartCardProps> = ({ title, height, color }) => (
  <View style={[styles.chartCard, { backgroundColor: color, height }]}>
    <Text style={styles.chartTitle}>{title}</Text>
    <View style={styles.chartPlaceholder}>
      <Text style={styles.chartPlaceholderText}>Chart Visualization</Text>
    </View>
  </View>
);

const ActivityItem: React.FC<{ title: string; time: string }> = ({ title, time }) => (
  <View style={styles.activityItem}>
    <Text style={styles.activityTitle}>{title}</Text>
    <Text style={styles.activityTime}>{time}</Text>
  </View>
);

export const DashboardDemo: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Analytics Dashboard</Text>
        <Text style={styles.description}>
          A responsive dashboard layout that adapts to different screen sizes.
        </Text>
      </View>

      {/* Key Metrics Section */}
      <Grid container spacing={{ xs: 8, sm: 12, md: 16 }}>
        <Grid size={{ xs: 6, md: 3 }}>
          <MetricCard
            title="Total Sales"
            value="$24,890"
            change="+12.5%"
            changeType="positive"
            color="#E3F2FD"
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <MetricCard
            title="Orders"
            value="1,247"
            change="+8.2%"
            changeType="positive"
            color="#E8F5E8"
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <MetricCard
            title="Customers"
            value="892"
            change="-2.1%"
            changeType="negative"
            color="#FFEBEE"
          />
        </Grid>
        <Grid size={{ xs: 6, md: 3 }}>
          <MetricCard
            title="Conversion"
            value="3.4%"
            change="0.0%"
            changeType="neutral"
            color="#FFF3E0"
          />
        </Grid>
      </Grid>

      {/* Charts Section */}
      <Grid container spacing={16} style={styles.section}>
        <Grid size={{ xs: 12, lg: 8 }}>
          <ChartCard
            title="Revenue Trend"
            height={300}
            color="#F8F9FA"
          />
        </Grid>
        <Grid size={{ xs: 12, lg: 4 }}>
          <ChartCard
            title="Top Categories"
            height={300}
            color="#F8F9FA"
          />
        </Grid>
      </Grid>

      {/* Secondary Charts */}
      <Grid container spacing={16}>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard
            title="User Engagement"
            height={200}
            color="#F8F9FA"
          />
        </Grid>
        <Grid size={{ xs: 12, md: 6 }}>
          <ChartCard
            title="Traffic Sources"
            height={200}
            color="#F8F9FA"
          />
        </Grid>
      </Grid>

      {/* Bottom Section */}
      <Grid container spacing={16} style={styles.section}>
        <Grid size={{ xs: 12, md: 8 }}>
          <View style={styles.tableCard}>
            <Text style={styles.tableTitle}>Recent Orders</Text>
            <View style={styles.tablePlaceholder}>
              <Text style={styles.tablePlaceholderText}>Order data table would go here</Text>
            </View>
          </View>
        </Grid>
        <Grid size={{ xs: 12, md: 4 }}>
          <View style={styles.activityCard}>
            <Text style={styles.activityCardTitle}>Recent Activity</Text>
            <ActivityItem title="New order received" time="2 min ago" />
            <ActivityItem title="Payment processed" time="5 min ago" />
            <ActivityItem title="Customer registered" time="12 min ago" />
            <ActivityItem title="Product updated" time="1 hour ago" />
            <ActivityItem title="Review submitted" time="2 hours ago" />
          </View>
        </Grid>
      </Grid>
    </ScrollView>
  );
};
