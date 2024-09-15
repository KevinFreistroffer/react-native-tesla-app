import React, { useEffect, useRef, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
  ImageBackground,
  Dimensions,
  useWindowDimensions,
  Animated,
  TouchableWithoutFeedback,
  Keyboard,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { styles as getStyles } from "./styles";
import { ScrollView } from "react-native-gesture-handler";
import { Ionicons } from "@expo/vector-icons"; // Add this import
import SideMenu from "@/components/SideMenu/SideMenu";
import Header from "@/components/Header";

interface ISavings {
  amount: number;
  date: string;
}

const TESLA_PRICE = 25000;
const STORAGE_KEY = "tesla_purchases";

export default function App() {
  const [currentSavings, setCurrentSavings] = useState(TESLA_PRICE);
  const [inputAmount, setInputAmount] = useState("");
  const [hasFetchedStorage, setHasFetchedStorage] = useState(false);
  const [wins, setWins] = useState<ISavings[]>([]);
  const windowDimensions = useWindowDimensions();
  const styles = getStyles(windowDimensions);
  const [menuOpen, setMenuOpen] = useState(false);
  const slideAnim = useRef(new Animated.Value(-300)).current;
  const fadeAnim = useRef(new Animated.Value(0)).current;

  const handleSubmit = async () => {
    const amount = parseFloat(inputAmount);
    if (!isNaN(amount) && amount > 0) {
      wins.push({ amount, date: new Date().toISOString() });
      setCurrentSavings((prev) => Math.max(0, prev - amount));
      setInputAmount("");
      await storeData({ amount, date: new Date().toISOString() });
    }
  };

  const progress = ((TESLA_PRICE - currentSavings) / TESLA_PRICE) * 100;

  const storeData = async (value: ISavings) => {
    console.log(value);
    try {
      const stored = await getData();
      console.log("stored", stored);
      if (stored) {
        const jsonValue = JSON.stringify([...stored, value]);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      } else {
        const jsonValue = JSON.stringify([value]);
        await AsyncStorage.setItem(STORAGE_KEY, jsonValue);
      }
    } catch (e) {
      // saving error
      console.log(e);
    }
  };

  const getData = async () => {
    try {
      const jsonValue = await AsyncStorage.getItem(STORAGE_KEY);
      return jsonValue != null ? JSON.parse(jsonValue) : null;
    } catch (e) {
      // error reading value
      console.log(e);
    }
  };

  useEffect(() => {
    if (!hasFetchedStorage) {
      const fetchData = async () => {
        const storedData = await getData();
        if (storedData) {
          const totalAmount = storedData.reduce(
            (accumulator: number, item: ISavings) => accumulator + item.amount,
            0
          );
          setCurrentSavings(TESLA_PRICE - totalAmount);

          setWins(storedData);
        }
      };

      fetchData();
      setHasFetchedStorage(true);
    }
  }, [hasFetchedStorage]);

  const toggleMenu = () => {
    const toValue = menuOpen ? -300 : 0;
    const fadeValue = menuOpen ? 0 : 0.5;
    Animated.parallel([
      Animated.timing(slideAnim, {
        toValue,
        duration: 150,
        useNativeDriver: true,
      }),
      Animated.timing(fadeAnim, {
        toValue: fadeValue,
        duration: 150,
        useNativeDriver: true,
      }),
    ]).start();
    setMenuOpen(!menuOpen);
  };

  return (
    <TouchableWithoutFeedback
      onPress={() => {
        console.log("pressed");
      }}
      accessible={false}
    >
      {/* <Header toggleMenu={toggleMenu} /> */}
      <ScrollView style={styles.container}>
        <ImageBackground
          source={{
            uri: "https://images.unsplash.com/photo-1617704548623-340376564e68?auto=format&fit=crop&q=80&w=2070&ixlib=rb-4.0.3",
          }}
          style={styles.backgroundImage}
          resizeMode="cover"
        >
          <View style={styles.overlay}>
            <View style={styles.header}>
              <TouchableOpacity style={styles.headerLeft} onPress={toggleMenu}>
                <Ionicons name="menu" size={24} color="white" />
              </TouchableOpacity>
              <Text style={styles.headerTitle}>Savings Tracker</Text>
              <TouchableOpacity
                style={styles.headerRight}
                onPress={() => {
                  /* Handle sign in press */
                }}
              >
                <Text style={styles.signInText}>Sign In</Text>
              </TouchableOpacity>
            </View>

            <View style={styles.mainContentContainer}>
              <View style={styles.savingsContainer}>
                {!hasFetchedStorage ? (
                  <ActivityIndicator size="large" color="#0000ff" />
                ) : (
                  <>
                    <Text style={styles.savingsText}>
                      Goal: ${TESLA_PRICE.toLocaleString()}
                    </Text>
                    <Text style={styles.savingsText}>
                      Current Savings: ${currentSavings.toLocaleString()}
                    </Text>
                    <View style={styles.progressBarContainer}>
                      <View
                        style={[styles.progressBar, { width: `${progress}%` }]}
                      />
                    </View>
                    <Text style={styles.progressText}>
                      {progress.toFixed(1)}% Complete
                    </Text>
                  </>
                )}
              </View>

              <View style={styles.inputContainer}>
                <TextInput
                  style={styles.input}
                  keyboardType="numeric"
                  value={inputAmount}
                  onChangeText={setInputAmount}
                  placeholder="Enter amount spent"
                />
                <TouchableOpacity style={styles.button} onPress={handleSubmit}>
                  <Text style={styles.buttonText}>Subtract</Text>
                </TouchableOpacity>
              </View>

              {wins.length > 0 && (
                <ScrollView style={styles.winsContainer}>
                  <Text style={styles.winsTitle}>Wins</Text>
                  {wins.map((win, index) => (
                    <View style={styles.winView} key={index}>
                      <Text key={index} style={styles.winText}>
                        Made ${win.amount.toLocaleString()}
                      </Text>
                    </View>
                  ))}
                </ScrollView>
              )}

              <TouchableOpacity
                style={{ ...styles.button, ...styles.clearButton }}
                onPress={async () => {
                  try {
                    await AsyncStorage.clear();
                    setWins([]);
                    setCurrentSavings(TESLA_PRICE);
                  } catch (error) {
                    console.log(error);
                  }
                }}
              >
                <Text style={styles.buttonText}>Clear</Text>
              </TouchableOpacity>
            </View>
          </View>
        </ImageBackground>

        {menuOpen && (
          <Animated.View
            style={[
              styles.menuOverlay,
              {
                opacity: fadeAnim,
              },
            ]}
          />
        )}
        <SideMenu slideAnim={slideAnim} closeMenu={() => toggleMenu()} />
      </ScrollView>
    </TouchableWithoutFeedback>
  );
}
