// app/index.jsx
import React, { useState } from 'react'; // Added useState for the dropdowns
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
import { useRouter } from 'expo-router';

// --- NEW COMPONENT: AccordionItem ---
// This handles the "Dropdown" logic specifically for this page
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
        {/* Simple +/- indicator for open/close state */}
        <Text style={styles.accordionIcon}>{expanded ? '−' : '+'}</Text>
      </TouchableOpacity>
      
      {/* Only show content if expanded is true */}
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

  return (
    <View style={styles.container}>
      {/* ScrollView */}
      <ScrollView 
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}
      >
        
        {/* --- LOGO SECTION --- */}
        <Text style={styles.title}>Blockthentic</Text>
        <Text style={styles.subtitle}>Secure Document Verification</Text>
        
        <Text style={styles.description}>
          Blockthentic helps you instantly verify the authenticity of important documents using blockchain technology. Create secure contracts and prevent fraud with ease!
        </Text>

        {/* Get Started Button */}
        <TouchableOpacity 
          style={styles.button}
          onPress={() => router.push('/create')}
        >
          <Text style={styles.buttonText}>Get Started</Text>
        </TouchableOpacity>
        
        {/* --- FAQ / DROPDOWN SECTION --- */}
        <View style={styles.faqSection}>
          <Text style={styles.faqHeader}>Learn More</Text>

          {/* Dropdown 1: How It Works */}
          <AccordionItem title="How It Works">
            <Text style={styles.accordionText}>
              1. <Text style={{fontWeight: 'bold'}}>Create</Text> a Verification Contract for your document.{'\n\n'}
              2. <Text style={{fontWeight: 'bold'}}>Share</Text> the contract with recipients or merge with your own platform.{'\n\n'}
              3. <Text style={{fontWeight: 'bold'}}>Verify</Text> the document's authenticity on the blockchain instantly.
            </Text>
          </AccordionItem>

          {/* Dropdown 2: Security Info */}
          <AccordionItem title="What Makes It Secure?">
            <Text style={styles.accordionText}>
              Blockthentic leverages the immutability and transparency of blockchain technology to ensure that once a document is verified, it cannot be altered or tampered with.
            </Text>
          </AccordionItem>
          
           {/* Dropdown 3: Pricing (Example of adding more easily) */}
           <AccordionItem title="Is it free?">
            <Text style={styles.accordionText}>
              Yes, getting started is free! (ADD MORE)
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
    marginBottom: 40, // Added margin to push the FAQ down
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
  
  // STYLES FOR ACCORDION / DROPDOWNS
  faqSection: {
    width: '100%',
    marginTop: 10,
  },
  faqHeader: {
    fontSize: 22,
    fontWeight: 'bold',
    color: '#003262',
    marginBottom: 15,
    alignSelf: 'flex-start', // Aligns header to the left
  },
  accordionContainer: {
    marginBottom: 15,
    borderWidth: 1,
    borderColor: '#eee',
    borderRadius: 10,
    backgroundColor: '#f9f9f9',
    overflow: 'hidden', // Ensures content stays inside rounded corners
  },
  accordionHeader: {
    flexDirection: 'row', // Aligns text and icon horizontally
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 15,
    backgroundColor: '#f0f4f8', // Light blue-ish gray
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