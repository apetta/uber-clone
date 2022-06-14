import "intl";
import "intl/locale-data/jsonp/en";
import { useNavigation } from "@react-navigation/native";
import { useState } from "react";
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  TouchableOpacity,
  FlatList,
  Image,
} from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import tw from "twrnc";
import { selectTravelTimeInfo } from "../slices/navSlice";

const data = [
  {
    id: 1,
    title: "Uber X",
    multiplier: 1,
    image: "https://bit.ly/3NMZv9m",
  },
  {
    id: 2,
    title: "Uber XL",
    multiplier: 1.3,
    image: "https://bit.ly/3MNq8JN",
  },
  {
    id: 3,
    title: "Uber LUX",
    multiplier: 1.75,
    image: "https://bit.ly/3aNfkhs",
  },
];

const baseRate = 1.5;
const surcharge = 1.25;

const RideOptionsCard = () => {
  const navigation = useNavigation();
  const [selected, setSelected] = useState(null);
  const travelTimeInfo = useSelector(selectTravelTimeInfo);

  return (
    <SafeAreaView style={tw`bg-white flex-grow h-[100%]`}>
      <View>
        <TouchableOpacity
          style={tw`absolute top-3 left-5 p-3 z-50 rounded-full`}
          onPress={() => navigation.navigate("NavigateCard")}
        >
          <Icon type="fontawesome" name="chevron-left" />
        </TouchableOpacity>
        <Text style={tw`text-center py-5 text-xl`}>
          Select a Ride - {travelTimeInfo?.distance?.text}
        </Text>
      </View>

      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, title, multiplier, image }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            style={tw`flex-row justify-between items-center px-2 ${
              id === selected?.id ? "bg-gray-200" : ""
            }`}
          >
            <Image
              source={{ uri: image }}
              style={{
                width: 100,
                height: 100,
                resizeMode: "contain",
              }}
            />
            <View style={tw`-ml-6`}>
              <Text style={tw`text-xl font-semibold`}>{title}</Text>
              <Text>{travelTimeInfo?.duration?.text} Travel Time</Text>
            </View>
            <Text style={tw`text-xl`}>
              {new Intl.NumberFormat("en-gb", {
                style: "currency",
                currency: "GBP",
              }).format(
                (travelTimeInfo &&
                  (travelTimeInfo?.duration?.value * baseRate * multiplier) /
                    100) ||
                  ""
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View style={tw`border-t border-gray-200`}>
        <TouchableOpacity
          disabled={!selected}
          style={tw`bg-black rounded-lg py-3 m-3 ${!selected ? "hidden" : ""}`}
        >
          <Text style={tw`text-center text-white text-xl`}>
            Choose {selected?.title}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default RideOptionsCard;
const styles = StyleSheet.create({});
