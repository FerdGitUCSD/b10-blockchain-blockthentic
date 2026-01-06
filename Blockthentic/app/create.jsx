// app/create.jsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

export default function CreateScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.text}>Create Verification Contract</Text>
      <Text style={styles.subtext}>Form functionality coming soon...</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Takes up the whole screen
    justifyContent: 'center', // Centers vertically
    alignItems: 'center', // Centers horizontally
    backgroundColor: '#fff',
  },
  text: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#003262', // UC Blue
  },
  subtext: {
    fontSize: 16,
    color: 'gray',
    marginTop: 10,
  }
});