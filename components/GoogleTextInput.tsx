import { icons } from "@/constants";
import { GoogleInputProps } from "@/types/type";
import React, { useState, useEffect } from "react";
import {
  View,
  TextInput,
  FlatList,
  Text,
  TouchableOpacity,
  Image,
} from "react-native";

interface suggesstionprops {
  place_id: string;
  description: string;
}

const GoogleTextInput = ({
  icon,
  containerStyle,
  handlePress,
  initialLocation,
  textInputBackgroundColor,
}: GoogleInputProps) => {
  const [input, setInput] = useState("");
  const [suggestions, setSuggestions] = useState<suggesstionprops[] | []>([]);

  const goMapApiKey = process.env.EXPO_PUBLIC_GOMAP_API_KEY;

  useEffect(() => {
    const fetchSuggestions = async () => {
      if (input.length === 0) {
        setSuggestions([]);
        return;
      }
      if (input.length < 3) return;

      try {
        const response = await fetch(
          `https://maps.gomaps.pro/maps/api/place/queryautocomplete/json?input=${input}&offset=3&language=en&key=${goMapApiKey}`
        );
        const data = await response.json();
        setSuggestions(data.predictions || []);
      } catch (err) {
        console.error("Error fetching Ola locations:", err);
      }
    };

    const debounce = setTimeout(fetchSuggestions, 300); // debounced
    return () => clearTimeout(debounce);
  }, [input]);

  return (
    <View className={`bg-transparent rounded-lg ${containerStyle} justify-center`}>
      <TextInput
        value={input}
        onChangeText={setInput}
        placeholder={initialLocation ?? "Where do you want to go?"}
        placeholderTextColor="gray"
        style={{
          backgroundColor: textInputBackgroundColor || "white",
          padding: 12,
          elevation: 2, // for Android shadow
          shadowOffset: { width: 1, height: 2 },
          paddingLeft: 35,
          borderTopLeftRadius: 10,
          borderTopRightRadius: 10,
          position: "relative",
          borderBottomLeftRadius: suggestions.length > 0 ? 0 : 10,
          borderBottomRightRadius: suggestions.length > 0 ? 0 : 10,
        }}
      />
      {suggestions.length > 0 && (
        <>
          <FlatList
            style={{
              backgroundColor: "white",
              borderBottomRightRadius: 10,
              borderBottomLeftRadius: 10,
              shadowOpacity: 0.1,
              shadowRadius: 2,
              // maxHeight: 100,
              paddingHorizontal: 10,
              paddingBottom: input ? 10 : 0,
              overflowY: "auto",
            }}
            contentContainerStyle={{
              paddingVertical: 10,
            }}
            data={suggestions}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <TouchableOpacity
                onPress={async () => {
                  const response = await fetch(
                    `https://maps.gomaps.pro/maps/api/place/details/json?place_id=${item.place_id}&key=${goMapApiKey}`
                  );
                  const data = await response.json();
                  handlePress({
                    latitude: data?.result.geometry.location.lat,
                    longitude: data?.result.geometry.lng,
                    address: data?.result.formatted_address,
                  });
                  setSuggestions([]);
                }}
              >
                <Text className="line-clamp-1 my-2 p-5 bg-gray-50 rounded-lg">
                  {item.description}
                </Text>
              </TouchableOpacity>
            )}
          />
          <Text
            onPress={() => {
              setInput("");
              setSuggestions([]);
            }}
            className=" justify-center absolute right-3 top-3 items-center w-6 h-6"
          >
            ❌
          </Text>
        </>
      )}
      <View className="absolute left-3 top-3 w-6 h-6">
        <Image
          source={icon ?? icons.search}
          resizeMode="contain"
          className="w-6 h-6"
          alt="search"
        />
      </View>
    </View>
  );
};

export default GoogleTextInput;
