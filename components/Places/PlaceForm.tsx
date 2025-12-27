import { useCallback, useEffect, useState } from "react";
import { ScrollView, StyleSheet, Text, TextInput, View } from "react-native";

import { Colors } from "@/constants/colors";
import { useLocalSearchParams } from "expo-router";
import ImagePicker from "../Places/ImagePicker";
import Button from "../ui/Button";
import LocationPicker from "./LocationPicker";

interface PlaceFormProps {
  latitude?: number;
  longitude?: number;
}

export default function PlaceForm() {
  const [enteredTitle, setEnteredTitle] = useState('');
  const [pickedLocation, setPickedLocation] = useState<{ lat: number; lng: number } | null>(null);
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const { latitude, longitude } = useLocalSearchParams<{
    latitude?: string;
    longitude?: string;
  }>();

  console.log('Received coordinates:', latitude, longitude);

  useEffect(() => {
    if (latitude && longitude) {
      setPickedLocation({
        lat: Number(latitude),
        lng: Number(longitude),
      });
    }
  }, [latitude, longitude]);

  function changeTitleHandler(enteredText: string) {
    setEnteredTitle(enteredText);
  }

  function takeImageHandeler (imageUri: string) {
    setSelectedImage(imageUri);
    console.log('Image URI:', imageUri);
  }

  const pickLocationHandler = useCallback((lat: number, lng: number) => {
    setPickedLocation({ lat, lng });
    console.log('Picked Location:', lat, lng);
  }, []);

  function savePlaceHandler() {
    console.log('Saving Place with details:');
    console.log('Title:', enteredTitle);
    console.log('Image URI:', selectedImage);
    console.log('Location:', pickedLocation);
    // Logic to save the place will go here
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
      <ImagePicker onImageTaken={takeImageHandeler} />
      <LocationPicker onPickLocation={pickLocationHandler} />
      <Button onPress={savePlaceHandler}>Add Place</Button>
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