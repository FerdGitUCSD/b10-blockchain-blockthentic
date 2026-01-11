import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';
import { useAppKit, useAppKitAccount } from '@reown/appkit-react-native';

// Accordion component for FAQ
function AccordionItem({ title, children }) {
  const [expanded, setExpanded] = useState(false);

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity 
        style={styles.accordionHeader} 
        onPress={() => setExpanded(!expanded)}
        activeOpacity={0.7}
      >
        <Text style={styles.accordionTitle}>{title}</Text>
        <Text style={styles.accordionIcon}>{expanded ? '−' : '+'}</Text>
      </TouchableOpacity>
      
      {expanded && (
        <View style={styles.accordionContent}>
          {children}
        </View>
      )}
    </View>
  );
}

export default function Home() {
  const router = useRouter();
  const { open } = useAppKit();
  const { address, isConnected } = useAppKitAccount();

  return (
    <View style={styles.container}>
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* Logo Section */}
        <Text style={styles.title}>Blockthentic</Text>
        <Text style={styles.subtitle}>Secure Document Verification</Text>
        
        <Text style={styles.description}>
          Blockthentic helps you instantly verify the authenticity of important documents using blockchain technology. Create secure contracts and prevent fraud with ease!
        </Text>

        {/* Wallet Connection Section */}
        {isConnected ? (
          <View style={styles.walletContainer}>
            <Text style={styles.connectedLabel}>Wallet Connected</Text>
            <Text style={styles.addressText}>
              {address?.slice(0, 6)}...{address?.slice(-4)}
            </Text>
            <TouchableOpacity 
              style={styles.button}
              onPress={() => open()}
            >
              <Text style={styles.buttonText}>Wallet Settings</Text>
            </TouchableOpacity>
            
            <TouchableOpacity 
              style={[styles.button, { marginTop: 10 }]}
              onPress={() => router.push('/create')}
            >
              <Text style={styles.buttonText}>Create Contract</Text>
            </TouchableOpacity>
          </View>
        ) : (
          <TouchableOpacity 
            style={styles.button}
            onPress={() => open()}
          >
            <Text style={styles.buttonText}>Connect Wallet</Text>
          </TouchableOpacity>
        )}
        
        {/* FAQ Section */}
        <View style={styles.faqSection}>
          <Text style={styles.faqHeader}>Learn More</Text>

          <AccordionItem title="How It Works">
            <Text style={styles.accordionText}>
              1. <Text style={{fontWeight: 'bold'}}>Connect</Text> your Ethereum wallet (MetaMask, Rainbow, etc.){'\n\n'}
              2. <Text style={{fontWeight: 'bold'}}>Create</Text> a Verification Contract for your document.{'\n\n'}
              3. <Text style={{fontWeight: 'bold'}}>Share</Text> the contract with recipients.{'\n\n'}
              4. <Text style={{fontWeight: 'bold'}}>Verify</Text> the document's authenticity on the blockchain instantly.
            </Text>
          </AccordionItem>

          <AccordionItem title="What Makes It Secure?">
            <Text style={styles.accordionText}>
              Blockthentic leverages the immutability and transparency of blockchain technology to ensure that once a document is verified, it cannot be altered or tampered with.
            </Text>
          </AccordionItem>
          
          <AccordionItem title="Is it free?">
            <Text style={styles.accordionText}>
              Yes, getting started is free! You only pay network gas fees when creating contracts on the blockchain.
            </Text>
          </AccordionItem>
        </View>

      </ScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'flex-start',
    alignItems: 'center',
    padding: 20,
    paddingTop: 80,
    paddingBottom: 50,
  },
  title: {
    fontSize: 32,
    fontWeight: '800',
    color: '#003262',
    marginBottom: 10,
    textAlign: 'center',
  },
  subtitle: {
    fontSize: 20,
    color: '#666',
    marginBottom: 20,
    textAlign: 'center',
  },
  description: {
    fontSize: 16,
    color: '#555',
    textAlign: 'center',
    lineHeight: 24,
    marginBottom: 30,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#003262',
    paddingVertical: 15,
    paddingHorizontal: 30,
    borderRadius: 25,
    width: '100%',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  buttonText: {
    color: '#FDB515',
    fontSize: 18,
    fontWeight: 'bold',
  },
  walletContainer: {
    width: '100%',
    alignItems: 'center',
    marginBottom: 40,
    padding: 20,
    backgroundColor: '#f0f4f8',
    borderRadius: 15,
  },
  connectedLabel: {
    fontSize: 14,
    color: '#28a745',
    fontWeight: '600',
    marginBottom: 5,
  },
  addressText: {
    fontSize: 16,
    color: '#003262',
    fontWeight: 'bold',
    marginBottom: 15,
    fontFamily: 'monospace',
  },
  faqSection: {
    width: '100%',
    marginTop: 40,
  },
  faqHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003262',
    marginBottom: 15,
    alignSelf: 'flex-start',
  },
  accordionContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden',
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f4f8',
  },
  accordionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  accordionIcon: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#003262',
  },
  accordionContent: {
    padding: 15,
    backgroundColor: '#fff',
  },
  accordionText: {
    fontSize: 15,
    color: '#555',
    lineHeight: 22,
  },
});