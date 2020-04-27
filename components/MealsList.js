import React from 'react';
import { StyleSheet, View, FlatList } from 'react-native';
import MealItem from './MealItem';

const MealsList = (props) => {
	const renderMealItem = (itemData) => {
		return (
			<MealItem
				title={itemData.item.title}
				duration={itemData.item.duration}
				complexity={itemData.item.complexity}
				affordability={itemData.item.affordability}
				image={itemData.item.imageUrl}
				onSelectMeal={() => {
					props.navigation.navigate('MealDetailScreen', {
						mealId: itemData.item.id,
					});
				}}
			/>
		);
	};

	return (
		<View style={styles.list}>
			<FlatList
				style={styles.mealsList}
				data={props.listData}
				renderItem={renderMealItem}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	list: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
		paddingHorizontal: 15,
	},
	mealsList: {
		width: '100%',
	},
});

export default MealsList;
