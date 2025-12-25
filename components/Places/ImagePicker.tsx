import { launchCameraAsync, PermissionStatus, useCameraPermissions } from "expo-image-picker";
import { useState } from "react";
import { Image, StyleSheet, Text, View } from "react-native";

import { Colors } from "@/constants/colors";
import OutlineButton from "../ui/OutlineButton";

export default function ImagePicker() {

  const [cameraPermissionInformation, requestPermission] = useCameraPermissions();
  const [ pickimage, setPickimage ] = useState<string>();

  async function verifyPermissions() {
    // Add null check before accessing properties
    if (!cameraPermissionInformation) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    
    if (cameraPermissionInformation.status === PermissionStatus.UNDETERMINED) {
      const permissionResponse = await requestPermission();
      return permissionResponse.granted;
    }
    if (cameraPermissionInformation.status === PermissionStatus.DENIED) {
      return false;
    }
    return true;
  }

  async function takeImageHandler() {
    // Verify permissions before launching camera
    const hasPermission = await verifyPermissions();
    
    if (!hasPermission) {
      console.log("Camera permission denied");
      return;
    }
    
    console.log("Taking image...");
    const image = await launchCameraAsync({
      allowsEditing: true,
      aspect: [16, 9],
      quality: 0.5,
    });
    console.log(image);
    console.log("Image taken!");

    if (image.canceled || !image.assets || image.assets.length === 0) {
    console.log("Image capture canceled or no assets returned");
    return;
    }

    setPickimage(image.assets[0].uri);
  }

  let imagePreview = <Text>No image taken yet.</Text>;
  if (pickimage) {
    imagePreview = <Image source={{ uri: pickimage }} style={styles.image} />;
  }
  
  return(
    <View>
      <View style={styles.imagePreview}>
        {imagePreview}
      </View>
      <OutlineButton icon="camera" onPress={takeImageHandler}>Take Image</OutlineButton>
    </View>

  );
}

const styles = StyleSheet.create({
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 8,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: Colors.primary100,
    borderRadius: 4,
    overflow: 'hidden',
  },
  image: {
    width: '100%',
    height: '100%',
  },
});

