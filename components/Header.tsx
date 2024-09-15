import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Ionicons } from "@expo/vector-icons";

interface HeaderProps {
  toggleMenu: () => void;
}

const Header: React.FC<HeaderProps> = ({ toggleMenu }) => {
  return (
    <View style={styles.header}>
      <TouchableOpacity onPress={toggleMenu} style={styles.menuButton}>
        <Ionicons name="menu-outline" size={24} color="black" />
      </TouchableOpacity>
      <Text style={styles.title}>Tesla Savings</Text>
      <View style={styles.placeholder} />
    </View>
  );
};

const styles = StyleSheet.create({
  header: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    paddingTop: 40, // Adjust this value based on the status bar height
    paddingBottom: 10,
    backgroundColor: "#fff",
    borderBottomWidth: 1,
    borderBottomColor: "#e0e0e0",
  },
  menuButton: {
    padding: 8,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
  },
  placeholder: {
    width: 40, // Same width as the menu button for balance
  },
});

export default Header;
