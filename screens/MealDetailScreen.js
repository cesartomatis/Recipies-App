import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Button } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { MEALS } from '../data/dummy-data';
import HeaderButton from '../components/HeaderButton';

const MealDetailScreen = (props) => {
	const { mealId } = props.route.params;

	useEffect(() => {
		const selectedMeal = MEALS.find((meal) => meal.id === mealId);
		props.navigation.setOptions({
			title: selectedMeal.title,
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					<Item
						title="Favorite"
						iconName="md-star"
						onPress={() => console.log('works fine')}
					/>
				</HeaderButtons>
			),
		});
	}, []);

	return (
		<View style={styles.screen}>
			<Text>The Favorites Screen!</Text>
			<Button
				title="Go back to categories"
				onPress={() => {
					props.navigation.popToTop();
				}}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default MealDetailScreen;
