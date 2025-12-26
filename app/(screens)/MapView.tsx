import { useState } from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';



export default function Map() {
  const [selectedLocation, setSelectedLocation] = useState<{ lat: number; lng: number }>();

  const region = {
    latitude: 16.44788,
    longitude: 102.8081177,
    latitudeDelta: 0.0922,
    longitudeDelta: 0.0421,
  };

  function selectLocationHandler(event: any) {
    const lat = event.nativeEvent.coordinate.latitude;
    const lng = event.nativeEvent.coordinate.longitude;
    console.log(lat, lng);
    setSelectedLocation({ lat: lat, lng: lng });
  }

  return (
    <MapView style={styles.map} initialRegion={region} onPress={selectLocationHandler} >
      {selectedLocation && (
        <Marker
          title="Picked Location"
          coordinate={{ 
            latitude: selectedLocation.lat, 
            longitude: selectedLocation.lng 
          }}
        />
      )}
    </MapView>
  );
}

const styles = StyleSheet.create({
  map: {
    flex: 1,
  },
});