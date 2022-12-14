![React Native](https://img.shields.io/badge/react_native-1C1E24.svg?style=for-the-badge&logo=react&logoColor=white)
![JavaScript](https://img.shields.io/badge/javascript-1C1E24.svg?style=for-the-badge&logo=javascript&logoColor=white)
![Expo](https://img.shields.io/badge/expo-1C1E24?style=for-the-badge&logo=expo&logoColor=white)
![NPM](https://img.shields.io/badge/NPM-1C1E24.svg?style=for-the-badge&logo=npm&logoColor=white)
![Android](https://img.shields.io/badge/Android-1C1E24?style=for-the-badge&logo=android&logoColor=white)
- - -

<p align="left" width="100%">
  <img src="./assets/appIcon.png" style="width: 20%;min-width: 200px;max-width: 300px;"/>
</p>

# Turing Trust Scanner
This project was started by Cole Hennig. This application originally aimed to help automate the process of uploading asset information to a google sheet that helps keep track of who worked on which assests and what action each asset needs next. The goal for the application was to have easy to fill in text fields with shortcut buttons and a way to scan asset number barcodes for the asset field. The application will then be able to upload that information to a google sheet. With the current build, this has all been successfully completed. 

The latest android build can be downloaded [here](https://expo.dev/accounts/coleslaw827/projects/TuringTrustScanner/builds/c5d6cd36-7520-46f9-bb8d-e6d4f7a737b6).

Hopefully this can be of help to understand what is needed and how we can build from here.

Here is a video of the app in use.

https://user-images.githubusercontent.com/77035076/206687116-c07846f9-8b8f-43f6-bd7b-2109c09c9bc6.mp4

This project was bootstrapped with [Create React Native App](https://github.com/react-community/create-react-native-app).

Below you'll find information about performing common tasks.

##  Table of Contents

* [Workspace Setup](#workspace-setup)
  * [npm](#npm)
  * [nodejs](#nodejs)
  * [npx](#npx)
  * [Expo Go App](#expo-go-app)
  * [eas-cli](#eas-cli)
* [Updating to New Releases](#updating-to-new-releases)
* [Available Scripts](#available-scripts)
  * [npx expo start](#expo-start)
  * [npm run android](#npm-run-android)
  * [eas build](#eas-build)
* [Google Apps Script Backend](#google-apps-script-backend)
* [Dependencies](#dependencies)
* [Environment Variables](#environment-variables)
  * [Configuring Packager IP Address](#configuring-packager-ip-address)
* [Customizing App Display Name and Icon](#customizing-app-display-name-and-icon)
* [Troubleshooting](#troubleshooting)
  * [Networking](#networking)
  * [iOS Simulator won't open](#ios-simulator-wont-open)
  * [QR Code does not scan](#qr-code-does-not-scan)

## Workspace Setup

For the development workspace, downloading these command line tools are necessary and convenient for fast and efficient development.

### npm

**npm** is a package manager for the JavaScript programming language maintained by npm, Inc. **npm** is the default package manager for the JavaScript runtime environment Node.js. It consists of a command line client, also called **npm**, and an online database of public and paid-for private packages, called the npm registry.

To install it, run the command:
```console
$ sudo apt install npm
```

### nodejs

**Node.js** is an open-source server environment. Node.js is cross-platform and runs on Windows, Linux, Unix, and macOS. Node.js is a back-end JavaScript runtime environment. Node.js runs on the V8 JavaScript Engine and executes JavaScript code outside a web browser.

To install it, run the command:
```console
$ sudo apt install nodejs
```

### npx

**npx** is a tool intended to help round out the experience of using packages from the npm registry ??? the same way npm makes it super easy to install and manage dependencies hosted on the registry, npx makes it easy to use CLI tools and other executables hosted on the registry. It greatly simplifies a number of things that, until now, required a bit of ceremony to do with plain npm.

To install it, run the command:
```console
$ npm i -g npx
```

### Expo Go App

Expo Go is a free, open-source client for running React Native apps on Android and iOS without needing to build anything locally. It is available on the App Store and Google Play. With Expo Go, you can run your projects on your own device faster than ever, and share those projects across your whole team without the need for addition code signing.

Expo Go is a native app that is installed on your device. When you run [```npx expo start```](#npx-expo-start) in your project, Expo CLI starts a development server and generates a QR code. You can then open the Expo Go app on your device and scan the QR code to connect to the dev server.

I have found this tool extremely helpful and convenient for development. It allows for realtime updates and the ability to simultaneously run the app on an Android and iPhone to make sure the app runs identically on both.

Full documentation can be found [here](https://docs.expo.dev/workflow/expo-go/).

### eas-cli

EAS CLI is the command-line app that you will use to interact with EAS (Expo Application Services) services from your terminal. An account for these services can be made [here](https://expo.dev/eas) for free.

To install it, run the command:
```console
$ npm i -g eas-cli
```

Next you will need to log in using this command:
```console
$ eas login
```

Further documentation on Expo Application Services can be found [here](https://docs.expo.dev/eas/) and my specific instructions and command for building an internal distribution can be found in the [eas build section](#eas-build) of this README.

##  Updating to New Releases

You should only need to update the global installation of `create-react-native-app` very rarely, ideally never.

Updating the `react-native-scripts` dependency of your app should be as simple as bumping the version number in `package.json` and reinstalling your project's dependencies.

Upgrading to a new version of React Native requires updating the `react-native`, `react`, and `expo` package versions, and setting the correct `sdkVersion` in `app.json`. See the [versioning guide](https://github.com/react-community/create-react-native-app/blob/master/VERSIONS.md) for up-to-date information about package version compatibility.

##  Available Scripts

###  `npx expo start`

Runs your app in development mode.

Open it in the [Expo app](https://expo.io) on your phone to view it. It will reload if you save edits to your files, and you will see build errors and logs in the terminal.

Sometimes the Expo app will fail to connect to the metro server. A fix that is usually very reliable is running `expo start` with the `--tunnel` flag.

```console
$ npx expo start --tunnel
```

Sometimes you may need to reset or clear the React Native packager's cache. To do so, you can pass the `--reset-cache` flag to the start script:

```console
$ npx expo start --reset-cache
```

####  `npm run android`

Like `npm start`, but also attempts to open your app on a connected Android device or emulator. Requires an installation of Android build tools (see [React Native docs](https://facebook.github.io/react-native/docs/getting-started.html) for detailed setup). We also recommend installing Genymotion as your Android emulator. Once you've finished setting up the native build environment, there are two options for making the right copy of `adb` available to Create React Native App:

#####  Using Android Studio's `adb`

1. Make sure that you can run adb from your terminal.

2. Open Genymotion and navigate to `Settings -> ADB`. Select ???Use custom Android SDK tools??? and update with your [Android SDK directory](https://stackoverflow.com/questions/25176594/android-sdk-location).

#####  Using Genymotion's `adb`

1. Find Genymotion???s copy of adb. On macOS for example, this is normally `/Applications/Genymotion.app/Contents/MacOS/tools/`.

2. Add the Genymotion tools directory to your path (instructions for [Mac](http://osxdaily.com/2014/08/14/add-new-path-to-path-command-line/), [Linux](http://www.computerhope.com/issues/ch001647.htm), and [Windows](https://www.howtogeek.com/118594/how-to-edit-your-system-path-for-easy-command-line-access/)).

3. Make sure that you can run adb from your terminal.

#### `eas build`

This script is necessary for deploying the current build of the app to the [Expo Dev Site](https://expo.dev/). This does require logging into the account where you want the app being built. Once the app is built on the site it can be downloaded as an apk file and ran on any android. It will also present a qr code that can be scanned on any device to dowload the apk.

```console
$ eas build -p android --clear-cache --profile preview
```

## Google Apps Script Backend

The code for the Apps Script program can be found [here](./backend.js). This file can be attached to any Google Sheet by going to **Extensions** &rarr; **Apps Script** and copy and paste into the editor. Then the file will need to be saved and deployed. The deployment link created will need to added to [EntryPage.js](./pages/EntryPage.js).

**EntryPage.js: Line 38**
```javascript
const googleScriptUrl = '...';
```

If the Apps Script program is ever editted, a new deployment must be created and then the version must be updated on the original deployment by clicking **Deploy** &rarr; **Manage deployments** &rarr; **Original Deployment** &rarr; **Edit Pencil** &rarr; **Version dropdown menu**.

## Dependencies

Install by running:

```console
$ npm install <package name>
```

 * `@react-native-async-storage/async-storage`
 * `@react-navigation/core`
 * `@react-navigation/native`
 * `@react-navigation/native-stack`
 * `axios`
 * `expo`
 * `expo-barcode-scanner`
 * `expo-status-bar`
 * `expo-updates`
 * `logcat`
 * `react`
 * `react-dom`
 * `react-native`
 * `react-native-paper`
 * `react-native-safe-area-context`
 * `react-native-screens`
 * `react-native-web`
 * `sheetdb-node`

##  Customizing App Display Name and Icon

You can edit `app.json` to include [configuration keys](https://docs.expo.io/versions/latest/guides/configuration.html) under the `expo` key.

To change your app's display name, set the `expo.name` key in `app.json` to an appropriate string.

To set an app icon, set the `expo.icon` key in `app.json` to be either a local path or a URL. It's recommended that you use a 512x512 png file with transparency.

##  Environment Variables

You can configure some of Create React Native App's behavior using environment variables.

###  Configuring Packager IP Address

When starting your project, you'll see something like this for your project URL:

```
exp://192.168.0.2:19000
```

The "manifest" at that URL tells the Expo app how to retrieve and load your app's JavaScript bundle, so even if you load it in the app via a URL like `exp://localhost:19000`, the Expo client app will still try to retrieve your app at the IP address that the start script provides.

In some cases, this is less than ideal. This might be the case if you need to run your project inside of a virtual machine and you have to access the packager via a different IP address than the one which prints by default. In order to override the IP address or hostname that is detected by Create React Native App, you can specify your own hostname via the `REACT_NATIVE_PACKAGER_HOSTNAME` environment variable:

Mac and Linux:

```
REACT_NATIVE_PACKAGER_HOSTNAME='my-custom-ip-address-or-hostname' npm start
```

Windows:

```
set REACT_NATIVE_PACKAGER_HOSTNAME='my-custom-ip-address-or-hostname'
npm start
```

The above example would cause the development server to listen on `exp://my-custom-ip-address-or-hostname:19000`.


##  Troubleshooting

###  Networking

If you're unable to load your app on your phone due to a network timeout or a refused connection, a good first step is to verify that your phone and computer are on the same network and that they can reach each other. Create React Native App needs access to ports 19000 and 19001 so ensure that your network and firewall settings allow access from your device to your computer on both of these ports.

Try opening a web browser on your phone and opening the URL that the packager script prints, replacing `exp://` with `http://`. So, for example, if underneath the QR code in your terminal you see:

```
exp://192.168.0.1:19000
```

Try opening Safari or Chrome on your phone and loading

```
http://192.168.0.1:19000
```

and

```
http://192.168.0.1:19001
```

If this works, but you're still unable to load your app by scanning the QR code, please open an issue on the [Create React Native App repository](https://github.com/react-community/create-react-native-app) with details about these steps and any other error messages you may have received.

If you're not able to load the `http` URL in your phone's web browser, try using the tethering/mobile hotspot feature on your phone (beware of data usage, though), connecting your computer to that WiFi network, and restarting the packager. If you are using a VPN you may need to disable it.

###  iOS Simulator won't open

If you're on a Mac, there are a few errors that users sometimes see when attempting to `npm run ios`:

* "non-zero exit code: 107"

* "You may need to install Xcode" but it is already installed

* and others

There are a few steps you may want to take to troubleshoot these kinds of errors:

1. Make sure Xcode is installed and open it to accept the license agreement if it prompts you. You can install it from the Mac App Store.

2. Open Xcode's Preferences, the Locations tab, and make sure that the `Command Line Tools` menu option is set to something. Sometimes when the CLI tools are first installed by Homebrew this option is left blank, which can prevent Apple utilities from finding the simulator. Make sure to re-run `npm/yarn run ios` after doing so.

3. If that doesn't work, open the Simulator, and under the app menu select `Reset Contents and Settings...`. After that has finished, quit the Simulator, and re-run `npm/yarn run ios`.

###  QR Code does not scan

If you're not able to scan the QR code, make sure your phone's camera is focusing correctly, and also make sure that the contrast on the two colors in your terminal is high enough. For example, WebStorm's default themes may [not have enough contrast](https://github.com/react-community/create-react-native-app/issues/49) for terminal QR codes to be scannable with the system barcode scanners that the Expo app uses.

If this causes problems for you, you may want to try changing your terminal's color theme to have more contrast, or running Create React Native App from a different terminal. You can also manually enter the URL printed by the packager script in the Expo app's search bar to load it manually.
