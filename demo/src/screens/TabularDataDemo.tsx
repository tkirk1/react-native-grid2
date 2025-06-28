import React from 'react';
import { ScrollView, View, Text } from 'react-native';
import { Grid } from '@tkirk1/react-native-grid2';
import { styles } from '../styles/styles';

interface DataRowProps {
  name: string;
  email: string;
  role: string;
  status: string;
  lastSeen: string;
}

const DataRow: React.FC<DataRowProps & { index: number }> = ({ 
  name, 
  email, 
  role, 
  status, 
  lastSeen, 
  index 
}) => (
  <Grid 
    container 
    style={[
      styles.dataRow, 
      index % 2 === 0 ? styles.evenRow : styles.oddRow
    ]}
  >
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
      <View style={styles.dataCell}>
        <Text style={styles.dataCellLabel}>Name</Text>
        <Text style={styles.dataCellValue}>{name}</Text>
      </View>
    </Grid>
    <Grid size={{ xs: 12, sm: 6, md: 3 }}>
      <View style={styles.dataCell}>
        <Text style={styles.dataCellLabel}>Email</Text>
        <Text style={styles.dataCellValue}>{email}</Text>
      </View>
    </Grid>
    <Grid size={{ xs: 6, sm: 4, md: 2 }}>
      <View style={styles.dataCell}>
        <Text style={styles.dataCellLabel}>Role</Text>
        <Text style={styles.dataCellValue}>{role}</Text>
      </View>
    </Grid>
    <Grid size={{ xs: 6, sm: 4, md: 2 }}>
      <View style={styles.dataCell}>
        <Text style={styles.dataCellLabel}>Status</Text>
        <View style={[
          styles.statusBadge,
          status === 'Active' ? styles.activeBadge : styles.inactiveBadge
        ]}>
          <Text style={[
            styles.statusText,
            status === 'Active' ? styles.activeText : styles.inactiveText
          ]}>
            {status}
          </Text>
        </View>
      </View>
    </Grid>
    <Grid size={{ xs: 12, sm: 4, md: 2 }}>
      <View style={styles.dataCell}>
        <Text style={styles.dataCellLabel}>Last Seen</Text>
        <Text style={styles.dataCellValue}>{lastSeen}</Text>
      </View>
    </Grid>
  </Grid>
);

const userData = [
  {
    name: 'John Doe',
    email: 'john.doe@example.com',
    role: 'Admin',
    status: 'Active',
    lastSeen: '2 hours ago'
  },
  {
    name: 'Jane Smith',
    email: 'jane.smith@example.com',
    role: 'Editor',
    status: 'Active',
    lastSeen: '1 day ago'
  },
  {
    name: 'Bob Johnson',
    email: 'bob.johnson@example.com',
    role: 'Viewer',
    status: 'Inactive',
    lastSeen: '1 week ago'
  },
  {
    name: 'Alice Brown',
    email: 'alice.brown@example.com',
    role: 'Editor',
    status: 'Active',
    lastSeen: '5 minutes ago'
  },
  {
    name: 'Charlie Wilson',
    email: 'charlie.wilson@example.com',
    role: 'Admin',
    status: 'Active',
    lastSeen: '3 hours ago'
  },
  {
    name: 'Diana Davis',
    email: 'diana.davis@example.com',
    role: 'Viewer',
    status: 'Inactive',
    lastSeen: '2 weeks ago'
  },
  {
    name: 'Edward Miller',
    email: 'edward.miller@example.com',
    role: 'Editor',
    status: 'Active',
    lastSeen: '1 hour ago'
  },
  {
    name: 'Fiona Garcia',
    email: 'fiona.garcia@example.com',
    role: 'Viewer',
    status: 'Active',
    lastSeen: '30 minutes ago'
  },
];

export const TabularDataDemo: React.FC = () => {
  return (
    <ScrollView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>Responsive Data Table</Text>
        <Text style={styles.description}>
          Tabular data that stacks on smaller screens and spreads out on larger screens.
        </Text>
      </View>

      {/* Table Header - Only visible on larger screens */}
      <View style={styles.tableHeader}>
        <Grid container>
          <Grid size={{ xs: 0, md: 3 }}>
            <Text style={styles.tableHeaderText}>Name</Text>
          </Grid>
          <Grid size={{ xs: 0, md: 3 }}>
            <Text style={styles.tableHeaderText}>Email</Text>
          </Grid>
          <Grid size={{ xs: 0, md: 2 }}>
            <Text style={styles.tableHeaderText}>Role</Text>
          </Grid>
          <Grid size={{ xs: 0, md: 2 }}>
            <Text style={styles.tableHeaderText}>Status</Text>
          </Grid>
          <Grid size={{ xs: 0, md: 2 }}>
            <Text style={styles.tableHeaderText}>Last Seen</Text>
          </Grid>
        </Grid>
      </View>

      {/* Data Rows */}
      <View style={styles.tableBody}>
        {userData.map((user, index) => (
          <DataRow key={index} {...user} index={index} />
        ))}
      </View>

      {/* Summary Section */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Summary</Text>
        <Grid container spacing={16}>
          <Grid size={{ xs: 6, sm: 3 }}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>{userData.length}</Text>
              <Text style={styles.summaryLabel}>Total Users</Text>
            </View>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>
                {userData.filter(user => user.status === 'Active').length}
              </Text>
              <Text style={styles.summaryLabel}>Active</Text>
            </View>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>
                {userData.filter(user => user.role === 'Admin').length}
              </Text>
              <Text style={styles.summaryLabel}>Admins</Text>
            </View>
          </Grid>
          <Grid size={{ xs: 6, sm: 3 }}>
            <View style={styles.summaryCard}>
              <Text style={styles.summaryValue}>
                {userData.filter(user => user.role === 'Editor').length}
              </Text>
              <Text style={styles.summaryLabel}>Editors</Text>
            </View>
          </Grid>
        </Grid>
      </View>
    </ScrollView>
  );
};
