import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';

import { CATEGORIES } from '../data/dummy-data';
import MealsList from '../components/MealsList';
import { View, StyleSheet } from 'react-native';
import DefaultText from '../components/DefaultText';

const CategoryMealsScreen = (props) => {
	const { categoryId } = props.route.params;

	const availableMeals = useSelector((state) => state.meals.filteredMeals);

	useEffect(() => {
		const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId);
		props.navigation.setOptions({ title: selectedCategory.title });
	}, []);

	const displayMeals = availableMeals.filter(
		(meal) => meal.categoryIds.indexOf(categoryId) >= 0
	);

	if (displayMeals.lenght === 0) {
		return (
			<View style={styles.content}>
				<DefaultText>No meals found, maybe check your filters.</DefaultText>
			</View>
		);
	}

	return <MealsList listData={displayMeals} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default CategoryMealsScreen;
