import React, { useState, useEffect } from 'react';
import { Image, Text, View, StyleSheet, Button, Vibration } from 'react-native';
import { BarCodeScanner } from 'expo-barcode-scanner';
import Constants from 'expo-constants';
import { Dimensions, TouchableOpacity } from 'react-native';
import { useNavigation } from "@react-navigation/core";

const { width, height } = Dimensions.get('window');
const qrW = width * 0.7;
const qrH = height * 0.1;

export default function App() {
  
  // States
  const [hasPermission, setHasPermission] = useState(null);
  const [scanned, setScanned] = useState(false);
  const navigation = useNavigation();

  //=========================================================================//
  // useEffect:
  //-------------------------------------------------------------------------//
  // Runs when this page opens.
  // Checks for phone camera permission and asks for permission if not found.
  //=========================================================================//
  useEffect(() => {
    (async () => {
      const { status } = await BarCodeScanner.requestPermissionsAsync();
      setHasPermission(status === 'granted');
    })();
  }, []);

  //=========================================================================//
  // handleBarCodeScanned:
  //-------------------------------------------------------------------------//
  // Sets scanned state to true and navigates back to the Entry Page with
  // the scanned asset number.
  //=========================================================================//
  const handleBarCodeScanned = ({ type, data }) => {
    Vibration.vibrate(200,false);
    setScanned(true);
    navigation.navigate("Entry", {asset: data});
  };

  if (hasPermission === null) {
    return <Text>Requesting for camera permission</Text>;
  }
  if (hasPermission === false) {
    return <Text>No access to camera</Text>;
  }

  return (
    <View
      style={{
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-end',
      }}>
      <BarCodeScanner
        onBarCodeScanned={scanned ? undefined : handleBarCodeScanned}
        style={[StyleSheet.absoluteFillObject, styles.container]}>
        <Text style={styles.description}>Scan Asset Number</Text>
        <View
          style={styles.qr}
        />
        <Text onPress={() => navigation.navigate("Entry", {asset: ""})} style={styles.cancel}>
          Cancel
        </Text>
      </BarCodeScanner>
      {scanned && (
        <Button title={'Tap to Scan Again'} onPress={() => setScanned(false)} />
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingTop: Constants.statusBarHeight,
    backgroundColor: '#ecf0f1',
    padding: 8,
  },
  qr: {
    marginTop: '20%',
    marginBottom: '20%',
    width: qrW,
    height: qrH,
    backgroundColor: "white",
    opacity: 0.4,
    borderRadius: 20
  },
  description: {
    fontSize: width * 0.07,
    marginTop: '10%',
    textAlign: 'center',
    width: '70%',
    color: 'white',
  },
  cancel: {
    fontSize: width * 0.05,
    textAlign: 'center',
    width: '40%',
    color: 'white',
  },
});
