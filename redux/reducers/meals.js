import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE } from '../actions/meals';

const initState = {
	meals: MEALS,
	filteredMeals: MEALS,
	favoriteMeals: [],
};

const toggleFavorite = (state, action) => {
	const existingIndex = state.favoriteMeals.findIndex(
		(meal) => meal.id === action.mealId
	);
	if (existingIndex >= 0) {
		const updatedFavMeals = [...state.favoriteMeals];
		updatedFavMeals.splice(existingIndex, 1);
		return {
			...state,
			favoriteMeals: updatedFavMeals,
		};
	}
	return {
		...state,
		favoriteMeals: state.favoriteMeals.concat(
			state.meals.find((meal) => meal.id === action.mealId)
		),
	};
};

export const mealsReducer = (state = initState, action) => {
	switch (action.type) {
		case TOGGLE_FAVORITE:
			return toggleFavorite(state, action);
		default:
			return { ...state };
	}
};
