import PlaceForm from '@/components/Places/PlaceForm';
import { useLocalSearchParams } from 'expo-router'; // Import the hook to access route parameters

export default function AddPlace() {
  const { latitude, longitude } = useLocalSearchParams<{
    latitude?: string;
    longitude?: string;
  }>();

  const lat = latitude ? Number(latitude) : undefined;
  const lng = longitude ? Number(longitude) : undefined;

  console.log('Received coordinates in AddPlace:', lat, lng);

  return <PlaceForm />;
}
