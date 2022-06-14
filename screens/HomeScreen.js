import { Image, StyleSheet, Text, View } from "react-native";
import { SafeAreaView } from "react-native";
import tw from "twrnc";
import NavOptions from "../components/NavOptions";
import { GooglePlacesAutocomplete } from "react-native-google-places-autocomplete";
import { GOOGLE_MAPS_API_KEY } from "@env";
import { useDispatch, useSelector } from "react-redux";
import { selectOrigin, setDestination, setOrigin } from "../slices/navSlice";
import NavFavourites from "../components/NavFavourites";
import { useRef } from "react";

const HomeScreen = () => {
  const dispatch = useDispatch();
  const origin = useSelector(selectOrigin);
  const originInputRef = useRef();

  const setFavouriteAsOrigin = (description) => {
    originInputRef?.current.setAddressText(description);
    originInputRef?.current.focus();
  };

  return (
    <SafeAreaView style={tw`bg-white h-full`}>
      <View style={tw`p-5 pt-20`}>
        <Image
          style={{
            width: 100,
            height: 50,
            resizeMode: "contain",
          }}
          source={{
            uri: "https://bit.ly/3xrAl90",
          }}
        />
        <Text style={tw`pt-5 pb-5 text-3xl`}>Welcome Back</Text>

        <GooglePlacesAutocomplete
          ref={originInputRef}
          styles={{
            container: {
              flex: 0,
            },
            textInput: {
              fontSize: 18,
            },
          }}
          onPress={(data, details = null) => {
            dispatch(
              setOrigin({
                location: details.geometry.location,
                description: data.description,
              })
            );

            dispatch(setDestination(null));
          }}
          fetchDetails={true}
          returnKeyType={"search"}
          enablePoweredByContainer={false}
          minLength={2}
          query={{
            key: GOOGLE_MAPS_API_KEY,
            language: "en",
          }}
          placeholder="Where From?"
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
        />

        <NavOptions />
        <NavFavourites clickHandler={setFavouriteAsOrigin} />
      </View>
    </SafeAreaView>
  );
};
export default HomeScreen;
const styles = StyleSheet.create({});
