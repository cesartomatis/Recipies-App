import React, { useEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import MealsList from '../components/MealsList';
import { MEALS } from '../data/dummy-data';
import HeaderButton from '../components/HeaderButton';

const FavoritesScreen = (props) => {
	useEffect(() => {
		props.navigation.setOptions({
			headerLeft: () => (
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					<Item
						title="Menu"
						iconName="md-menu"
						onPress={() => {
							props.navigation.toggleDrawer();
						}}
					/>
				</HeaderButtons>
			),
		});
	}, []);

	const favMeals = MEALS.filter((meal) => meal.id === 'm1' || meal.id === 'm2');

	return <MealsList listData={favMeals} navigation={props.navigation} />;
};

export default FavoritesScreen;
