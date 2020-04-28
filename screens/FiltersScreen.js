import React, { useEffect, useState, useCallback } from 'react';
import { View, Text, StyleSheet, Switch, Platform } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';
import DefaultText from '../components/DefaultText';
import Colors from '../constants/Colors';

const FilterSwitch = (props) => (
	<View style={styles.filterContainer}>
		<DefaultText>{props.label}</DefaultText>
		<Switch
			trackColor={{ true: Colors.primary }}
			thumbColor={Platform.OS === 'android' ? Colors.primary : ''}
			value={props.state}
			onValueChange={props.onChange}
		/>
	</View>
);

const FiltersScreen = (props) => {
	const [isGlutenFree, setIsGlutenFree] = useState(false);
	const [isLactoseFree, setIsLactoseFree] = useState(false);
	const [isVegan, setIsVegan] = useState(false);
	const [isVegetarian, setIsVegetarian] = useState(false);

	const onSaveFiltersHandler = useCallback(() => {
		console.log(isGlutenFree, isLactoseFree, isVegan, isVegetarian);
	}, [isGlutenFree, isLactoseFree, isVegan, isVegetarian]);

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
			headerRight: () => (
				<HeaderButtons HeaderButtonComponent={HeaderButton}>
					<Item
						title="Menu"
						iconName="md-save"
						onPress={onSaveFiltersHandler}
					/>
				</HeaderButtons>
			),
		});
	});

	return (
		<View style={styles.screen}>
			<Text style={styles.title}>Available Filters / Restrictions</Text>
			<FilterSwitch
				label="Gluten-free"
				state={isGlutenFree}
				onChange={(newValue) => setIsGlutenFree(newValue)}
			/>
			<FilterSwitch
				label="Lactose-free"
				state={isLactoseFree}
				onChange={(newValue) => setIsLactoseFree(newValue)}
			/>
			<FilterSwitch
				label="Vegan"
				state={isVegan}
				onChange={(newValue) => setIsVegan(newValue)}
			/>
			<FilterSwitch
				label="Vegetarian"
				state={isVegetarian}
				onChange={(newValue) => setIsVegetarian(newValue)}
			/>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		alignItems: 'center',
	},
	title: {
		fontFamily: 'open-sans-bold',
		fontSize: 22,
		margin: 20,
		textAlign: 'center',
	},
	filterContainer: {
		flexDirection: 'row',
		justifyContent: 'space-between',
		alignItems: 'center',
		width: '80%',
		marginVertical: 5,
		borderBottomColor: '#ccc',
		borderBottomWidth: 1,
	},
});

export default FiltersScreen;
