import {
  Dimensions,
  ScaledSize,
  StyleSheet,
  useWindowDimensions,
} from "react-native";

const boxShadow = {
  shadowColor: "#000",
  shadowOffset: { width: 2, height: 2 },
  shadowRadius: 15,
  borderColor: "rgba(255,255,255,0.25)",
  borderWidth: 1,
};

const red = "rgba(204, 0, 0, 1)";

export const styles = ({ width, height }: ScaledSize) => {
  return StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "#f0f0f0",
      borderBottomWidth: 10,
      display: "flex",
    },
    backgroundImage: {
      flex: 1,
      width: "100%",
      minHeight: height,
      justifyContent: "center",
      borderBottomWidth: 10,
    },
    overlay: {
      width: "100%",
      flexGrow: 1,
      flexWrap: "wrap",
      backgroundColor: "rgba(0, 0, 0, 0.65)", // Semi-transparent black overlay
      justifyContent: "flex-start",
      alignItems: "center",
    },
    heading: {
      width: "100%",
      padding: 10,
      backgroundColor: "rgba(83, 83, 83, 0.75)",
      marginBottom: 40,
    },
    mainContentContainer: {
      width: "100%",
      padding: width * 0.03,
      display: "flex",
    },
    title: {
      fontSize: width < 768 ? width * 0.06 : 30,
      fontVariant: ["small-caps"],
      fontWeight: "100",
      marginBottom: 10,
      textAlign: "center",
      color: red,
    },
    subtitle: {
      fontSize: width < 768 && width > 300 ? width * 0.035 : 25,
      marginBottom: 20,
      textAlign: "center",
      color: "#fff",
      fontWeight: "100",
    },
    text: {
      color: "white",
      fontSize: 42,
      fontWeight: "bold",
      textAlign: "center",
    },
    subText: {
      color: "white",
      fontSize: 18,
      textAlign: "center",
      marginTop: 10,
    },
    savingsContainer: {
      width: "100%",
      backgroundColor: "rgba(83, 83, 83, 0.75)", // Semi-transparent white background
      borderRadius: 10,
      padding: 20,
      marginBottom: 20,
      ...boxShadow,
    },
    savingsText: {
      width: "100%",
      fontSize: 20,
      fontWeight: "100",
      marginBottom: 10,
      color: "white",
    },
    progressBarContainer: {
      width: "100%",
      height: 30,
      backgroundColor: "#fff",
      borderRadius: 10,
      overflow: "hidden",
      marginBottom: 15,
    },
    progressBar: {
      height: "100%",
      backgroundColor: "black",
      borderColor: "black",
      marginBottom: 10,
    },
    progressText: {
      marginTop: 5,
      textAlign: "right",
      color: "white",
    },
    inputContainer: {
      flexDirection: "row",
      width: "100%",
    },
    input: {
      flexGrow: 1,
      height: 40,
      // borderColor: "#333",
      // borderWidth: 1,
      paddingHorizontal: 10,
      marginRight: 10,
      borderRadius: 5,
      backgroundColor: "rgba(83, 83, 83, 0.75)",
      color: "white",
      ...boxShadow,
    },
    button: {
      backgroundColor: "black",
      padding: 10,
      borderRadius: 5,
      justifyContent: "center",
      ...boxShadow,
    },
    clearButton: {
      marginTop: 20,
      width: "auto",
      textAlign: "center",
      alignSelf: "flex-end",
      backgroundColor: "rgba(0,0,0,0)",
    },
    buttonText: {
      color: "white",
      fontWeight: "bold",
    },
    winsContainer: {
      width: "100%",
      flexGrow: 1,
      minHeight: "30%",
      marginTop: 20,
      padding: 20,
      borderRadius: 10,
      backgroundColor: "rgba(83, 83, 83, 0.75)",
      ...boxShadow,
    },
    winsTitle: {
      fontSize: 32,
      fontWeight: "bold",
      marginBottom: 20,
      color: "white",
    },
    winView: {
      paddingBottom: 10,
      marginBottom: 15,
      borderBottomWidth: 1,
      borderColor: "#333",
    },
    winText: {
      color: "white",
      fontWeight: 100,
    },
  });
};
