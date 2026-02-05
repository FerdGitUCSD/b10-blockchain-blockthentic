import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from 'react-native';
import { LinearGradient } from 'expo-linear-gradient';
import { useRouter } from 'expo-router';
import { useAuth } from '../context/AuthContext';

export default function AuthScreen() {
  const router = useRouter();
  const { signIn, signUp } = useAuth();
  const [mode, setMode] = useState('signin');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [username, setUsername] = useState('');
  const [loading, setLoading] = useState(false);

  const onSubmit = async () => {
    setLoading(true);
    try {
      if (mode === 'signin') {
        const { error } = await signIn({ email, password });
        if (error) throw error;
        router.replace('/home');
      } else {
        const { error } = await signUp({ email, password, username });
        if (error) throw error;
        Alert.alert('Account created', 'You can now sign in.');
        setMode('signin');
      }
    } catch (err) {
      Alert.alert('Auth error', err.message ?? String(err));
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <LinearGradient colors={['#bdc8feff', '#fef4d3ff']} style={styles.background} />
      <View style={styles.card}>
        <Text style={styles.title}>{mode === 'signin' ? 'Sign In' : 'Create Account'}</Text>

        {mode === 'signup' && (
          <TextInput
            style={styles.input}
            placeholder="Username"
            value={username}
            onChangeText={setUsername}
            autoCapitalize="none"
          />
        )}

        <TextInput
          style={styles.input}
          placeholder="Email"
          value={email}
          onChangeText={setEmail}
          autoCapitalize="none"
          keyboardType="email-address"
        />
        <TextInput
          style={styles.input}
          placeholder="Password"
          value={password}
          onChangeText={setPassword}
          secureTextEntry
        />

        <TouchableOpacity style={styles.primaryButton} onPress={onSubmit} disabled={loading}>
          <Text style={styles.primaryButtonText}>
            {loading ? 'Please wait...' : mode === 'signin' ? 'Sign In' : 'Create Account'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => setMode(mode === 'signin' ? 'signup' : 'signin')}>
          <Text style={styles.toggleText}>
            {mode === 'signin' ? "Don't have an account? Sign up" : 'Already have an account? Sign in'}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => router.back()}>
          <Text style={styles.backText}>Back</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  background: { position: 'absolute', left: 0, right: 0, top: 0, height: '100%' },
  card: {
    width: '85%',
    backgroundColor: 'rgba(255, 255, 255, 0.85)',
    padding: 24,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#003262',
  },
  title: { fontSize: 26, fontWeight: '700', color: '#003262', marginBottom: 18 },
  input: {
    borderWidth: 1,
    borderColor: '#003262',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 10,
    marginBottom: 12,
    backgroundColor: '#fff',
  },
  primaryButton: {
    backgroundColor: '#6b88c8',
    paddingVertical: 12,
    borderRadius: 12,
    alignItems: 'center',
    marginTop: 6,
  },
  primaryButtonText: { color: '#fff', fontSize: 16, fontWeight: '600' },
  toggleText: { textAlign: 'center', color: '#003262', marginTop: 14 },
  backText: { textAlign: 'center', color: '#003262', marginTop: 12 },
});
