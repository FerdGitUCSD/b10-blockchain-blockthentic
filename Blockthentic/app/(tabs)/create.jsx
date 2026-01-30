import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, TextInput, ScrollView } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import * as DocumentPicker from 'expo-document-picker';
import { useAccount } from 'wagmi';

// --- CONSTANTS & CONFIG ---
const STEPS = {
  SELECT_TYPE: 1,
  DETAILS_UPLOAD: 2,
  REVIEW: 3,
  SUCCESS: 4,
};

// ADDED: Description fields to match the design
const CONTRACT_TYPES = {
  DOCUMENT: { 
    id: 'document', 
    label: 'Document', 
    description: 'Certificates, contracts, legal documents',
    mimeTypes: ['application/pdf', 'application/msword', 'text/plain'] 
  },
  DATASET: { 
    id: 'dataset', 
    label: 'Dataset', 
    description: 'Research data, CSV files, databases',
    mimeTypes: ['text/csv', 'application/json', 'text/xml'] 
  },
  MEDIA: { 
    id: 'media', 
    label: 'Visual Media', 
    description: 'Photos, videos, and other visual media',
    mimeTypes: ['image/*', 'video/*'] 
  },
};

// --- HELPER COMPONENT: Progress Bar ---
const ProgressBar = ({ currentStep }) => {
  if (currentStep === STEPS.SUCCESS) return null;

  const renderStepCircle = (stepNum) => {
    const isCompleted = currentStep > stepNum;
    const isActive = currentStep === stepNum;

    let bgColor = 'transparent';
    let borderColor = '#003262'; // Dark blue outline by default
    let textColor = '#003262';
    let content = stepNum;
    let thickness = 2;

    if (isCompleted) {
      bgColor = 'transparent'; // Keep transparent but show checkmark
      borderColor = '#003262';
      thickness = 3;
      content = <Ionicons name="checkmark" size={18} color="#003262" />;
    } else if (isActive) {
      borderColor = '#003262';
      thickness = 3; // Thicker border for active
      textColor = '#003262';
    } else {
       // Inactive future steps
       borderColor = '#003262';
       textColor = '#003262';
    }

    return (
      <View style={[styles.stepCircle, { backgroundColor: bgColor, borderColor: borderColor, borderWidth: thickness }]}>
        <Text style={[styles.stepText, { color: textColor }]}>{content}</Text>
      </View>
    );
  };

  return (
    <View style={styles.progressContainer}>
      {renderStepCircle(1)}
      <View style={styles.stepLine} />
      {renderStepCircle(2)}
      <View style={styles.stepLine} />
      {renderStepCircle(3)}
    </View>
  );
};

// =================MAIN COMPONENT=================
export default function CreatePage() {
  const router = useRouter();
  const { address, isConnected } = useAccount();

  // Form State
  const [currentStep, setCurrentStep] = useState(STEPS.SELECT_TYPE);
  const [formData, setFormData] = useState({
    type: null,
    name: '',
    description: '',
    file: null,
  });

  // --- ACTIONS ---

  const pickDocument = async () => {
    if (!formData.type) return;
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: CONTRACT_TYPES[formData.type.toUpperCase()].mimeTypes,
        copyToCacheDirectory: true,
      });
      if (result.assets && result.assets.length > 0) {
        setFormData({ ...formData, file: result.assets[0] });
      }
    } catch (err) {
      console.log("Unknown error: ", err);
    }
  };

  const handleNext = () => {
    if (currentStep === STEPS.SELECT_TYPE && !formData.type) {
        alert("Please select a contract type.");
        return;
    }
    if (currentStep === STEPS.DETAILS_UPLOAD) {
        if (!formData.name || !formData.file) {
             alert("Please provide a name and upload a file.");
             return;
        }
    }
    
    if (currentStep === STEPS.REVIEW) {
      setCurrentStep(STEPS.SUCCESS);
    } else {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    setCurrentStep(currentStep - 1);
  };

  const resetForm = () => {
    setFormData({ type: null, name: '', description: '', file: null });
    setCurrentStep(STEPS.SELECT_TYPE);
  };

  // --- RENDER STEPS ---

  const renderStep1Selection = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Select</Text>
      <Text style={styles.stepSubtitle}>Choose what you want to verify</Text>
      
      <View style={styles.selectionContainer}>
        {Object.values(CONTRACT_TYPES).map((item) => {
          const isSelected = formData.type === item.id;
          return (
            <TouchableOpacity
              key={item.id}
              style={[
                styles.selectionBox,
                isSelected ? styles.selectedBox : styles.unselectedBox
              ]}
              onPress={() => setFormData({ ...formData, type: item.id })}
            >
              <View style={styles.textContainer}>
                  {/* Title (Bold, Large) */}
                  <Text style={[styles.boxLabel, isSelected ? styles.selectedText : styles.unselectedText]}>
                    {item.label}
                  </Text>
                  
                  {/* Description (Smaller, Regular) */}
                  <Text style={[styles.boxDescription, isSelected ? styles.selectedText : styles.unselectedText]}>
                    {item.description}
                  </Text>
              </View>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );

  const renderStep2Details = () => (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollInner} showsVerticalScrollIndicator={false}>
       <Text style={styles.stepTitle}>Upload</Text>
       <Text style={styles.stepSubtitle}>The file will be hashed and stored</Text>
       
       {/* Upload Area */}
       <TouchableOpacity style={styles.uploadArea} onPress={pickDocument}>
          {formData.file ? (
             <View style={styles.fileInfo}>
                 <Ionicons name="document" size={40} color="#003262"/>
                 <Text style={styles.fileName} numberOfLines={1}>{formData.file.name}</Text>
                 <Text style={styles.changeFileText}>Tap to change</Text>
             </View>
          ) : (
             <>
               <Ionicons name="cloud-upload-outline" size={50} color="#003262" />
               <Text style={styles.uploadText}>Click to upload</Text>
               <Text style={styles.supportedFormats}>or drag and drop</Text>
             </>
          )}
       </TouchableOpacity>

       {/* Inputs */}
       <Text style={styles.inputLabel}>Title</Text>
       <TextInput 
          style={styles.input} 
          placeholder="Enter a title for this contract" 
          placeholderTextColor="#777"
          value={formData.name}
          onChangeText={(text) => setFormData({...formData, name: text})}
       />

      <Text style={styles.inputLabel}>Description</Text>
       <TextInput 
          style={[styles.input]} 
          placeholder="Add an optional description" 
          placeholderTextColor="#777"
          value={formData.description}
          onChangeText={(text) => setFormData({...formData, description: text})}
       />
    </ScrollView>
  );

  const renderStep3Review = () => (
    <View style={styles.stepContent}>
       <Text style={styles.stepTitle}>Review</Text>
       <Text style={styles.stepSubtitle}>Review the details before submission</Text>
       
       <View style={styles.reviewList}>
          
          {/* Row 1 */}
          <View style={styles.reviewRow}>
             <Text style={styles.reviewLabel}>Type</Text>
             <Text style={styles.reviewValue}>{CONTRACT_TYPES[formData.type?.toUpperCase()]?.label}</Text>
          </View>
          <View style={styles.divider} />
          
          {/* Row 2 */}
          <View style={styles.reviewRow}>
             <Text style={styles.reviewLabel}>File</Text>
             <Text style={styles.reviewValue} numberOfLines={1}>{formData.file?.name}</Text>
          </View>
           <View style={styles.divider} />
          
          {/* Row 3 */}
          <View style={styles.reviewRow}>
             <Text style={styles.reviewLabel}>Title</Text>
             <Text style={styles.reviewValue}>{formData.name}</Text>
          </View>
           <View style={styles.divider} />
           
           {/* Row 4 */}
          <View style={styles.reviewRow}>
             <Text style={styles.reviewLabel}>Size</Text>
             <Text style={styles.reviewValue}>2.4 MB</Text> 
             {/* Placeholder size for now */}
          </View>
           <View style={styles.divider} />
           
           {/* Row 5 */}
          <View style={styles.reviewRow}>
             <Text style={styles.reviewLabel}>Hash</Text>
             <Text style={styles.reviewValue}>0x7a8b...3f2e</Text>
          </View>
       </View>
      
       <View style={styles.walletConnectionBox}>
          <Text style={styles.walletLabel}>Wallet Connected</Text>
          <Text style={styles.walletAddress}>
             {isConnected ? address : "No wallet connected."}
          </Text>
       </View>
    </View>
  );

  const renderSuccess = () => (
    <View style={styles.successContainer}>
        <Text style={styles.stepTitle}>Success</Text>
        <Text style={styles.stepSubtitle}>Confirmation</Text>
        
        {/* Progress Bar (Show complete state) */}
        <View style={styles.successProgress}>
             <Ionicons name="checkmark-circle-outline" size={30} color="#003262" />
             <View style={styles.successLine} />
             <Ionicons name="checkmark-circle-outline" size={30} color="#003262" />
             <View style={styles.successLine} />
             <Ionicons name="checkmark-circle-outline" size={30} color="#003262" />
        </View>

        <Text style={styles.successBodyText}>
            Your document has been successfully verified and stored on the blockchain.
            You can now view your contract details.
        </Text>
        
        <View style={styles.successButtonsContainer}>
             <TouchableOpacity onPress={resetForm}>
                <Text style={styles.textButton}>Back to Create</Text>
             </TouchableOpacity>
             
             <TouchableOpacity style={styles.homeButtonTextWrapper} onPress={() => router.replace('/home')}>
                <Text style={styles.textButton}>Back to Home</Text>
             </TouchableOpacity>
        </View>
    </View>
  );

  return (
    <View style={styles.container}>
      <LinearGradient
        colors={['#bdc8feff', '#fef4d3ff']}
        style={styles.background}
      />

      <SafeAreaView style={styles.safeArea}>
        <Text style={styles.headerText}>Create</Text>
        
        {currentStep !== STEPS.SUCCESS && (
            <View style={styles.topSection}>
                {/* Dynamic Sub-headers based on step are inside the render functions now to match design layout */}
                <ProgressBar currentStep={currentStep} />
            </View>
        )}

        <View style={styles.mainContentWrapper}>
            {currentStep === STEPS.SELECT_TYPE && renderStep1Selection()}
            {currentStep === STEPS.DETAILS_UPLOAD && renderStep2Details()}
            {currentStep === STEPS.REVIEW && renderStep3Review()}
            {currentStep === STEPS.SUCCESS && renderSuccess()}
        </View>

        {/* Text-Only Navigation Bar */}
        {currentStep !== STEPS.SUCCESS && (
        <View style={styles.navBar}>
          
          {/* CENTER STACKED: Continue on top, Back on bottom */}
          <View style={styles.navStack}>
            <TouchableOpacity 
                onPress={handleNext}
                disabled={!isConnected && currentStep === STEPS.REVIEW}
            >
                <Text style={styles.navTextContinue}>
                    {currentStep === STEPS.REVIEW ? 'Submit' : 'Continue'}
                </Text>
            </TouchableOpacity>

            {currentStep > 1 && (
                <TouchableOpacity onPress={handleBack} style={{marginTop: 15}}>
                    <Text style={styles.navTextBack}>Back</Text>
                </TouchableOpacity>
            )}
          </View>
          
        </View>
        )}

      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { position: 'absolute', left: 0, right: 0, top: 0, height: '100%' },
  safeArea: { flex: 1, paddingTop: 10 },
  headerText: { fontSize: 26, fontWeight: '400', color: '#003262', textAlign: 'center', marginTop: 10, marginBottom: 10 },
  
  topSection: { alignItems: 'center' },
  mainContentWrapper: { flex: 1, paddingHorizontal: 25 }, 
  
  // --- Progress Bar ---
  progressContainer: { flexDirection: 'row', alignItems: 'center', justifyContent: 'center', marginBottom: 20 },
  stepCircle: { width: 32, height: 32, borderRadius: 16, justifyContent: 'center', alignItems: 'center', backgroundColor: 'transparent' },
  stepText: { fontWeight: 'bold', fontSize: 16 },
  stepLine: { height: 1, width: 60, backgroundColor: '#003262', marginHorizontal: 5 },

  // --- Step 1: Selection ---
  stepContent: { flex: 1, alignItems: 'center' }, // Center content horizontally
  stepTitle: { fontSize: 20, fontWeight: '800', color: '#003262', textAlign: 'center', alignSelf: 'center' },
  stepSubtitle: { fontSize: 14, color: '#003262', marginBottom: 20, textAlign: 'center', alignSelf: 'center' },
  
  selectionContainer: { gap: 15, marginTop: 10, width: '100%' },
  selectionBox: { 
    width: '100%', 
    justifyContent: 'center',
    alignItems: 'flex-start', // Left align text
    borderRadius: 20, 
    borderWidth: 1, 
    paddingHorizontal: 25,
    paddingVertical: 20,
    height: 110, // Fixed height for consistency
  },
  // Active State: Periwinkle solid color
  selectedBox: { 
    backgroundColor: '#7d8ec4', 
    borderColor: '#003262',
    opacity: 1,
    borderWidth: 1.5,
  },
  // Inactive State: Translucent Blue
  unselectedBox: { 
    backgroundColor: '#7d8ec4', 
    borderColor: 'transparent', 
    opacity: 0.5 
  },
  textContainer: { justifyContent: 'center' },
  boxLabel: { fontSize: 24, fontWeight: '800', marginBottom: 5 },
  boxDescription: { fontSize: 13, fontWeight: '500', lineHeight: 18, maxWidth: '90%' },
  selectedText: { color: '#003262' }, // Dark Blue text for both states to match image
  unselectedText: { color: '#003262' },

  // --- Step 2: Upload ---
  scrollContainer: { flex: 1, width: '100%' },
  scrollInner: { paddingBottom: 50, alignItems: 'center' },
  uploadArea: { 
    width: '100%', 
    height: 180, 
    backgroundColor: 'rgba(255,255,255,0.4)', // Slightly transparent
    borderRadius: 20, 
    borderWidth: 1, 
    borderColor: '#003262', 
    justifyContent: 'center', 
    alignItems: 'center', 
    marginBottom: 25,
    backgroundColor: '#9faed4' // Match image background color approx
  },
  uploadText: { fontSize: 16, fontWeight: 'bold', color: '#003262', marginTop: 10 },
  supportedFormats: { fontSize: 12, color: '#003262', marginTop: 2 },
  fileInfo: { alignItems: 'center' },
  fileName: { fontSize: 16, color: '#003262', fontWeight: '600', marginTop: 8 },
  changeFileText: { color: '#003262', marginTop: 4, textDecorationLine: 'underline' },
  
  inputLabel: { fontSize: 18, fontWeight: '700', color: '#003262', marginBottom: 8, alignSelf: 'flex-start' },
  input: { 
    width: '100%',
    backgroundColor: 'rgba(255,255,255,0.3)', 
    borderRadius: 25, 
    padding: 15, 
    fontSize: 16, 
    borderWidth: 1, 
    borderColor: '#003262', 
    marginBottom: 20,
    color: '#003262'
  },

  // --- Step 3: Review ---
  reviewList: { width: '100%', marginTop: 10 },
  reviewRow: { flexDirection: 'row', justifyContent: 'space-between', paddingVertical: 12 },
  reviewLabel: { fontSize: 16, color: '#003262', fontWeight: '500' },
  reviewValue: { fontSize: 16, fontWeight: '700', color: '#003262', flex: 1, textAlign: 'right', marginLeft: 20 },
  divider: { height: 1, backgroundColor: '#003262', opacity: 0.3 },
  walletConnectionBox: { 
    width: '100%',
    padding: 20, 
    backgroundColor: '#7d8ec4', 
    borderRadius: 25, 
    marginTop: 30,
    alignItems: 'flex-start'
  },
  walletLabel: { fontWeight: '700', color: '#003262', fontSize: 16, marginBottom: 5 },
  walletAddress: { fontSize: 12, fontFamily: 'Courier', color: '#003262', opacity: 0.8 },

  // --- Success ---
  successContainer: { flex: 1, alignItems: 'center', paddingBottom: 50 },
  successProgress: { flexDirection: 'row', alignItems: 'center', marginBottom: 30, marginTop: 10 },
  successLine: { width: 40, height: 1, backgroundColor: '#003262', marginHorizontal: 5 },
  successBodyText: { fontSize: 16, color: '#003262', textAlign: 'center', lineHeight: 22, paddingHorizontal: 20, marginBottom: 40 },
  successButtonsContainer: { alignItems: 'center', gap: 20 },
  textButton: { color: '#003262', fontSize: 16, fontWeight: '600' },

  // --- Navigation Buttons (Stacked) ---
  navBar: { 
    alignItems: 'center', 
    justifyContent: 'center',
    paddingBottom: 110, 
    paddingTop: 10,
  },
  navStack: { alignItems: 'center' },
  navTextContinue: { fontSize: 18, color: '#003262', fontWeight: '600' },
  navTextBack: { fontSize: 16, color: '#003262', fontWeight: '400' },
});