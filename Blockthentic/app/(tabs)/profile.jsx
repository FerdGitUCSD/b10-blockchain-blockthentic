import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, SafeAreaView, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useAppKit } from '@reown/appkit-react-native';
import { useAccount, useDisconnect } from 'wagmi'; // Added useDisconnect
import { Ionicons } from '@expo/vector-icons';

export default function ProfilePage() {
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  const { disconnect } = useDisconnect(); // Hook to disconnect wallet

  // --- DYNAMIC DATA PLACEHOLDERS ---
  // Connect these to your backend/state later
  const userData = {
    name: "John Doe",
    email: "johndoe@gmail.com",
    memberSince: "January 2026",
    plan: "Free",
    contractsCreated: 2,
  };

  return (
    <View style={styles.container}>
      {/* Background Gradient */}
      <LinearGradient
        colors={['#bdc8feff', '#fef4d3ff']}
        style={styles.background}
      />

      <SafeAreaView style={styles.safeArea}>
        <ScrollView contentContainerStyle={styles.contentContainer}>
          
          {/* 1. Header & User Info */}
          <Text style={styles.headerTitle}>Profile</Text>
          
          <View style={styles.userInfoSection}>
            <Text style={styles.userName}>{userData.name}</Text>
            <Text style={styles.userEmail}>{userData.email}</Text>
          </View>

          {/* 2. Wallet Card */}
          <View style={styles.walletCard}>
            <View>
              <Text style={styles.walletTitle}>
                {isConnected ? "Wallet Connected" : "Wallet Not Connected"}
              </Text>
              
              <Text style={styles.walletAddress}>
                {isConnected 
                  ? address // Show full address or truncate if preferred
                  : "Connect your wallet to manage contracts"
                }
              </Text>
            </View>

            <TouchableOpacity 
              onPress={() => isConnected ? disconnect() : open()}
            >
              <Text style={styles.walletActionText}>
                {isConnected ? "Disconnect Wallet" : "Connect Wallet"}
              </Text>
            </TouchableOpacity>
          </View>

          {/* 3. Stats Section */}
          <View style={styles.statsContainer}>
            
            {/* Stat Row 1 */}
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Member Since</Text>
              <Text style={styles.statValue}>{userData.memberSince}</Text>
            </View>
            <View style={styles.divider} />

            {/* Stat Row 2 */}
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Plan</Text>
              <Text style={styles.statValue}>{userData.plan}</Text>
            </View>
            <View style={styles.divider} />

            {/* Stat Row 3 */}
            <View style={styles.statRow}>
              <Text style={styles.statLabel}>Contracts Created</Text>
              <Text style={styles.statValue}>{userData.contractsCreated}</Text>
            </View>
            <View style={styles.divider} />

          </View>

        </ScrollView>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { position: 'absolute', left: 0, right: 0, top: 0, height: '100%' },
  safeArea: { flex: 1 },
  
  contentContainer: {
    paddingHorizontal: 25,
    paddingTop: 20,
    alignItems: 'center',
  },

  // Header & User Info
  headerTitle: {
    fontSize: 36, color: '#003262', fontWeight: '400', paddingBottom: 30, 
  },
  userInfoSection: {
    width: '100%',
    alignItems: 'flex-start', // Left align text as per image
    marginBottom: 20,
  },
  userName: {
    fontSize: 28,
    fontWeight: '800',
    color: '#003262',
    marginBottom: 4,
  },
  userEmail: {
    fontSize: 16,
    color: '#555',
    marginBottom: 20,
  },

  // Wallet Card Styles
  walletCard: {
    width: '100%',
    backgroundColor: '#6b7db3', // Dark periwinkle color from image
    borderRadius: 20,
    padding: 20,
    height: 120, // Fixed height to look like a credit card
    justifyContent: 'space-between',
    marginBottom: 40,
    // Shadows
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 5,
  },
  walletTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: 'rgba(0, 50, 98, 0.8)', // Dark blue with opacity
    marginBottom: 5,
  },
  walletAddress: {
    fontSize: 12,
    color: 'rgba(0, 50, 98, 0.6)', 
    fontFamily: 'Courier', // Monospace for address looks techy
  },
  walletActionText: {
    fontSize: 14,
    color: '#003262',
    fontWeight: '600',
    textDecorationLine: 'underline', // Makes it look like a clickable link
  },

  // Stats Section Styles
  statsContainer: {
    width: '100%',
  },
  statRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  statLabel: {
    fontSize: 16,
    color: '#333',
    fontWeight: '400',
  },
  statValue: {
    fontSize: 16,
    color: '#003262',
    fontWeight: 'bold',
  },
  divider: {
    height: 1,
    backgroundColor: '#003262', // Dark blue divider
    opacity: 0.3,
    width: '100%',
  },
});