import React from "react";
import {
  View,
  Text,
  TouchableOpacity,
  Animated,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { Link } from "expo-router";

interface SideMenuProps {
  slideAnim: Animated.Value;
  closeMenu: () => void;
}

const SideMenu: React.FC<SideMenuProps> = ({ slideAnim, closeMenu }) => {
  return (
    <Animated.View
      style={[styles.menu, { transform: [{ translateX: slideAnim }] }]}
    >
      <TouchableOpacity style={styles.closeButton} onPress={closeMenu}>
        <Ionicons name="close" size={24} color="white" />
      </TouchableOpacity>
      <Link href="/" asChild>
          <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
            <Text style={styles.menuItem}>Home</Text>
          </TouchableOpacity>
        </Link>
        <Link href="/sign-in" asChild>
          <TouchableOpacity style={styles.menuItem} onPress={closeMenu}>
            <Text style={styles.menuItem}>Sign In</Text>
          </TouchableOpacity>
        </Link>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  menu: {
    position: "absolute",
    left: 0,
    top: 0,
    bottom: 0,
    width: 300,
    backgroundColor: "rgba(0, 0, 0, 0.9)",
    padding: 20,
    paddingTop: 40,
  },
  closeButton: {
    alignSelf: "flex-end",
    marginBottom: 20,
  },
  menuItem: {
    color: "white",
    fontSize: 18,
    marginBottom: 20,
  },
});

export default SideMenu;
