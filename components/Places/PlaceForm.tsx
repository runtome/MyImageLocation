import { useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { Colors } from "@/constants/colors";
import ImagePicker from "../Places/ImagePicker";
import LocationPicker from "./LocationPicker";

interface PlaceFormProps {
  latitude?: number;
  longitude?: number;
}

export default function PlaceForm({ latitude, longitude }: PlaceFormProps) {
  const [enteredTitle, setEnteredTitle] = useState('');

  console.log('Received coordinates:', latitude, longitude);

  function changeTitleHandler(enteredText: string) {
    setEnteredTitle(enteredText);
  }

  return(
    <ScrollView style={styles.form}>
      <View>
        <Text style={styles.label}>Title</Text>
        <TextInput 
          style={styles.input}
          onChangeText={changeTitleHandler} 
          value={enteredTitle} 
        />
      </View>
      <ImagePicker />
      <LocationPicker />
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 24,
  },
  label: {
    fontWeight: 'bold',
    marginBottom: 4,
    color: Colors.primary500,
  },
  input: {
    marginVertical: 8,
    paddingHorizontal: 4,
    paddingVertical: 8,
    fontSize: 16,
    borderBottomColor: '#ccc',
    borderBottomWidth: 2,
    color: Colors.primary700,
    backgroundColor: Colors.primary100,
  },
});