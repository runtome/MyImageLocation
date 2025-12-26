import { Pressable, StyleSheet, Text } from "react-native";

import { Colors } from "@/constants/colors";

interface ButtonProps {
  children: React.ReactNode;
  onPress: () => void;
}

export default function Button({ children,onPress }: ButtonProps) {
  return(
    <Pressable style={({ pressed }) => pressed ? [styles.button, styles.pressed] : styles.button} 
    onPress={onPress}>
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 8,
    margin:4,
    backgroundColor: Colors.primary500,
    elevation: 2,
    shadowColor: 'black',
    shadowOffset: { width: 1, height: 1 },
    shadowOpacity: 0.35,
    shadowRadius: 4,
    borderRadius: 4,
  },
  pressed: {
    opacity: 0.7,
  },
  text:{
    textAlign: 'center',
    fontSize: 16,
    color: Colors.primary50,
  }

});