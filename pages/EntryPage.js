import React, { useState, useEffect } from "react";
import {
  TouchableWithoutFeedback,
  Keyboard,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Button,
  TextInput,
  TouchableOpacity,
  Touchable,
  Image,
  Alert,
  Linking,
  Vibration,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage"
import { useNavigation } from "@react-navigation/core";
import { ToggleButton } from "react-native-paper";
import axios from "axios";

export default function EntryPage({ route }) {
  // States
  const { asset } = route.params;
  const [name, setName] = useState("");
  const [assetNumber, setAssetNumber] = useState(asset);
  const [color, setColor] = useState("");

  // Global Variables
  const navigation = useNavigation();
  const today = new Date();
  const date = today.getDate();
  const day = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'][today.getDay()]
  const month = today.getMonth() + 1;
  const year = today.getFullYear();
  const dateString = `${date}/${month}/${year}, ${day}`
  const googleScriptUrl = 'https://script.google.com/macros/s/AKfycbwSTWH1DtapgasmuR_OKVkOgil0U-dzoiCKmqCCuw6M8tpn6C14W9v9hvnVMHzFQ7Qx5g/exec';

  //=========================================================================//
  // useEffect:
  //-------------------------------------------------------------------------//
  // Runs when this page opens.
  // Sets asset number from the Scan Page.
  //=========================================================================//
  useEffect(() => {
    const { asset } = route.params;
    setAssetNumber(asset);
    getUsername();
  }, [route])

  //=========================================================================//
  // setUsername:
  //-------------------------------------------------------------------------//
  // Saves the user's name to local storage.
  //=========================================================================//
  const setUsername = (value) => {
    AsyncStorage.setItem('username', value).then(() => console.log('Username set'))
  }
  
  //=========================================================================//
  // getUsername:
  //-------------------------------------------------------------------------//
  // Sets the name input field to the user's name saved in local storage.
  //=========================================================================//
  const getUsername = () => {
    AsyncStorage.getItem('username').then((value) => setName(value))
  }

  //=========================================================================//
  // submitAlert:
  //-------------------------------------------------------------------------//
  // Prompted when the user presses submit.
  // Presents current information for confirmation and warns user when
  // information is missing.
  //=========================================================================//
  const submitAlert = () => {
    if (name != "" && assetNumber != null && assetNumber != "" && color != "") {
      Alert.alert(
        "Is the data correct?",
        "Name: " + name + "\nAsset Number: " + assetNumber + "\nColor: " + color,
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Submit",
            onPress: () => submit(),
            style: "default"
          }
        ]
      )
      } else {
        Alert.alert(
          "Missing Information",
          "Fill in the blank fields.",
          [
            {
              text: "Okay",
              style: "default"
            }
          ]
        )
      }
  }

  //=========================================================================//
  // noSheetAlert:
  //-------------------------------------------------------------------------//
  // Prompted when the application recieves and 404 error from the Google
  // Apps Script.
  // Allows the user to automatically add the appropriate sheets to the
  // main spreadheet or ignore the warning in case the user thinks they
  // have made a mistake.
  //=========================================================================//
  const noSheetAlert = (type) => {
    Alert.alert(
      "No User Sheet Found",
      "Please add a sheet for this user.",
      [
        {
          text: "Okay",
          style: "cancel"
        },
        {
          text: "Add Sheet",
          onPress: () => addSheet(),
          style: "default",
        }
      ]
    )
  }

  //=========================================================================//
  // noSheetAlert:
  //-------------------------------------------------------------------------//
  // Prompted when the application recieves and 404 error from the Google
  // Apps Script.
  // Allows the user to automatically add the appropriate sheets to the
  // main spreadheet or ignore the warning in case the user thinks they
  // have made a mistake.
  //=========================================================================//
  const duplicateEntryAlert = (type) => {
    Alert.alert(
      "Duplicate Entry",
      "This asset number was already entered.",
      [
        {
          text: "Okay",
          style: "default"
        }
      ]
    )
  }

  //=========================================================================//
  // addSheet:
  //-------------------------------------------------------------------------//
  // Handles the url post to add the new sheets for the user.
  // Prompts the user that the sheets and new information was successfully
  // added.
  //
  // Look at the Google Sheet Apps Script for further information.
  //=========================================================================//
  const addSheet = () => {
    const url = `${googleScriptUrl}?name=${name}&date=${dateString}&assetNumber=${assetNumber}&color=${color}&method=addSheet`;
    axios
      .post(url)
      .then((res) => {
        console.log(res.data);
        clear();
        Alert.alert("Sheets and Information Added","",[{text:"Okay",style:"default"}]);
      })
      .catch((err) => console.log(err))
  }

  //=========================================================================//
  // submit:
  //-------------------------------------------------------------------------//
  // Handles the url post to add the new information for the user.
  // Prompts the user that the new information was successfully
  // added.
  //
  // Look at the Google Sheet Apps Script for further information.
  //=========================================================================//
  const submit = () => {
    const url = `${googleScriptUrl}?name=${name}&date=${dateString}&assetNumber=${assetNumber}&color=${color}&method=addData`;
    axios
      .post(url)
      .then((res) => {
        console.log(res.data);
        if (res.data.status == 404) {
          Vibration.vibrate([0,200,200,200], false);
          noSheetAlert();
        } else if (res.data.status == 400) {
          Vibration.vibrate([0,200,200,200], false);
          duplicateEntryAlert();
        } else {
          clear();
          Alert.alert("Information Added","",[{text:"Okay",style:"default"}]);
        }
      })
      .catch((err) => console.log(err))
  }

  //=========================================================================//
  // clear:
  //-------------------------------------------------------------------------//
  // Clears all the text fields except the user's name for ease of use.
  //=========================================================================//
  const clear = () => {
    setUsername(name);
    setAssetNumber("");
    setColor("");
    Vibration.vibrate(200, false);
  }

  //=========================================================================//
  // scan:
  //-------------------------------------------------------------------------//
  // Opens the Scan Page.
  //=========================================================================//
  const scan = () => {
    setUsername(name);
    navigation.navigate("Scanner");
  }

  //=========================================================================//
  // settings:
  //-------------------------------------------------------------------------//
  // Opens the Settings Page.
  //=========================================================================//
  const settings = () => {
    navigation.navigate("Settings");
  }

  return (
    <SafeAreaView style={styles.container}>

      {/* Settings Button > */}
      <View style={{ width: "100%", height: 45, padding: 0, flexDirection: 'row', margin: 20, borderRadius: 10}}>
        <View style={{ flex: 6 }}>
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={{ padding: "10%" }} onPress={settings}>
            <Image source={require('../assets/settings.png')} style={{ height: "100%", aspectRatio: 1 }} />
          </TouchableOpacity>
        </View>
      </View>
      {/* < */}

      {/* Name Text Input > */}
      <TextInput
        style={[styles.input, { marginTop: 70 }]}
        label="Name"
        placeholder="Name"
        placeholderTextColor="grey"
        value={name}
        onChangeText={setName}
      />
      {/* < */}

      {/* Asset Number Text Input and Scan Button > */}
      <View style={[styles.input, { padding: 0, flexDirection: 'row' }]}>
        <View style={{ flex: 6 }}>
          <TextInput
            style={{ padding: 14, backgroundColor: "transparent" }}
            label="Asset Number"
            placeholder="Asset Number"
            placeholderTextColor="grey"
            value={assetNumber}
            onChangeText={setAssetNumber}
            keyboardType="number-pad"
          />
        </View>
        <View style={{ flex: 1 }}>
          <TouchableOpacity style={{ padding: "20%" }} onPress={scan}>
            <Image source={require('../assets/scan_icon.png')} style={{ height: "100%", aspectRatio: 1 }} />
          </TouchableOpacity>
        </View>
      </View>
      {/* < */}

      {/* Color Text Input > */}
      <TextInput
        style={styles.input}
        label="Color"
        placeholder="Color"
        placeholderTextColor="grey"
        value={color}
        onChangeText={setColor}
      />
      {/* < */}

      {/* Color Button Row > */}
      <ToggleButton.Row onValueChange={value => setColor(value)} value={color} style={styles.toggle}>
        <ToggleButton icon={() => <View><Text style={{ color: 'red' }}>Red</Text></View>} value="Red" style={[styles.toggleButton, { width: "25%" }]} />
        <ToggleButton icon={() => <View><Text style={{ color: 'orange' }}>Orange</Text></View>} value="Orange" style={[styles.toggleButton, { width: "25%" }]} />
        <ToggleButton icon={() => <View><Text style={{ color: 'hotpink' }}>Pink</Text></View>} value="Pink" style={[styles.toggleButton, { width: "25%" }]} />
        <ToggleButton icon={() => <View><Text style={{ color: 'blue' }}>Blue</Text></View>} value="Blue" style={[styles.toggleButton, { width: "25%" }]} />
      </ToggleButton.Row>
      {/* < */}

      {/* Clear and Submit Buttons > */}
      <View style={styles.btnContainer}>
        <TouchableOpacity style={styles.backBtn} onPress={clear}>
          <Text style={styles.btnText}>Clear</Text>
        </TouchableOpacity>
        <TouchableOpacity style={[styles.userBtn, { flexDirection: "row" }]} onPress={submitAlert}>
          <View style={{ flex: 3 }}>
            <Text style={[styles.btnText, { textAlign: 'right' }]}>Submit</Text>
          </View>
          <View style={{ flex: 2 }}>
            <Image source={require('../assets/upload.png')} style={{ height: '100%', aspectRatio: 1, marginHorizontal: 5 }}/>
          </View>
        </TouchableOpacity>
      </View>
      {/* < */}

    </SafeAreaView>

  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "white",
    alignItems: "center",
    //justifyContent: "center",
  },
  toggle: {
    width: "90%",
    height: 45,
    marginBottom: 10,
    borderRadius: 10,
    backgroundColor: "#eeeeee"
  },
  toggleButton: {
    borderWidth: 0,
    borderRadius: 10,
    height: 45,
  },
  input: {
    width: "90%",
    height: 45,
    backgroundColor: "lightgrey",
    padding: 14,
    marginBottom: 10,
    borderRadius: 10,
  },
  btnContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "90%",
  },
  userBtn: {
    backgroundColor: "#409e39",
    padding: 15,
    width: "48%",
    height: 55,
    borderRadius: 10,
  },
  backBtn: {
    backgroundColor: "grey",
    padding: 15,
    width: "48%",
    height: 55,
    borderRadius: 10,
  },
  btnText: {
    fontSize: 18,
    textAlign: "center",
  },
});