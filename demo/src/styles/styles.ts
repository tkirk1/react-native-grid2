import { StyleSheet } from 'react-native';

export const styles = StyleSheet.create({
  // Navigation styles
  navigation: {
    backgroundColor: '#FFFFFF',
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
    paddingBottom: 16,
  },
  navContainer: {
    paddingHorizontal: 16,
  },
  navTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 16,
    textAlign: 'center',
  },
  navButtons: {
    marginTop: 8,
  },
  navButton: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 8,
    alignItems: 'center',
  },
  navButtonActive: {
    backgroundColor: '#1976D2',
  },
  navButtonText: {
    fontSize: 14,
    fontWeight: '600',
    color: '#666666',
  },
  navButtonTextActive: {
    color: '#FFFFFF',
  },

  // Common layout styles
  container: {
    flex: 1,
    backgroundColor: '#F8F9FA',
  },
  header: {
    padding: 16,
    backgroundColor: '#FFFFFF',
    marginBottom: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  description: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },
  section: {
    marginTop: 24,
  },
  sectionHeader: {
    paddingHorizontal: 16,
    paddingVertical: 12,
  },
  sectionTitle: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#333333',
  },

  // Card styles
  card: {
    padding: 16,
    borderRadius: 12,
    minHeight: 100,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  cardSubtitle: {
    fontSize: 14,
    color: '#666666',
  },

  // Featured card styles
  featuredCard: {
    padding: 24,
    borderRadius: 16,
    minHeight: 120,
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 8,
    elevation: 6,
  },
  featuredTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 8,
  },
  featuredDescription: {
    fontSize: 16,
    color: '#666666',
    lineHeight: 24,
  },

  // Small card styles
  smallCard: {
    padding: 16,
    borderRadius: 12,
    minHeight: 80,
    justifyContent: 'center',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  smallCardTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333333',
    textAlign: 'center',
  },

  // Dashboard metric styles
  metricCard: {
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  metricTitle: {
    fontSize: 14,
    color: '#666666',
    marginBottom: 8,
    textAlign: 'center',
  },
  metricValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 4,
  },
  metricChange: {
    fontSize: 12,
    fontWeight: '600',
  },
  positiveChange: {
    color: '#4CAF50',
  },
  negativeChange: {
    color: '#F44336',
  },

  // Chart styles
  chartCard: {
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  chartTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  chartPlaceholder: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#E0E0E0',
    borderRadius: 8,
  },
  chartPlaceholderText: {
    fontSize: 16,
    color: '#666666',
  },

  // Table styles
  tableCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  tableTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  tablePlaceholder: {
    height: 200,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F5F5F5',
    borderRadius: 8,
  },
  tablePlaceholderText: {
    fontSize: 16,
    color: '#666666',
  },

  // Activity styles
  activityCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  activityCardTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#333333',
    marginBottom: 16,
  },
  activityItem: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  activityTitle: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 4,
  },
  activityTime: {
    fontSize: 12,
    color: '#666666',
  },

  // Data table styles
  tableHeader: {
    backgroundColor: '#FFFFFF',
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 2,
    borderBottomColor: '#E0E0E0',
    display: 'none', // Hidden on mobile, shown via media queries in larger screens
  },
  tableHeaderText: {
    fontSize: 14,
    fontWeight: 'bold',
    color: '#333333',
  },
  tableBody: {
    backgroundColor: '#FFFFFF',
  },
  dataRow: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#E0E0E0',
  },
  evenRow: {
    backgroundColor: '#FFFFFF',
  },
  oddRow: {
    backgroundColor: '#F8F9FA',
  },
  dataCell: {
    paddingVertical: 4,
  },
  dataCellLabel: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
    marginBottom: 2,
  },
  dataCellValue: {
    fontSize: 14,
    color: '#333333',
  },

  // Status badge styles
  statusBadge: {
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    alignSelf: 'flex-start',
  },
  activeBadge: {
    backgroundColor: '#E8F5E8',
  },
  inactiveBadge: {
    backgroundColor: '#FFEBEE',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '600',
  },
  activeText: {
    color: '#4CAF50',
  },
  inactiveText: {
    color: '#F44336',
  },

  // Summary styles
  summaryCard: {
    backgroundColor: '#FFFFFF',
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  summaryValue: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#1976D2',
    marginBottom: 4,
  },
  summaryLabel: {
    fontSize: 14,
    color: '#666666',
    textAlign: 'center',
  },
});
