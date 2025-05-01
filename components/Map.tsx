<<<<<<< HEAD
import { View, Text } from "react-native";
import React, { useEffect, useState } from "react";
import MapView, { Marker, PROVIDER_DEFAULT } from "react-native-maps";
import { useDriverStore, useLocationStore } from "@/store";
import { calculateRegion, generateMarkersFromData } from "@/lib/map";
import { MarkerData } from "@/types/type";
import { icons } from "@/constants";

const drivers = [
  {
      "id": "1",
      "first_name": "James",
      "last_name": "Wilson",
      "profile_image_url": "https://ucarecdn.com/dae59f69-2c1f-48c3-a883-017bcf0f9950/-/preview/1000x666/",
      "car_image_url": "https://ucarecdn.com/a2dc52b2-8bf7-4e49-9a36-3ffb5229ed02/-/preview/465x466/",
      "car_seats": 4,
      "rating": "4.80"
  },
  {
      "id": "2",
      "first_name": "David",
      "last_name": "Brown",
      "profile_image_url": "https://ucarecdn.com/6ea6d83d-ef1a-483f-9106-837a3a5b3f67/-/preview/1000x666/",
      "car_image_url": "https://ucarecdn.com/a3872f80-c094-409c-82f8-c9ff38429327/-/preview/930x932/",
      "car_seats": 5,
      "rating": "4.60"
  },
  {
      "id": "3",
      "first_name": "Michael",
      "last_name": "Johnson",
      "profile_image_url": "https://ucarecdn.com/0330d85c-232e-4c30-bd04-e5e4d0e3d688/-/preview/826x822/",
      "car_image_url": "https://ucarecdn.com/289764fb-55b6-4427-b1d1-f655987b4a14/-/preview/930x932/",
      "car_seats": 4,
      "rating": "4.70"
  },
  {
      "id": "4",
      "first_name": "Robert",
      "last_name": "Green",
      "profile_image_url": "https://ucarecdn.com/fdfc54df-9d24-40f7-b7d3-6f391561c0db/-/preview/626x417/",
      "car_image_url": "https://ucarecdn.com/b6fb3b55-7676-4ff3-8484-fb115e268d32/-/preview/930x932/",
      "car_seats": 4,
      "rating": "4.90"
  }
];

const Map = () => {
  const { selectedDriver, setDrivers } = useDriverStore();
  const [markers, setMarkers] = useState<MarkerData[]>([]);
=======
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
>>>>>>> 4ecd12e1b2b9a2b9985ac5bb2c37aac4178dac71
  const {
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
<<<<<<< HEAD
    userAddress
  } = useLocationStore();
  
=======
    destinationAddress,
    userAddress,
  } = useLocationStore();
>>>>>>> 4ecd12e1b2b9a2b9985ac5bb2c37aac4178dac71

  const region = calculateRegion({
    userLatitude,
    userLongitude,
    destinationLatitude,
    destinationLongitude,
  });

  useEffect(() => {
<<<<<<< HEAD
    //TODO: REMOVE
    setDrivers(drivers);
    if (Array.isArray(drivers)) {
      if (!userLatitude || !userLongitude) return;

      const newMarkers = generateMarkersFromData({data: drivers, userLatitude, userLongitude});
      setMarkers(newMarkers);
    }
  },[drivers])
=======
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

>>>>>>> 4ecd12e1b2b9a2b9985ac5bb2c37aac4178dac71
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
<<<<<<< HEAD
          image={selectedDriver === marker.id ? icons.selectedMarker : icons.marker}
        >

        </Marker>
      ))}
=======
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
        </>
      )}
>>>>>>> 4ecd12e1b2b9a2b9985ac5bb2c37aac4178dac71
    </MapView>
  );
};

export default Map;
