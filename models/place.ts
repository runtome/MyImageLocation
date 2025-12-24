export interface PlaceLocation {
  lat: number;
  lng: number;
}

export class Place {
  id: string;
  title: string;
  imageUri: string;
  address: string;
  location: PlaceLocation;

  constructor(
    title: string,
    imageUri: string,
    address: string,
    location: PlaceLocation
  ) {
    this.title = title;
    this.imageUri = imageUri;
    this.address = address;
    this.location = location;
    this.id = new Date().toString() + Math.random().toString();
  }
}
