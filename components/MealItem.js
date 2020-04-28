import React from 'react';
import {
	StyleSheet,
	View,
	Text,
	TouchableOpacity,
	Platform,
	TouchableNativeFeedback,
	ImageBackground,
} from 'react-native';

import DefaultText from './DefaultText';

const MealItem = (props) => {
	let ButtoComponent = TouchableOpacity;
	if (Platform.OS === 'android' && Platform.Version >= 21) {
		ButtoComponent = TouchableNativeFeedback;
	}

	return (
		<View style={styles.mealItem}>
			<ButtoComponent style={{ flex: 1 }} onPress={props.onSelectMeal}>
				<View>
					<View style={{ ...styles.mealRow, ...styles.mealHeader }}>
						<ImageBackground
							style={styles.bgImage}
							source={{ uri: props.image }}>
							<View style={styles.titleContainer}>
								<Text style={styles.title} numberOfLines={1}>
									{props.title}
								</Text>
							</View>
						</ImageBackground>
					</View>
					<View style={{ ...styles.mealRow, ...styles.mealDetails }}>
						<DefaultText>{props.duration}'</DefaultText>
						<DefaultText>{props.complexity.toUpperCase()}</DefaultText>
						<DefaultText>{props.affordability.toUpperCase()}</DefaultText>
					</View>
				</View>
			</ButtoComponent>
		</View>
	);
};

const styles = StyleSheet.create({
	mealItem: {
		height: 200,
		width: '100%',
		backgroundColor: '#e5e5e5',
		overflow: 'hidden',
		borderRadius: 10,
		marginVertical: 15,
	},
	bgImage: {
		width: '100%',
		height: '100%',
		justifyContent: 'flex-end',
	},
	titleContainer: {
		backgroundColor: 'rgba(0,0,0,0.6)',
		paddingVertical: 5,
		paddingHorizontal: 12,
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 18,
		color: 'white',

		textAlign: 'center',
	},
	mealRow: {
		flexDirection: 'row',
	},
	mealHeader: {
		height: '85%',
	},
	mealDetails: {
		paddingHorizontal: 10,
		justifyContent: 'space-between',
		alignItems: 'center',
		height: '15%',
	},
});

export default MealItem;
