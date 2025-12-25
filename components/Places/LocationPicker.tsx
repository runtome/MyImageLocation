import { StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";
import OutlineButton from "../ui/OutlineButton";

export default function LocationPicker() {
  function getLocationHandler() {}

  function pickOnMapHandler() {}
  
  return (
  <View>
    <View style={styles.mapPreview}></View>
    <View style={styles.actions}>
      <OutlineButton icon="location" onPress={getLocationHandler}>
        Locate User
      </OutlineButton>
      <OutlineButton icon="map" onPress={pickOnMapHandler}>
        Pick on Map
      </OutlineButton>
    </View>
    <Text>Location Picker Component</Text>
  </View>
  );
}


const styles = StyleSheet.create({
  mapPreview: {
      width: '100%',
      height: 200,
      marginVertical: 8,
      justifyContent: 'center',
      alignItems: 'center',
      backgroundColor: Colors.primary100,
      borderRadius: 4,
      overflow: 'hidden',
    },
    actions: {
      flexDirection: 'row',
      justifyContent: 'space-around',
      alignItems: 'center',
    },
});