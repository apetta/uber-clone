import { useNavigation } from "@react-navigation/native";
import { View, Text, FlatList, TouchableOpacity, Image } from "react-native";
import { Icon } from "react-native-elements";
import { useSelector } from "react-redux";
import tw from "twrnc";
import { selectOrigin } from "../slices/navSlice";

const data = [
  {
    id: 1,
    title: "Get a ride",
    image: "https://bit.ly/3NXoDtO",
    screen: "MapScreen",
  },
  {
    id: 2,
    title: "Order food",
    image: "https://bit.ly/3zwuK3Y",
    screen: "EatsScreen",
  },
];

const NavOptions = () => {
  const navigation = useNavigation();
  const origin = useSelector(selectOrigin);

  return (
    <FlatList
      contentContainerStyle={tw`flex-1 justify-evenly`}
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          disabled={!origin}
          onPress={() =>
            item?.screen === "MapScreen" && navigation.navigate(item.screen)
          }
          style={tw`p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-auto`}
        >
          <View style={!origin && tw`${"opacity-20"}`}>
            <Image
              style={{ width: 120, height: 120, resizeMode: "contain" }}
              source={{ uri: item.image }}
            />
            <Text style={tw`mt-2 text-lg font-semibold`}>{item.title}</Text>
            <Icon
              style={tw`p-2 bg-black rounded-full w-10 mt-4`}
              type="antdesign"
              name="arrowright"
              color="white"
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};
export default NavOptions;
