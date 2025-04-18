import { View, Text } from "react-native";
import React from "react";
import MapView, { PROVIDER_DEFAULT } from "react-native-maps";
import { useLocationStore } from "@/store";
import { calculateRegion } from "@/lib/map";

const Map = () => {
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
    userAddress
  } = useLocationStore();

  console.log(userLatitude, userLongitude, destinationLatitude, destinationLongitude,userAddress);
  

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });
  return (
    <MapView
      provider={PROVIDER_DEFAULT}
      tintColor="black"
      mapType="standard"
      style={{ width: "100%", height: "100%", borderRadius: 10 }}
      showsPointsOfInterest={false}
      initialRegion={region}
      showsUserLocation={true}
      userInterfaceStyle="light"
    >
      <Text>Map</Text>
    </MapView>
  );
};

export default Map;
