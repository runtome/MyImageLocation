import PlacesList from "@/components/Places/PlacesList";
import { Place } from "@/models/place";


export default function AllPlaceScreen({places}: {places: Place[]}) {
  return <PlacesList places={places} />;
}