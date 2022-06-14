import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import { Icon } from "react-native-elements";
import tw from "twrnc";

const NavFavourites = ({ clickHandler }) => {
  const data = [
    {
      id: 1,
      icon: "home",
      location: "Home",
      destination: "Buckingham Palace, London, UK",
    },
    {
      id: 2,
      icon: "briefcase",
      location: "Work",
      destination: "Shoreditch, London, UK",
    },
  ];
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View style={tw`bg-gray-200 h-[0.5px]`} />}
      renderItem={({ item: { location, destination, icon } }) => (
        <TouchableOpacity
          onPress={() => clickHandler && clickHandler(destination)}
          style={tw`flex-row items-center p-5`}
        >
          <Icon
            style={tw`mr-4 rounded-full bg-gray-300 p-3`}
            name={icon}
            type="ionicon"
            color="white"
            size={18}
          />
          <View>
            <Text style={tw`text-lg font-semibold`}>{location}</Text>
            <Text style={tw`text-gray-500`}>{destination}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};
export default NavFavourites;
const styles = StyleSheet.create({});
