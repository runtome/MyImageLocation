import { Place } from "@/models/place";
import { Image, Pressable, StyleSheet, Text, View } from "react-native";


export default function PlaceItem({ place }: { place: Place }) {
  return (
  <Pressable>
    <Image source={{ uri: place.imageUri }} style={{ width: 100, height: 100 }} />
    <View>
      <Text>{place.title}</Text>
      <Text>{place.address}</Text> 
    </View>
  </Pressable>
  );
}

const styles = StyleSheet.create({
  placeItem: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 10,
    borderBottomColor: '#ccc',
    borderBottomWidth: 1,
  },
  image: { 
    width: 100, 
    height: 100, 
    borderRadius: 8,  
    marginRight: 10,
  },
});
