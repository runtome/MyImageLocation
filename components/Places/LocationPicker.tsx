import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { Alert, StyleSheet, View } from "react-native";

import { Colors } from "@/constants/colors";
import OutlineButton from "../ui/OutlineButton";

export default function LocationPicker() {
  const [permissionInfo, requestPermission] = useForegroundPermissions();

  async function verifyPermissions() {
    if (!permissionInfo || permissionInfo.status === PermissionStatus.UNDETERMINED) {
      const response = await requestPermission();
      return response.granted;
    }

    if (permissionInfo.status === PermissionStatus.DENIED) {
      Alert.alert(
        "Permission denied",
        "Location permission is required to use this feature."
      );
      return false;
    }

    return true;
  }

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    console.log("Has permission:", hasPermission);

    if (!hasPermission) {
      console.log("Permission to access location was denied");
      return;
    }

    const location = await getCurrentPositionAsync();
    console.log("Location:", location);
  }

  function pickOnMapHandler() {}

  return (
    <View>
      <View style={styles.mapPreview} />
      <View style={styles.actions}>
        <OutlineButton icon="location" onPress={getLocationHandler}>
          Locate User
        </OutlineButton>
        <OutlineButton icon="map" onPress={pickOnMapHandler}>
          Pick on Map
        </OutlineButton>
      </View>
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
  },
  actions: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
  },
});