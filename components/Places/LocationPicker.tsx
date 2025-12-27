import {
  getCurrentPositionAsync,
  PermissionStatus,
  useForegroundPermissions,
} from "expo-location";
import { router } from "expo-router";
import { useEffect, useState } from "react";
import {
  Alert,
  Image,
  StyleSheet,
  Text,
  View
} from "react-native";

import { Colors } from "@/constants/colors";
import getMapPreview from "@/util/location";
import OutlineButton from "../ui/OutlineButton";

interface LocationPickerProps {
  onPickLocation: (lat: number, lng: number) => void;
}

export default function LocationPicker({onPickLocation}: LocationPickerProps) {
  const [pickedLocation, setPickedLocation] = useState<{ lat: number; lng: number } | null>(null);

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

  useEffect(() => {
    if (pickedLocation) {
      onPickLocation(pickedLocation.lat, pickedLocation.lng);
    }
  }, [pickedLocation, onPickLocation]);

  async function getLocationHandler() {
    const hasPermission = await verifyPermissions();
    console.log("Has permission:", hasPermission);

    if (!hasPermission) {
      console.log("Permission to access location was denied");
      return;
    }

    const location = await getCurrentPositionAsync();
    // console.log("Location:", location);
    setPickedLocation({
      lat: location.coords.latitude,
      lng: location.coords.longitude,
    });
  }

  function pickOnMapHandler() {
    router.push('/(screens)/MapView');
  }

  let imagePreview = <Text>No location chosen yet!</Text>;
  if (pickedLocation) {
    imagePreview = (
      <Image
        style={styles.image}
        source={{
          uri: getMapPreview(
            pickedLocation.lat,
            pickedLocation.lng
            ),
          }}
        />
      );
    }

  return (
    <View>
      <View style={styles.mapPreview} >
        {imagePreview}
      </View>
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
  image: {
    width: '100%',
    height: '100%',
  },
});