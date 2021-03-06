import React, { useEffect } from 'react';
import { FlatList, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import { CATEGORIES } from '../data/dummy-data';
import CategoryGridTile from '../components/CategoryGridTile';
import HeaderButton from '../components/HeaderButton';

const CategoriesScreen = (props) => {
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

	const renderGridItem = (itemData) => {
		return (
			<CategoryGridTile
				title={itemData.item.title}
				color={itemData.item.color}
				onSelect={() => {
					props.navigation.navigate('CategoryMealsScreen', {
						categoryId: itemData.item.id,
					});
				}}
			/>
		);
	};

	return (
		<FlatList data={CATEGORIES} renderItem={renderGridItem} numColumns={2} />
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default CategoriesScreen;
