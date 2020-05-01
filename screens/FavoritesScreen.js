import React, { useEffect } from 'react';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';
import { View, StyleSheet } from 'react-native';
import { useSelector } from 'react-redux';

import MealsList from '../components/MealsList';
import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';

const FavoritesScreen = (props) => {
	const favMeals = useSelector((state) => state.meals.favoriteMeals);

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

	if (favMeals.length === 0 || !favMeals) {
		return (
			<View style={styles.content}>
				<DefaultText>No favorites meals found. Start adding some!</DefaultText>
			</View>
		);
	}

	return <MealsList listData={favMeals} navigation={props.navigation} />;
};

const styles = StyleSheet.create({
	content: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default FavoritesScreen;
