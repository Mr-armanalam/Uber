import { View, Text, FlatList } from 'react-native'
import React from 'react'
import RideLayout from '@/components/RideLayout'
import DriverCard from '@/components/DriverCard';
import CustomButton from '@/components/CustomButton';
import { router } from 'expo-router';
import { useDriverStore } from '@/store';

const ConfirmRide = () => {
  const { drivers, selectedDriver, setSelectedDriver} = useDriverStore();
<<<<<<< HEAD
=======
  // console.log(drivers);
  
>>>>>>> 4ecd12e1b2b9a2b9985ac5bb2c37aac4178dac71
  return (
    <RideLayout title='Choose a Driver' snapPoints={['65%', '85%']}>
      <FlatList 
        data={drivers}
        renderItem={({ item }) => (
<<<<<<< HEAD
          <DriverCard selected={selectedDriver!} setSelected={() => setSelectedDriver(item.id)}  item={item} />
=======
          <DriverCard selected={selectedDriver!} setSelected={() => setSelectedDriver(Number(item.id))} item={item} />
>>>>>>> 4ecd12e1b2b9a2b9985ac5bb2c37aac4178dac71
        )}
        ListFooterComponent={() => (
          <View className='mx-5 mt-10'>
            <CustomButton title='Select Ride' onPress={() => router.push('/(root)/book-ride')} />
          </View>
        )}
      />
    </RideLayout>
  )
}

export default ConfirmRide