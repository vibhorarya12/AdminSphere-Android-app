import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const Table = () => {
    const tableData = [
        { column1: 'A1', column2: 'B1', column3: 'C1' },
        { column1: 'A2', column2: 'B2', column3: 'C2' },
        // Add more rows as needed
      ];
    
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.headerText}>Column 1</Text>
        <Text style={styles.headerText}>Column 2</Text>
        <Text style={styles.headerText}>Column 3</Text>
      </View>
      {tableData.map((row, index) => (
        <View key={index} style={styles.row}>
          <Text style={styles.cell}>{row.column1}</Text>
          <Text style={styles.cell}>{row.column2}</Text>
          <Text style={styles.cell}>{row.column3}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  headerText: {
    fontWeight: 'bold',
    flex: 1,
    textAlign: 'center',
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 8,
  },
  cell: {
    flex: 1,
    textAlign: 'center',
  },
});

export default Table;
