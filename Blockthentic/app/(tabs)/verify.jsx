// app/(tabs)/verify.jsx
import { sepolia } from 'viem/chains';
import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, ActivityIndicator, Alert, Platform } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { Ionicons } from '@expo/vector-icons';
import * as DocumentPicker from 'expo-document-picker';
import * as FileSystem from 'expo-file-system'; // Use standard import
import * as Crypto from 'expo-crypto';
import { useRouter } from 'expo-router';
import { useReadContract } from 'wagmi';

// --- CONFIGURATION ---
const CONTRACT_ADDRESS = '0x459E40D36aAD635963fa2c65b3610C9360FA065b'; 

const CONTRACT_ABI = [
  {
    "inputs": [
      { "internalType": "bytes32", "name": "docId", "type": "bytes32" },
      { "internalType": "bytes32", "name": "docHash", "type": "bytes32" }
    ],
    "name": "verifyDocument",
    "outputs": [{ "internalType": "bool", "name": "", "type": "bool" }],
    "stateMutability": "view",
    "type": "function"
  }
];

const STEPS = {
  SELECT_TYPE: 1,
  UPLOAD: 2,
  RESULT: 3,
};

const VERIFY_TYPES = {
  DOCUMENT: { 
    id: 'document', 
    label: 'Document', 
    description: 'Verify certificates & contracts',
    active: true 
  },
  DATASET: { 
    id: 'dataset', 
    label: 'Dataset', 
    description: 'Coming soon...',
    active: false 
  },
  MEDIA: { 
    id: 'media', 
    label: 'Visual Media', 
    description: 'Coming soon...',
    active: false 
  },
};

export default function VerifyPage() {
  const router = useRouter();
  
  const [currentStep, setCurrentStep] = useState(STEPS.SELECT_TYPE);
  const [selectedType, setSelectedType] = useState(null);
  const [file, setFile] = useState(null);
  const [fileHash, setFileHash] = useState(null);
  const [isHashing, setIsHashing] = useState(false);

  // --- WAGMI HOOK ---
  const { 
    data: isVerified, 
    isError, 
    error,
    isLoading: isContractLoading, 
    refetch 
  } = useReadContract({
    address: CONTRACT_ADDRESS,
    abi: CONTRACT_ABI,
    functionName: 'verifyDocument',
    args: fileHash ? [fileHash, fileHash] : undefined,
    chainId: 11155111,
    query: {
      enabled: false, // We fire this manually
    }
  });

  // --- EFFECT: Trigger Blockchain Read ---
  // This waits until 'fileHash' is actually set before running the contract check
  useEffect(() => {
    if (fileHash) {
      console.log("Hash set, checking contract...", fileHash);
      refetch()
        .then(() => {
          setCurrentStep(STEPS.RESULT);
        })
        .catch((err) => {
          console.error("Contract Read Error:", err);
          Alert.alert("Error", "Failed to check blockchain.");
        });
    }
  }, [fileHash]); // Only runs when fileHash changes

  // --- ACTIONS ---

  const handleTypeSelect = (typeId) => {
    if (VERIFY_TYPES[typeId.toUpperCase()].active) {
      setSelectedType(typeId);
      setCurrentStep(STEPS.UPLOAD);
    }
  };

  const pickDocument = async () => {
    try {
      const result = await DocumentPicker.getDocumentAsync({
        type: ['application/pdf', 'application/msword', 'text/plain'],
        copyToCacheDirectory: true,
      });

      if (result.assets && result.assets.length > 0) {
        setFile(result.assets[0]);
        setFileHash(null); 
      }
    } catch (err) {
      console.log("Error picking document:", err);
    }
  };

  const calculateHash = async (fileUri, fileObject) => { // Note: pass the full file object from picker
    try {
      setIsHashing(true);
      let fileContent;

      // --- LOGIC FOR WEB ---
      if (Platform.OS === 'web') {
        let blob;
        // Robustness: Try to use the File object directly if Expo provided it
        if (fileObject && fileObject.file) {
            blob = fileObject.file;
        } else {
            // Fallback: Fetch the blob from the URL
            const response = await fetch(fileUri);
            blob = await response.blob();
        }
        
        // Convert Blob to Base64 manually
        fileContent = await new Promise((resolve, reject) => {
          const reader = new FileReader();
          reader.onloadend = () => {
            const base64data = reader.result;
            // Remove the "data:application/pdf;base64," prefix
            // This regex handles various mime types safely
            const rawBase64 = base64data.replace(/^data:.+;base64,/, '');
            resolve(rawBase64);
          };
          reader.onerror = reject;
          reader.readAsDataURL(blob);
        });
      } 
      // --- LOGIC FOR MOBILE (iOS/Android) ---
      else {
         fileContent = await FileSystem.readAsStringAsync(fileUri, {
          encoding: 'base64', 
        });
      }

      // Hash the result (Crypto works on both web and mobile!)
      const hash = await Crypto.digestStringAsync(
        'SHA-256',
        fileContent
      );

      return `0x${hash}`;

    } catch (error) {
      console.error("Hashing Error:", error);
      Alert.alert("Error", "Could not process file.");
      return null;
    } finally {
      setIsHashing(false);
    }
  };

  const handleVerify = async () => {
    if (!file) return;

    // Pass the entire file object so Web logic can access the File blob
    const hash = await calculateHash(file.uri, file);
    
    if (hash) {
      // Just set the hash. The useEffect above handles the rest.
      setFileHash(hash);
    }
  };

  const resetVerify = () => {
    setFile(null);
    setFileHash(null);
    setCurrentStep(STEPS.SELECT_TYPE);
    setSelectedType(null);
  };

  // --- RENDER FUNCTIONS ---
  // (Rendering logic is identical to before, just cleaner structure)

  const renderStep1Selection = () => (
    <View style={styles.stepContent}>
      <Text style={styles.stepTitle}>Verify</Text>
      <Text style={styles.stepSubtitle}>Select what you want to verify</Text>
      <View style={styles.selectionContainer}>
        {Object.values(VERIFY_TYPES).map((item) => (
          <TouchableOpacity
            key={item.id}
            style={[styles.selectionBox, !item.active && styles.disabledBox]}
            onPress={() => handleTypeSelect(item.id)}
            disabled={!item.active}
          >
            <View style={styles.textContainer}>
              <Text style={[styles.boxLabel, !item.active && styles.disabledText]}>{item.label}</Text>
              <Text style={[styles.boxDescription, !item.active && styles.disabledText]}>{item.description}</Text>
            </View>
            {item.active && <Ionicons name="arrow-forward" size={24} color="#003262" />}
          </TouchableOpacity>
        ))}
      </View>
    </View>
  );

  const renderStep2Upload = () => (
    <ScrollView style={styles.scrollContainer} contentContainerStyle={styles.scrollInner}>
       <Text style={styles.stepTitle}>Upload Document</Text>
       <Text style={styles.stepSubtitle}>We will hash this file to verify it against the blockchain.</Text>
       
       <TouchableOpacity style={styles.uploadArea} onPress={pickDocument}>
          {file ? (
             <View style={styles.fileInfo}>
                 <Ionicons name="document-text" size={40} color="#003262"/>
                 <Text style={styles.fileName} numberOfLines={1}>{file.name}</Text>
                 <Text style={styles.changeFileText}>Tap to change</Text>
             </View>
          ) : (
             <>
               <Ionicons name="cloud-upload-outline" size={50} color="#003262" />
               <Text style={styles.uploadText}>Click to upload</Text>
               <Text style={styles.supportedFormats}>PDF, DOC, TXT</Text>
             </>
          )}
       </TouchableOpacity>

       <TouchableOpacity 
          style={[styles.primaryButton, (!file || isHashing || isContractLoading) && styles.disabledButton]} 
          onPress={handleVerify}
          disabled={!file || isHashing || isContractLoading}
       >
          {isHashing || isContractLoading ? (
            <ActivityIndicator color="#fff" />
          ) : (
            <Text style={styles.primaryButtonText}>Verify Now</Text>
          )}
       </TouchableOpacity>

       <TouchableOpacity onPress={() => setCurrentStep(STEPS.SELECT_TYPE)} style={styles.cancelButton}>
          <Text style={styles.cancelButtonText}>Cancel</Text>
       </TouchableOpacity>
    </ScrollView>
  );

  const renderStep3Result = () => {
    const success = isVerified === true;
    return (
      <View style={styles.resultContainer}>
          {success ? (
            <>
              <Ionicons name="shield-checkmark" size={100} color="#4A90E2" />
              <Text style={styles.resultTitle}>Verified!</Text>
              <Text style={styles.resultSubtitle}>This document matches the record on the blockchain. It is authentic.</Text>
            </>
          ) : (
            <>
              <Ionicons name="alert-circle" size={100} color="#D32F2F" />
              <Text style={[styles.resultTitle, { color: '#D32F2F' }]}>Verification Failed</Text>
              <Text style={styles.resultSubtitle}>
                {isError ? "Error connecting to blockchain." : "This document does NOT match any record on the blockchain."}
              </Text>
            </>
          )}
          
          <View style={styles.hashBox}>
            <Text style={styles.hashLabel}>Document Hash:</Text>
            <Text style={styles.hashValue}>
              {fileHash ? `${fileHash.slice(0, 10)}...${fileHash.slice(-8)}` : "---"}
            </Text>
          </View>
          
          <TouchableOpacity style={styles.primaryButton} onPress={resetVerify}>
              <Text style={styles.primaryButtonText}>Verify Another</Text>
          </TouchableOpacity>
          
          <TouchableOpacity style={styles.cancelButton} onPress={() => router.replace('/home')}>
              <Text style={styles.cancelButtonText}>Back to Home</Text>
          </TouchableOpacity>
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#bdc8feff', '#fef4d3ff']} style={styles.background} />
      <SafeAreaView style={styles.safeArea}>
        <View style={styles.mainContentWrapper}>
            {currentStep === STEPS.SELECT_TYPE && renderStep1Selection()}
            {currentStep === STEPS.UPLOAD && renderStep2Upload()}
            {currentStep === STEPS.RESULT && renderStep3Result()}
        </View>
      </SafeAreaView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  background: { position: 'absolute', left: 0, right: 0, top: 0, height: '100%' },
  safeArea: { flex: 1, paddingTop: 10 },
  mainContentWrapper: { 
    flex: 1, 
    paddingHorizontal: 25, 
    paddingTop: 20,
    width: '100%',
    maxWidth: 800,
    alignSelf: 'center'
  },
  stepContent: { flex: 1, alignItems: 'center' },
  stepTitle: { fontSize: 26, fontWeight: '700', color: '#003262', marginBottom: 5 },
  stepSubtitle: { fontSize: 16, color: '#555', marginBottom: 30 },
  selectionContainer: { gap: 15, width: '100%' },
  selectionBox: { 
    width: '100%', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center',
    borderRadius: 20, borderWidth: 1.5, borderColor: '#003262', backgroundColor: '#7d8ec4',
    paddingHorizontal: 25, paddingVertical: 20, height: 100,
  },
  disabledBox: { backgroundColor: 'rgba(125, 142, 196, 0.3)', borderColor: 'transparent', opacity: 0.7 },
  textContainer: { justifyContent: 'center' },
  boxLabel: { fontSize: 22, fontWeight: '700', color: '#003262', marginBottom: 5 },
  boxDescription: { fontSize: 13, fontWeight: '500', color: '#003262' },
  disabledText: { color: 'rgba(0, 50, 98, 0.5)' },
  scrollContainer: { flex: 1, width: '100%' },
  scrollInner: { alignItems: 'center', paddingBottom: 100 },
  uploadArea: { 
    width: '100%', height: 200, backgroundColor: '#9faed4', borderRadius: 20, borderWidth: 1, borderColor: '#003262', 
    justifyContent: 'center', alignItems: 'center', marginBottom: 40, marginTop: 20,
  },
  uploadText: { fontSize: 18, fontWeight: 'bold', color: '#003262', marginTop: 10 },
  supportedFormats: { fontSize: 12, color: '#003262', marginTop: 5 },
  fileInfo: { alignItems: 'center' },
  fileName: { fontSize: 16, color: '#003262', fontWeight: '600', marginTop: 10 },
  changeFileText: { color: '#003262', marginTop: 5, textDecorationLine: 'underline' },
  resultContainer: { flex: 1, alignItems: 'center', justifyContent: 'center', paddingBottom: 50 },
  resultTitle: { fontSize: 28, fontWeight: 'bold', color: '#003262', marginTop: 20, marginBottom: 10 },
  resultSubtitle: { fontSize: 16, color: '#555', textAlign: 'center', marginBottom: 30, lineHeight: 22 },
  hashBox: { backgroundColor: 'rgba(255,255,255,0.5)', padding: 15, borderRadius: 10, marginBottom: 40, width: '100%', alignItems: 'center' },
  hashLabel: { fontSize: 12, color: '#555', marginBottom: 4 },
  hashValue: { fontSize: 14, fontFamily: 'Courier', fontWeight: '600', color: '#003262' },
  primaryButton: { 
    backgroundColor: '#003262', paddingVertical: 16, width: '100%', borderRadius: 50, 
    alignItems: 'center', justifyContent: 'center', marginBottom: 15,
  },
  disabledButton: { backgroundColor: '#888' },
  primaryButtonText: { color: '#fff', fontSize: 18, fontWeight: '600' },
  cancelButton: { padding: 10 },
  cancelButtonText: { color: '#555', fontSize: 16 },
});