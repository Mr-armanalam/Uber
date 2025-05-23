import { Driver, MarkerData } from "@/types/type";

<<<<<<< HEAD
const directionsAPI = process.env.EXPO_PUBLIC_GOOGLE_API_KEY;

export const generateMarkersFromData = ({
=======
const API_KEY = process.env.EXPO_PUBLIC_GOMAP_API_KEY;

export const generateMarkersFromData = async ({
>>>>>>> 4ecd12e1b2b9a2b9985ac5bb2c37aac4178dac71
  data,
  userLatitude,
  userLongitude,
}: {
  data: Driver[];
  userLatitude: number;
  userLongitude: number;
<<<<<<< HEAD
}): MarkerData[] => {
  return data.map((driver) => {
    const latOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005
    const lngOffset = (Math.random() - 0.5) * 0.01; // Random offset between -0.005 and 0.005

    return {
      latitude: userLatitude + latOffset,
      longitude: userLongitude + lngOffset,
      title: `${driver.first_name} ${driver.last_name}`,
      ...driver,
    };
  });
};

=======
}): Promise<MarkerData[]> => {

  const results = await Promise.all(
    data.map(async (driver) => {
      const latOffset = (Math.random() - 0.5) * 0.01;
      const lngOffset = (Math.random() - 0.5) * 0.01;

      const latitude = userLatitude + latOffset;
      const longitude = userLongitude + lngOffset;

      let markerAddress = '';
      let placeId = '';

      try {
        const response = await fetch(
          `https://maps.gomaps.pro/maps/api/place/nearbysearch/json?location=${latitude},${longitude}&radius=1000&key=${API_KEY}`
        );
        const json = await response.json();
        const place = json.results?.[0] || json.results?.[0];
        if (place) {
          markerAddress = place.vicinity || '';
          placeId = place.place_id || '';
        }
      } catch (error) {
        console.error('Error fetching place:', error);
      }

      return {
        latitude,
        longitude,
        markerAddress,
        placeId,
        title: `${driver.first_name} ${driver.last_name}`,
        ...driver,
      };
    })
  );

  return results;
};


>>>>>>> 4ecd12e1b2b9a2b9985ac5bb2c37aac4178dac71
export const calculateRegion = ({
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude?: number | null;
  destinationLongitude?: number | null;
}) => {
  if (!userLatitude || !userLongitude) {
    return {
      latitude: 37.78825,
      longitude: -122.4324,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  if (!destinationLatitude || !destinationLongitude) {
    return {
      latitude: userLatitude,
      longitude: userLongitude,
      latitudeDelta: 0.01,
      longitudeDelta: 0.01,
    };
  }

  const minLat = Math.min(userLatitude, destinationLatitude);
  const maxLat = Math.max(userLatitude, destinationLatitude);
  const minLng = Math.min(userLongitude, destinationLongitude);
  const maxLng = Math.max(userLongitude, destinationLongitude);

  const latitudeDelta = (maxLat - minLat) * 1.3; // Adding some padding
  const longitudeDelta = (maxLng - minLng) * 1.3; // Adding some padding

  const latitude = (userLatitude + destinationLatitude) / 2;
  const longitude = (userLongitude + destinationLongitude) / 2;

  return {
    latitude,
    longitude,
    latitudeDelta,
    longitudeDelta,
  };
};

export const calculateDriverTimes = async ({
  markers,
<<<<<<< HEAD
=======
  userAddress,
  destinationAddress,
>>>>>>> 4ecd12e1b2b9a2b9985ac5bb2c37aac4178dac71
  userLatitude,
  userLongitude,
  destinationLatitude,
  destinationLongitude,
}: {
  markers: MarkerData[];
  userLatitude: number | null;
  userLongitude: number | null;
  destinationLatitude: number | null;
  destinationLongitude: number | null;
<<<<<<< HEAD
=======
  userAddress: string | null;
  destinationAddress: string | null;
>>>>>>> 4ecd12e1b2b9a2b9985ac5bb2c37aac4178dac71
}) => {
  if (
    !userLatitude ||
    !userLongitude ||
    !destinationLatitude ||
    !destinationLongitude
  )
    return;

  try {
    const timesPromises = markers.map(async (marker) => {
<<<<<<< HEAD
      const responseToUser = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${marker.latitude},${marker.longitude}&destination=${userLatitude},${userLongitude}&key=${directionsAPI}`
      );
      const dataToUser = await responseToUser.json();
      const timeToUser = dataToUser.routes[0].legs[0].duration.value; // Time in seconds

      const responseToDestination = await fetch(
        `https://maps.googleapis.com/maps/api/directions/json?origin=${userLatitude},${userLongitude}&destination=${destinationLatitude},${destinationLongitude}&key=${directionsAPI}`
=======
      // console.log(marker.markerAddress);
      
      const responseToUser = await fetch(
        `https://maps.gomaps.pro/maps/api/directions/json?destination=${userAddress}&origin=${marker.markerAddress}&key=${API_KEY}`
      );      
      
      const dataToUser = await responseToUser.json();
      const timeToUser = dataToUser.routes[0].legs[0].duration.value; // Time in seconds      

      const responseToDestination = await fetch(
        `https://maps.gomaps.pro/maps/api/directions/json?destination=${userAddress}&origin=${destinationAddress}&key=${API_KEY}`
>>>>>>> 4ecd12e1b2b9a2b9985ac5bb2c37aac4178dac71
      );
      const dataToDestination = await responseToDestination.json();
      const timeToDestination =
        dataToDestination.routes[0].legs[0].duration.value; // Time in seconds

      const totalTime = (timeToUser + timeToDestination) / 60; // Total time in minutes
<<<<<<< HEAD
      const price = (totalTime * 0.5).toFixed(2); // Calculate price based on time
=======
      const price = (totalTime * 0.5).toFixed(2); // Calculate price based on time      
>>>>>>> 4ecd12e1b2b9a2b9985ac5bb2c37aac4178dac71

      return { ...marker, time: totalTime, price };
    });

    return await Promise.all(timesPromises);
  } catch (error) {
    console.error("Error calculating driver times:", error);
  }
};
