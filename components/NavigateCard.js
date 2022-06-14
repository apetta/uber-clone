import {
  StyleSheet,
  Text,
  View,
  SafeAreaView,
  Image,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import tw from "twrnc";
import { useDispatch } from "react-redux";
import { setDestination } from "../slices/navSlice";
import { useNavigation } from "@react-navigation/native";
import NavFavourites from "./NavFavourites";
import { Icon } from "react-native-elements";
import { useRef } from "react";

const NavigateCard = () => {
  const dispatch = useDispatch(setDestination);
  const navigation = useNavigation();
  const destinationInputhRef = useRef();

  const setFavouriteAsDestination = (description) => {
    destinationInputhRef?.current.setAddressText(description);
    destinationInputhRef?.current.focus();
  };

  return (
    <SafeAreaView style={tw`bg-white flex-1`}>
      <View style={tw`border-t border-gray-200 flex-shrink z-50`}>
        <View>
          <GooglePlacesAutocomplete
            ref={destinationInputhRef}
            styles={inputBoxStyles}
            placeholder="Where to?"
            debounce={400}
            fetchDetails={true}
            returnKeyType="search"
            minLength={2}
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAPS_API_KEY,
              language: "en",
            }}
            nearbyPlacesAPI="GooglePlacesSearch"
            onPress={(data, details = null) => {
              dispatch(
                setDestination({
                  location: details.geometry.location,
                  description: data.description,
                })
              );
              navigation.navigate("RideOptionsCard");
            }}
          />
        </View>
        <NavFavourites clickHandler={setFavouriteAsDestination} />
      </View>
      <View
        style={tw`flex-row justify-evenly py-5 mt-auto border-t border-gray-100`}
      >
        <TouchableOpacity
          onPress={() => navigation.navigate("RideOptionsCard")}
          style={tw`flex flex-row bg-black w-24 px-4 py-3 rounded-full border border-black justify-between`}
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text style={tw`text-white text-center`}>Rides</Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={tw`flex flex-row justify-evenly w-24 px-4 py-3 rounded-full border border-black `}
        >
          <Icon
            name="fast-food-outline"
            type="ionicon"
            color="black"
            size={16}
          />
          <Text style={tw`text-center`}>Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};
export default NavigateCard;
const inputBoxStyles = StyleSheet.create({
  container: {
    backgroundColor: "white",
    paddingTop: 20,
    flex: 0,
  },
  textInput: {
    backgroundColor: "rgb(229, 231, 235 )",
    borderRadius: 0,
    fontSize: 18,
  },
  textInputContainer: {
    paddingHorizontal: 20,
    paddingBottom: 10,
    zIndex: 3,
    elevation: 3,
  },
});
