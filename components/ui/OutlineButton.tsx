import { Ionicons } from '@expo/vector-icons';
import { Pressable, StyleSheet, Text } from 'react-native';

import { Colors } from '@/constants/colors';

interface OutlineButtonProps {
  children: React.ReactNode;
  onPress: () => void;
  icon: keyof typeof Ionicons.glyphMap;
}

export default function OutlineButton({ children, onPress, icon }: OutlineButtonProps) {
  return (
    <Pressable 
      onPress={onPress} 
      style={({ pressed }) => [styles.button, pressed && styles.pressed]}
    >
      <Ionicons style={styles.icon} name={icon} size={24} color={Colors.primary500} />
      <Text style={styles.text}>{children}</Text>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  button: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    margin: 4,
    justifyContent: 'center',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: Colors.primary500,
  },
  pressed: {
    opacity: 0.7,
  },
  icon: {
    marginRight: 6,
  },
  text: {
    color: Colors.primary500,
    fontSize: 16,
  },

});