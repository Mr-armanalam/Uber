import CustomButton from "@/components/CustomButton";
import GoogleTextInput from "@/components/GoogleTextInput";
import RideLayout from "@/components/RideLayout";
import { icons } from "@/constants";
import { useLocationStore } from "@/store";
import { router } from "expo-router";
import { Text, View } from "react-native";

const FindRide = () => {
  const {
    userAddress,
    destinationAddress,
<<<<<<< HEAD
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();
=======
    destinationLatitude,
    destinationLongitude,
    setDestinationLocation,
    setUserLocation,
  } = useLocationStore();
  
>>>>>>> 4ecd12e1b2b9a2b9985ac5bb2c37aac4178dac71
  return (
    <RideLayout title="Ride" snapPoints={['85%']}>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">From</Text>
        <GoogleTextInput
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          icon={icons.target}
          initialLocation={userAddress!}
          handlePress={(location) => setUserLocation(location)}
        />
      </View>
      <View className="my-3">
        <Text className="text-lg font-JakartaSemiBold mb-3">To</Text>
        <GoogleTextInput
          containerStyle="bg-neutral-100"
          textInputBackgroundColor="#f5f5f5"
          icon={icons.map}
          initialLocation={destinationAddress!}
          handlePress={(location) => setDestinationLocation(location)}
        />
      </View>

      <CustomButton
        title="Find Now"
        onPress={() => router.push('/(root)/confirm-ride')} className="mt-5"
      />
    </RideLayout>
  );
};

export default FindRide;
