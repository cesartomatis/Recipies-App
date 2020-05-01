import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { useSelector, useDispatch } from 'react-redux';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import { toggleFavorite } from '../redux/actions/meals';

const ListItem = (props) => {
	return (
		<View style={styles.listItem}>
			<DefaultText>{props.children}</DefaultText>
		</View>
	);
};

const MealDetailScreen = (props) => {
	const { mealId } = props.route.params;
	const [selectedMeal, setSelectedMeal] = useState();

	const availableMeals = useSelector((state) => state.meals.meals);
	const isCurrentMealFavorite = useSelector((state) =>
		state.meals.favoriteMeals.some((meal) => meal.id === mealId)
	);

	const dispatch = useDispatch();
	const toggleFavoriteHandler = useCallback(() => {
		dispatch(toggleFavorite(mealId));
	}, [dispatch, mealId]);

	useEffect(() => {
		const meal = availableMeals.find((meal) => meal.id === mealId);
		props.navigation.setOptions({
			title: meal.title,
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					<Item
						title="Favorite"
						iconName={isCurrentMealFavorite ? 'md-star' : 'md-star-outline'}
						onPress={toggleFavoriteHandler}
					/>
				</HeaderButtons>
			),
		});
		setSelectedMeal(meal);
	}, [isCurrentMealFavorite]);

	if (selectedMeal) {
		return (
			<ScrollView>
				<Image source={{ uri: selectedMeal.imageUrl }} style={styles.image} />
				<View style={styles.details}>
					<DefaultText>{selectedMeal.duration}'</DefaultText>
					<DefaultText>{selectedMeal.complexity.toUpperCase()}</DefaultText>
					<DefaultText>{selectedMeal.affordability.toUpperCase()}</DefaultText>
				</View>
				<Text style={styles.title}>Ingredients</Text>
				{selectedMeal.ingredients.map((ing) => (
					<ListItem key={ing}>{ing}</ListItem>
				))}
				<Text style={styles.title}>Steps</Text>
				{selectedMeal.steps.map((step) => (
					<ListItem key={step}>{step}</ListItem>
				))}
			</ScrollView>
		);
	}
	return <Text>Loading...</Text>;
};

const styles = StyleSheet.create({
	image: {
		width: '100%',
		height: 200,
	},
	details: {
		flexDirection: 'row',
		padding: 15,
		justifyContent: 'space-around',
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		textAlign: 'center',
	},
	listItem: {
		marginVertical: 10,
		marginHorizontal: 20,
		borderColor: '#ccc',
		borderWidth: 1,
		padding: 10,
	},
});

export default MealDetailScreen;
