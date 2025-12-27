import IconButton from '@/components/ui/IconButton';
import { router, useLocalSearchParams, useNavigation } from 'expo-router';
import { useCallback, useLayoutEffect, useState } from 'react';
import { Alert, StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

export default function MapScreen() {
  const navigation = useNavigation();
  const params = useLocalSearchParams();

  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number }>();

  const region = {
    latitude: 16.44788,
    longitude: 102.8081177,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event: any) {
    const { latitude, longitude } = event.nativeEvent.coordinate;
    setSelectedLocation({ lat: latitude, lng: longitude });
  }

  const savePickedLocationHandler = useCallback(() => {
    if (!selectedLocation) {
      Alert.alert(
        'No location picked!',
        'You have to pick a location first!'
      );
      return;
    }

    // 🔥 Update params of previous screen
    router.setParams({
      latitude: selectedLocation.lat.toString(),
      longitude: selectedLocation.lng.toString(),
    });

    // 🔥 Go back instead of push
    router.back();
  }, [selectedLocation]);

  useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: ({ tintColor }: any) => (
        <IconButton
          icon="save"
          size={24}
          color={tintColor}
          onPress={savePickedLocationHandler}
        />
      ),
    });
  }, [navigation, savePickedLocationHandler]);

  return (
    <MapView
      style={styles.map}
      initialRegion={region}
      onPress={selectLocationHandler}
    >
      {selectedLocation && (
        <Marker
          coordinate={{
            latitude: selectedLocation.lat,
            longitude: selectedLocation.lng,
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: { flex: 1 },
});
