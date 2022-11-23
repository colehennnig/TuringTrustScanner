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
import { useNavigation } from "@react-navigation/core";

function SettingsPage() {

    const navigation = useNavigation();

    const back = () => {
        navigation.navigate('Entry');
    }

    const github = () => {
        Linking.openURL('https://github.com/colehennnig/TuringTrustScanner');
    }

    const sheets = () => {
        Linking.openURL('https://docs.google.com/spreadsheets/d/1zx6BpqGzlpRcvCFa2aXj33DpIiRUnghivoB7MRDxMpg/edit?usp=sharing');
    }

    return (
        <SafeAreaView style={styles.container}>
            <TouchableOpacity style={{height: 45, margin: 10, marginTop: 25}} onPress={back}>
                <Image source={require('../assets/backButton.png')} style={{ height: "100%", aspectRatio: 1 }} />
            </TouchableOpacity>
            <View style={{width: '100%', padding: 15, paddingBottom: 0}}>
                <TouchableOpacity onPress={github} style={{width: '100%', height: 45, backgroundColor: 'lightgrey', borderRadius: 10, alignItems: 'center', flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: "center"}}>
                        <Image source={require('../assets/githubLogo.png')} style={{height: 25, width: 25}}/>
                        <Text style={{marginLeft: 10}}>
                            GitHub Repository
                        </Text>
                    </View>
                    <Image source={require('../assets/link.png')} style={{height: 25, width: 25 }}/>
                </TouchableOpacity>
            </View>
            <View style={{width: '100%', padding: 15}}>
                <TouchableOpacity onPress={sheets} style={{width: '100%', height: 45, backgroundColor: 'lightgrey', borderRadius: 10, alignItems: 'center', flexDirection: 'row', padding: 10, justifyContent: 'space-between'}}>
                    <View style={{flexDirection: 'row', alignItems: "center"}}>
                        <Image source={require('../assets/sheets.png')} style={{height: 25, width: 25}} resizeMode='contain'/>
                        <Text style={{marginLeft: 10}}>
                            Google Sheets Spreadsheet
                        </Text>
                    </View>
                    <Image source={require('../assets/link.png')} style={{height: 25, width: 25}}/>
                </TouchableOpacity>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
      flex: 1,
      backgroundColor: "white",
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

export default SettingsPage;