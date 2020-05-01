import { MEALS } from '../../data/dummy-data';
import { TOGGLE_FAVORITE, SET_FILTERS } from '../actions/meals';

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

const setFilters = (state, action) => {
	const appliedFilters = action.filters;
	const filteredMeals = state.meals.filter((meal) => {
		if (
			(appliedFilters.isGlutenFree && !meal.isGlutenFree) ||
			(appliedFilters.isLactoseFree && !meal.isLactoseFree) ||
			(appliedFilters.isVegetarian && !meal.isVegetarian) ||
			(appliedFilters.isVegan && !meal.isVegan)
		) {
			return false;
		}
		return true;
	});
	return {
		...state,
		filteredMeals,
	};
};

export const mealsReducer = (state = initState, action) => {
	switch (action.type) {
		case TOGGLE_FAVORITE:
			return toggleFavorite(state, action);
		case SET_FILTERS:
			return setFilters(state, action);
		default:
			return { ...state };
	}
};
