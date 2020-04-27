import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { HeaderButtons, Item } from 'react-navigation-header-buttons';

import HeaderButton from '../components/HeaderButton';

const FiltersScreen = (props) => {
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

	return (
		<View style={styles.screen}>
			<Text>The Filters Screen!</Text>
		</View>
	);
};

const styles = StyleSheet.create({
	screen: {
		flex: 1,
		justifyContent: 'center',
		alignItems: 'center',
	},
});

export default FiltersScreen;
