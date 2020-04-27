import React, { useEffect } from 'react';

import { CATEGORIES, MEALS } from '../data/dummy-data';
import MealsList from '../components/MealsList';

const CategoryMealsScreen = (props) => {
	const { categoryId } = props.route.params;

	useEffect(() => {
		const selectedCategory = CATEGORIES.find((cat) => cat.id === categoryId);
		props.navigation.setOptions({ title: selectedCategory.title });
	}, []);

	const displayMeals = MEALS.filter(
		(meal) => meal.categoryIds.indexOf(categoryId) >= 0
	);

	return <MealsList listData={displayMeals} navigation={props.navigation} />;
};

export default CategoryMealsScreen;
