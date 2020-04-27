import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import {
	createStackNavigator,
	TransitionPresets,
	CardStyleInterpolators,
} from '@react-navigation/stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Easing, Platform, Text } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { createMaterialBottomTabNavigator } from '@react-navigation/material-bottom-tabs';
import { createDrawerNavigator } from '@react-navigation/drawer';

import CategoriesSceen from '../screens/CategoriesScreen';
import CategoryMealsScreen from '../screens/CategoryMealsScreen';
import MealDetailScreen from '../screens/MealDetailScreen';
import FavoritesScreen from '../screens/FavoritesScreen';
import FiltersScreen from '../screens/FiltersScreen';
import Colors from '../constants/Colors';

const MealsStack = createStackNavigator();
const FavoritesStack = createStackNavigator();
const FiltersStack = createStackNavigator();

const Tab =
	Platform.OS === 'ios'
		? createBottomTabNavigator()
		: createMaterialBottomTabNavigator();

const Drawer = createDrawerNavigator();

const config = {
	animation: 'spring',
	config: {
		stiffness: 1000,
		damping: 50,
		mass: 3,
		overshootClamping: false,
		restDisplacementThreshold: 0.01,
		restSpeedThreshold: 0.01,
	},
};

const closeConfig = {
	animation: 'timing',
	config: {
		duration: 300,
		easing: Easing.linear,
	},
};

const stackHeaderStyle = {
	headerStyle: {
		backgroundColor: Colors.primary,
	},
	headerTintColor: 'white',
	headerTitleStyle: {
		fontFamily: 'open-sans-bold',
	},
	headerBackTitleStyle: {
		fontFamily: 'open-sans',
	},
	gestureEnabled: true,
	gestureDirection: 'horizontal',
	...TransitionPresets.SlideFromRightIOS,
	// transitionSpec: {
	// 	open: closeConfig,
	// 	close: closeConfig,
	// },
	// cardStyleInterpolator: CardStyleInterpolators.forHorizontalIOS,
};

const MealsNavigator = (props) => (
	<MealsStack.Navigator
		screenOptions={stackHeaderStyle}
		headerMode="screen"
		animation="fade">
		<MealsStack.Screen
			name="Categories"
			component={CategoriesSceen}
			options={{
				title: 'Meal Categories',
			}}
		/>
		<MealsStack.Screen
			name="CategoryMealsScreen"
			component={CategoryMealsScreen}
		/>
		<MealsStack.Screen name="MealDetailScreen" component={MealDetailScreen} />
	</MealsStack.Navigator>
);

const FavoritesNavigator = (props) => (
	<FavoritesStack.Navigator
		screenOptions={stackHeaderStyle}
		headerMode="screen"
		animation="fade">
		<FavoritesStack.Screen
			name="FavoritesScreen"
			component={FavoritesScreen}
			options={{
				title: 'Favorites',
			}}
		/>
		<FavoritesStack.Screen
			name="MealDetailScreen"
			component={MealDetailScreen}
		/>
	</FavoritesStack.Navigator>
);

const FiltersNavigator = (props) => (
	<FiltersStack.Navigator
		screenOptions={stackHeaderStyle}
		headerMode="screen"
		animation="fade">
		<FiltersStack.Screen
			name="FiltersScreen"
			component={FiltersScreen}
			options={{
				title: 'Filters',
			}}
		/>
	</FiltersStack.Navigator>
);

const TabsNavigator = (props) => (
	<Tab.Navigator
		activeColor="white"
		shifting={true}
		sceneAnimationEnabled={true}
		tabBarOptions={{
			activeTintColor: Colors.accent,
			labelStyle: {
				fontFamily: 'open-sans-bold',
			},
		}}
		screenOptions={({ route }) => ({
			tabBarIcon: ({ focused, color, size }) => {
				let iconName;

				if (route.name === 'Meals') {
					iconName = focused ? 'ios-restaurant' : 'md-restaurant';
				} else if (route.name === 'Favorite') {
					iconName = focused ? 'md-star' : 'md-star-outline';
				}

				return <Ionicons name={iconName} size={25} color={color} />;
			},
			tabBarColor: Colors.primary,
		})}>
		<Tab.Screen
			name="Meals"
			component={MealsNavigator}
			options={{
				tabBarLabel: (
					<Text style={{ fontFamily: 'open-sans-bold' }}>Meals</Text>
				),
			}}
		/>
		<Tab.Screen
			name="Favorite"
			component={FavoritesNavigator}
			options={{
				tabBarLabel: (
					<Text style={{ fontFamily: 'open-sans-bold' }}>Favorites</Text>
				),
				tabBarColor: Colors.accent,
			}}
		/>
	</Tab.Navigator>
);

const AppNavigator = (props) => (
	<NavigationContainer>
		<Drawer.Navigator
			initialRouteName="Tabs"
			drawerType="back"
			drawerContentOptions={{
				activeTintColor: Colors.accent,
				labelStyle: {
					fontFamily: 'open-sans-bold',
				},
			}}>
			<Drawer.Screen
				name="MealsOpt"
				component={TabsNavigator}
				options={{
					drawerLabel: 'Meals',
				}}
			/>
			<Drawer.Screen
				name="FiltersOpt"
				component={FiltersNavigator}
				options={{
					drawerLabel: 'Filters',
				}}
			/>
		</Drawer.Navigator>
	</NavigationContainer>
);

export default AppNavigator;
