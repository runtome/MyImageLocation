


const GOOGLE_MAPS_API_KEY = process.env.EXPO_PUBLIC_GOOGLE_MAPS_API_KEY; 
//must be begining with "EXPO_PUBLIC_" to be accessible in the Expo app


export default function getMapPreview(latitude: number, longitude: number) {
  console.log("Generating map preview for:", latitude, longitude);
  console.log("Using Google API Key:", GOOGLE_MAPS_API_KEY);

  const imagePreviewUrl = `https://maps.googleapis.com/maps/api/staticmap?center=${latitude},${longitude}&zoom=14&size=400x200&maptype=roadmap&markers=color:red%7Clabel:A%7C${latitude},${longitude}&key=${GOOGLE_MAPS_API_KEY}`;
   console.log("Map Preview URL:", imagePreviewUrl);
  return imagePreviewUrl;
}
