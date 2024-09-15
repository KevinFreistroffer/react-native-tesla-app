import React, { useEffect, useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import * as WebBrowser from 'expo-web-browser';
import * as AuthSession from 'expo-auth-session';
import { makeRedirectUri, useAuthRequest } from 'expo-auth-session';
import AsyncStorage from '@react-native-async-storage/async-storage';

// You'll need to replace these with your own GitHub OAuth App credentials
const CLIENT_ID = 'YOUR_GITHUB_CLIENT_ID';
const CLIENT_SECRET = 'YOUR_GITHUB_CLIENT_SECRET';

const discovery = {
    authorizationEndpoint: 'https://github.com/login/oauth/authorize',
    tokenEndpoint: 'https://github.com/login/oauth/access_token',
    revocationEndpoint: 'https://github.com/settings/connections/applications/<CLIENT_ID>',
  };

WebBrowser.maybeCompleteAuthSession();

const SignIn = ({ toggleMenu }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [emailError, setEmailError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [request, response, promptAsync] = useAuthRequest(
    {
      clientId: 'CLIENT_ID',
      scopes: ['identity'],
      redirectUri: makeRedirectUri({
        scheme: 'your.app'
      }),
    },
    discovery
  );

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSignIn = () => {
    let isValid = true;

    if (!email) {
      setEmailError('Email is required');
      isValid = false;
    } else if (!validateEmail(email)) {
      setEmailError('Please enter a valid email');
      isValid = false;
    } else {
      setEmailError('');
    }

    if (!password) {
      setPasswordError('Password is required');
      isValid = false;
    } else {
      setPasswordError('');
    }

    if (isValid) {
      console.log('Sign in pressed');
      // Proceed with sign-in logic
    }
  };


  useEffect(() => {
    if (response?.type === 'success') {
      const { code } = response.params;
    }
  }, [response]);

//   const handleGitHubLogin = async () => {
//     try {
//       const redirectUri = AuthSession.makeRedirectUri();
//       const authUrl = `https://github.com/login/oauth/authorize?client_id=${CLIENT_ID}&redirect_uri=${redirectUri}&scope=user`;

//       const result = await AuthSession.startAsync({ authUrl });

//       if (result.type === 'success') {
//         const { code } = result.params;
        
//         // Exchange the code for an access token
//         const tokenResponse = await fetch('https://github.com/login/oauth/access_token', {
//           method: 'POST',
//           headers: {
//             'Content-Type': 'application/json',
//             Accept: 'application/json',
//           },
//           body: JSON.stringify({
//             client_id: CLIENT_ID,
//             client_secret: CLIENT_SECRET,
//             code,
//           }),
//         });

//         const { access_token } = await tokenResponse.json();

//         // Store the access token
//         await AsyncStorage.setItem('github_token', access_token);

//         // Navigate to the main app or perform any other action
//         // For now, we'll just log the token
//         console.log('GitHub authentication successful!');
//       }
//     } catch (error) {
//       console.error('GitHub authentication error:', error);
//     }
//   };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.menuIcon} onPress={toggleMenu}>
        <Ionicons name="menu" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Sign In</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
      />
      {emailError ? <Text style={styles.errorText}>{emailError}</Text> : null}
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      {passwordError ? <Text style={styles.errorText}>{passwordError}</Text> : null}
      <TouchableOpacity style={styles.button} onPress={handleSignIn}>
        <Text style={styles.buttonText}>Sign In</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.githubButton} onPress={() => {
        promptAsync();
      }}>
        <Ionicons name="logo-github" size={24} color="white" />
        <Text style={styles.githubButtonText}>Sign in with GitHub</Text>
      </TouchableOpacity>
  </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  menuIcon: {
    position: 'absolute',
    top: 40,
    left: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  input: {
    width: '100%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 5,
    marginBottom: 10,
    paddingHorizontal: 10,
  },
  button: {
    backgroundColor: '#007AFF',
    padding: 10,
    borderRadius: 5,
    width: '100%',
    alignItems: 'center',
    marginBottom: 10,
  },
  buttonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
  },
  githubButton: {
    backgroundColor: '#24292e',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 10,
    borderRadius: 5,
    width: '100%',
  },
  githubButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold',
    marginLeft: 10,
  },
  errorText: {
    color: 'red',
    fontSize: 14,
    marginBottom: 10,
    alignSelf: 'flex-start',
  },
});

export default SignIn;
