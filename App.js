import React, { useState } from 'react';
import { StyleSheet, StatusBar } from 'react-native';
import * as Font from 'expo-font';
import { AppLoading } from 'expo';
import { enableScreens } from 'react-native-screens';

import AppNavigator from './navigation/AppNavigator';
import Colors from './constants/Colors';

enableScreens();

const fetchFonts = () => {
	return Font.loadAsync({
		'open-sans': require('./assets/fonts/OpenSans-Regular.ttf'),
		'open-sans-bold': require('./assets/fonts/OpenSans-Bold.ttf'),
	});
};

export default function App() {
	const [fontLoaded, setFontLoaded] = useState(false);

	if (!fontLoaded) {
		return (
			<AppLoading
				startAsync={fetchFonts}
				onFinish={() => setFontLoaded(true)}
				onError={(err) => console.log(err)}
			/>
		);
	}

	return (
		<>
			<StatusBar barStyle="light-content" backgroundColor={Colors.primary} />
			<AppNavigator />
		</>
	);
}

const styles = StyleSheet.create({});
