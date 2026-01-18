import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const ACTIVE_CONTRACTS = [
  { id: '1', title: 'Senescent Cell Trial 2', date: 'January 14th, 2026', type: 'Dataset' },
  { id: '2', title: 'Senescent Cell Trial 1', date: 'January 7th, 2026', type: 'Dataset' },
];

const ContractCard = ({ item }) => (
  <View style={styles.card}>
    <View style={styles.cardContent}>
      <Text style={styles.cardTitle}>{item.title}</Text>
      <Text style={styles.cardDate}>Created: {item.date}</Text>
      <Text style={styles.cardType}>{item.type}</Text>
    </View>
    <TouchableOpacity>
      <Ionicons name="arrow-forward-circle-outline" size={32} color="#003262" />
    </TouchableOpacity>
  </View>
);

export default function HomePage() {
  const router = useRouter();
  const userName = "John Doe"; 

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#bdc8feff', '#fef4d3ff']} 
        style={styles.background}
      />

      <SafeAreaView style={styles.safeArea}>
        {/* Added a wrapper View for consistent horizontal margins */}
        <View style={styles.contentWrapper}>
            
            <View style={styles.header}>
                <Text style={styles.greetingText}>Hi, {userName}</Text>
            </View>

            <View style={styles.sectionHeader}>
                <Text style={styles.sectionTitle}>Active Contracts</Text>
                <TouchableOpacity>
                    <Text style={styles.viewAllText}>View All</Text>
                </TouchableOpacity>
            </View>

            <ScrollView 
                contentContainerStyle={styles.scrollContent} 
                showsVerticalScrollIndicator={false}
            >
              {ACTIVE_CONTRACTS.map((contract) => (
                <ContractCard key={contract.id} item={contract} />
              ))}

              <TouchableOpacity 
                style={styles.addContractRow}
                onPress={() => router.push('/create')}
              >
                 <Text style={styles.addContractText}>+ Add Contract</Text>
              </TouchableOpacity>
            </ScrollView>

        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { position: 'absolute', left: 0, right: 0, top: 0, height: '100%' },
  
  safeArea: { 
    flex: 1, 
    paddingTop: 60, 
  },
  
  contentWrapper: {
    flex: 1,
    paddingHorizontal: 25, 
    paddingTop: 20,
  },

  header: { alignItems: 'center', marginBottom: 40 },
  greetingText: { fontSize: 36, color: '#003262', fontWeight: '400' },

  sectionHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'flex-end', marginBottom: 15 },
  sectionTitle: { fontSize: 20, fontWeight: '800', color: '#003262' },
  viewAllText: { fontSize: 14, color: '#003262', fontWeight: '500' },

  scrollContent: { paddingBottom: 120 }, 
  card: {
    backgroundColor: '#7d8ec4', 
    borderRadius: 25,
    padding: 20,
    marginBottom: 15,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#003262',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  cardContent: { flex: 1 },
  cardTitle: { fontSize: 18, fontWeight: '700', color: '#003262', marginBottom: 4 },
  cardDate: { fontSize: 12, color: '#333', marginBottom: 2 },
  cardType: { fontSize: 12, color: '#555' },

  addContractRow: { alignItems: 'flex-end', marginTop: 5 },
  addContractText: { color: '#003262', fontSize: 16, fontWeight: '500' },
});