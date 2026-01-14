// app/index.jsx
import React, { useState, useRef } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  Modal, 
  Animated, 
  LayoutAnimation, 
  Platform, 
  UIManager,
  ScrollView,
  SafeAreaView
} from 'react-native';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { BlurView } from 'expo-blur';
import { Ionicons } from '@expo/vector-icons';
import { useAppKit } from '@reown/appkit-react-native';
import { useAccount } from 'wagmi';

// Enable LayoutAnimation for Android
if (Platform.OS === 'android' && UIManager.setLayoutAnimationEnabledExperimental) {
  UIManager.setLayoutAnimationEnabledExperimental(true);
}

// --- COMPONENT: Accordion Dropdown ---
const AccordionItem = ({ title, content }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpand = () => {
    LayoutAnimation.configureNext({
      duration: 200,
      create: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
      update: { type: LayoutAnimation.Types.easeInEaseOut },
      delete: { type: LayoutAnimation.Types.easeInEaseOut, property: LayoutAnimation.Properties.opacity },
    });
    
    setExpanded(!expanded);
  };

  return (
    <View style={styles.accordionContainer}>
      <TouchableOpacity 
        style={styles.accordionHeader} 
        onPress={toggleExpand} 
        activeOpacity={0.7}
      >
        <Text style={styles.accordionTitle}>{title}</Text>
        <Ionicons 
          name={expanded ? "chevron-up" : "chevron-forward"} 
          size={28} 
          color="#003262"
          style={{ fontWeight: 'bold' }} 
        />
      </TouchableOpacity>
      {expanded && (
        <View style={styles.accordionContent}>
          <Text style={styles.accordionText}>{content}</Text>
        </View>
      )}
      {/* Divider Line */}
      <View style={styles.divider} />
    </View>
  );
};

export default function Home() {
  const router = useRouter();
  const [modalVisible, setModalVisible] = useState(false);
  const { open } = useAppKit();
  const { address, isConnected } = useAccount();
  
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const mainContentOpacity = fadeAnim.interpolate({
    inputRange: [0, 1],
    outputRange: [1, 0],
  });

  const openLearnMore = () => {
    setModalVisible(true);
    Animated.timing(fadeAnim, {
      toValue: 1,
      duration: 200,
      useNativeDriver: true,
    }).start();
  };

  const closeLearnMore = () => {
    Animated.timing(fadeAnim, {
      toValue: 0,
      duration: 150,
      useNativeDriver: true,
    }).start(() => setModalVisible(false));
  };

  return (
    <View style={styles.container}>
      
      {/* 1. Main Background Gradient */}
      <LinearGradient
        colors={['#bdc8feff', '#fef4d3ff']}
        style={styles.background}
      />

      {/* 2. Main Landing Content */}
      <Animated.View 
        style={[styles.mainContent, { opacity: mainContentOpacity }]}
      >
        <View style={styles.headerSection}>
          <Text style={styles.welcomeText}>Welcome to</Text>
          <Text style={styles.brandText}>Blockthentic</Text>
        </View>

        {/* Wallet Status Display */}
        {isConnected && (
          <View style={styles.walletStatus}>
            <Text style={styles.connectedText}>
              Connected: {address?.slice(0, 6)}...{address?.slice(-4)}
            </Text>
          </View>
        )}

        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.primaryButton} onPress={openLearnMore}>
            <Text style={styles.primaryButtonText}>Learn More</Text>
          </TouchableOpacity>

          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => open()} 
          >
            <Text style={styles.secondaryButtonText}>
              {isConnected ? 'Wallet Settings' : 'Connect Wallet'}
            </Text>
          </TouchableOpacity>

          {isConnected && (
            <TouchableOpacity 
              style={styles.secondaryButton}
              onPress={() => router.push('/create')} 
            >
              <Text style={styles.secondaryButtonText}>Create Contract</Text>
            </TouchableOpacity>
          )}
        </View>
      </Animated.View>

      {/* 3. Learn More Overlay (Modal) */}
      <Modal
        animationType="none"
        transparent={true}
        visible={modalVisible}
        onRequestClose={closeLearnMore}
      >
        <Animated.View 
          style={[styles.absoluteFill, { opacity: fadeAnim }]}
        >
          <BlurView intensity={20} tint="light" style={styles.absoluteFill}>
            
            <View style={styles.modalContainer}>
              
              {/* Modal Content Background (Gradient) */}
              <LinearGradient
                colors={['#bdc8feff', '#fef4d3ff']}
                style={styles.modalContent}
              >
                <SafeAreaView style={{flex: 1}}>
                    <ScrollView 
                      contentContainerStyle={styles.scrollContent}
                      showsVerticalScrollIndicator={false}
                    >
                      <AccordionItem 
                        title="How does this work?" 
                        content="Create a verification contract for your document. Share the contract with recipients or merge with your own platform. Verify the document's authenticity on the blockchain instantly." 
                      />
                      <AccordionItem 
                        title="How is this secure?" 
                        content="Blockthentic leverages the immutability and transparency of blockchain technology to ensure that once a document is verified, it cannot be altered or tampered with." 
                      />
                      <AccordionItem 
                        title="Is this free?" 
                        content="Yes, getting started is free! We offer premium tiers for enterprise-level volume verification. (More details coming soon)" 
                      />
                    </ScrollView>


                  {/* Bottom Back Button */}
                  <TouchableOpacity onPress={closeLearnMore} style={styles.bottomBackButton}>
                    <Text style={styles.bottomBackText}>Back</Text>
                  </TouchableOpacity>

                </SafeAreaView>
              </LinearGradient>
            </View>
          </BlurView>
        </Animated.View>
      </Modal>

    </View>
  );
}

const styles = StyleSheet.create({
  // --- Main Screen Styles ---
  container: {
    flex: 1,
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    height: '100%',
  },
  mainContent: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  headerSection: {
    marginBottom: 40,
    alignItems: 'center',
  },
  welcomeText: {
    fontSize: 28,
    color: '#003262',
    fontWeight: '400',
    marginBottom: 5,
  },
  brandText: {
    fontSize: 42,
    color: '#003262',
    fontWeight: '900',
    letterSpacing: -1,
  },
  walletStatus: {
    marginBottom: 30,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'rgba(107, 136, 200, 0.2)',
    borderRadius: 20,
  },
  connectedText: {
    color: '#003262',
    fontSize: 14,
    fontWeight: '600',
  },
  buttonContainer: {
    width: '100%',
    alignItems: 'center',
    gap: 15,
  },
  primaryButton: {
    backgroundColor: '#6b88c8',
    paddingVertical: 16,
    width: '60%',
    borderRadius: 50,
    alignItems: 'center',
    shadowColor: '#6b88c8',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
    elevation: 6,
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
  },
  secondaryButton: {
    backgroundColor: '#6b88c8',
    paddingVertical: 16,
    width: '60%',
    borderRadius: 50,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
    elevation: 4,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '400',
  },

  // --- Modal / Overlay Styles ---
  absoluteFill: {
    position: 'absolute',
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContainer: {
    width: '100%',
    height: '100%',
  },
  modalContent: {
    flex: 1,
  },
  scrollContent: {
    paddingHorizontal: 25,
    flexGrow: 1, 
    justifyContent: 'center',
    fontWeight: '500',
  },
  
  // --- Accordion Styles ---
  accordionContainer: {
    marginBottom: 15,
    marginLeft: 10,
    marginRight: 10,
  },
  accordionHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 15,
  },
  accordionTitle: {
    fontSize: 24,
    color: '#003262',
    fontWeight: '400',
  },
  accordionContent: {
    paddingVertical: 10,
  },
  accordionText: {
    fontSize: 16,
    color: '#34495E',
    lineHeight: 24,
  },
  divider: {
    height: 2, 
    backgroundColor: '#003262',
    marginTop: 5,
  },
  
  // --- Bottom Back Button ---
  bottomBackButton: {
    alignSelf: 'center',
    marginBottom: 50,
    padding: 20, 
  },
  bottomBackText: {
    fontSize: 18,
    color: '#003262',
    fontWeight: '500',
  }
});