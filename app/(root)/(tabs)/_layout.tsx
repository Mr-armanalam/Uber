import { icons } from "@/constants";
import { Tabs } from "expo-router";
import { Image, ImageSourcePropType, View } from "react-native";

const TabIcon = ({focused, source}:{
  source: ImageSourcePropType,
  focused: boolean
}) => (
  <View className={`flex w-14 h-14 my-auto flex-row justify-center items-center rounded-full ${focused ? 'bg-general-300': ''} `}>
    <View className={`rounded-full w-12 h-12 items-center justify-center ${focused ? 'bg-general-400' : ''}`}>
      <Image source={source} tintColor={'white'} resizeMode="contain" className="w-7 h-7" />
    </View>
  </View>
);

const Layout = () => {
  return (
    <Tabs
      initialRouteName="home"
      screenOptions={{
        tabBarActiveTintColor: "white",
        tabBarInactiveTintColor: "white",
        tabBarShowLabel: false,
        tabBarStyle: {
          backgroundColor: '#333333',
          borderRadius: 50,
          paddingBottom: 0,
          overflow: 'hidden',
          marginHorizontal: 20,
          marginBottom: 20,
          height: 60,
          display: 'flex',
          justifyContent: 'space-between',
          flexDirection: 'row',
          // alignItems: 'center',
          position: 'absolute',
        }
      }}
    >
      <Tabs.Screen
        name="home"
        options={{
          title: "Home",
          tabBarIcon: ({focused}: { focused: boolean }) => <TabIcon focused={focused} source={icons.home} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="rides"
        options={{
          title: "Rides",
          tabBarIcon: ({focused}: { focused: boolean }) => <TabIcon focused={focused} source={icons.list} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="chat"
        options={{
          title: "Chat",
          tabBarIcon: ({focused}: { focused: boolean }) => <TabIcon focused={focused} source={icons.chat} />,
          headerShown: false,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          title: "Profile",
          tabBarIcon: ({focused}: { focused: boolean }) => <TabIcon focused={focused} source={icons.profile} />,
          headerShown: false,
        }}
      />
    </Tabs>
  );
};
export default Layout;
