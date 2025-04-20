import { View, Text, ActivityIndicator } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, Polyline, PROVIDER_DEFAULT } from "react-native-maps";
import { useDriverStore, useLocationStore } from "@/store";
import MapViewDirection from "react-native-maps-directions";
import {
  calculateDriverTimes,
  calculateRegion,
  generateMarkersFromData,
} from "@/lib/map";
import { Driver, MarkerData } from "@/types/type";
import { icons } from "@/constants";
import { decodePolyline, useFetch } from "@/lib/fetch";

const Map = () => {
  const { data: drivers, loading, error } = useFetch<Driver[]>("/(api)/driver");

  const { selectedDriver, setDrivers } = useDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);
  const [routeCoordinates, setRouteCoordinates] = useState<
    { latitude: number; longitude: number }[]
  >([]);
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
    destinationAddress,
    userAddress,
  } = useLocationStore();

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  useEffect(() => {
    const fetchMarkers = async () => {
      if (!userLatitude || !userLongitude || !Array.isArray(drivers)) return;

      const newMarkers = await generateMarkersFromData({
        data: drivers,
        userLatitude,
        userLongitude,
      });

      setMarkers(newMarkers);
    };

    fetchMarkers();
  }, [drivers, userLatitude, userLongitude]);

  useEffect(() => {
    if (markers.length > 0 && destinationLatitude && destinationLongitude) {
      calculateDriverTimes({
        markers,
        userLatitude,
        userLongitude,
        userAddress,
        destinationAddress,
        destinationLatitude,
        destinationLongitude,
      }).then((drivers) => {
        setDrivers(drivers as MarkerData[]);
      });
    }
  }, [markers, destinationLatitude, destinationLongitude]);

  const fetchRoute = async () => {
    const origin = `${userLatitude},${userLongitude}`;
    const destination = `${destinationLatitude},${destinationLongitude}`;

    const response = await fetch(
      `https://maps.gomaps.pro/maps/api/directions/json?origin=${origin}&destination=${destination}&key=${process.env.EXPO_PUBLIC_GOMAP_API_KEY}`
    );

    const json = await response.json();

    const points = json.routes[0]?.overview_polyline?.points;

    if (!points) return;

    const decodedCoordinates = decodePolyline(points); // You’ll need this
    setRouteCoordinates(decodedCoordinates);
  };

  useEffect(() => {
    const getRoute = async () => {
      if (!userAddress || !destinationAddress) return;
      await fetchRoute();
    };

    getRoute();
  }, [userAddress, destinationAddress]);

  if (loading || !userLatitude || !userLongitude) {
    return (
      <View className="flex justify-between items-center w-full">
        <ActivityIndicator size={"small"} color={"#000"} />
      </View>
    );
  }
  if (error) {
    return (
      <View className="flex justify-between items-center w-full">
        <Text> Error: {error}</Text>
      </View>
    );
  }

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
      {markers.map((marker) => (
        <Marker
          key={marker.id}
          coordinate={{
            latitude: marker.latitude,
            longitude: marker.longitude,
          }}
          title={marker.title}
          description={`${marker.first_name} ${marker.last_name}`}
          image={
            selectedDriver === marker.id ? icons.selectedMarker : icons.marker
          }
        ></Marker>
      ))}
      {destinationLatitude && destinationLongitude && (
        <>
          {routeCoordinates.length > 0 && (
            <Polyline
              coordinates={routeCoordinates}
              strokeColor="#0286FF"
              strokeWidth={4}
            />
          )}
          <Marker
            key={"destination"}
            coordinate={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            title="Destination"
            image={icons.pin}
          />

          {/* <MapViewDirection
            origin={{
              latitude: userLatitude,
              longitude: userLongitude,
            }}
            destination={{
              latitude: destinationLatitude,
              longitude: destinationLongitude,
            }}
            apikey={process.env.EXPO_PUBLIC_GOOGLE_API_KEY!}
            strokeColor="#0286FF"
            strokeWidth={2}
          /> */}
        </>
      )}
      {/* <Polyline
        coordinates={routeCoordinates}
        strokeWidth={3}
        strokeColor="#0286FF"
      /> */}
    </MapView>
  );
};

export default Map;
