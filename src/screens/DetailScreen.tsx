import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';

const DetailScreen = ({route, navigation}: any) => {
  const {item} = route.params || {item: {title: 'No Data'}};

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Detail Screen</Text>
      <View style={styles.card}>
        <Text style={styles.label}>Item Title:</Text>
        <Text style={styles.value}>{item.title}</Text>
      </View>
      <TouchableOpacity
        style={styles.backButton}
        onPress={() => navigation.goBack()}>
        <Text style={styles.buttonText}>Go Back</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  card: {
    width: '100%',
    padding: 20,
    backgroundColor: '#f0f0f0',
    borderRadius: 10,
    marginBottom: 20,
  },
  label: {
    fontSize: 16,
    color: '#666',
  },
  value: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  backButton: {
    backgroundColor: '#FF5722',
    padding: 15,
    borderRadius: 8,
    width: '100%',
    alignItems: 'center',
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
});

export default DetailScreen;
