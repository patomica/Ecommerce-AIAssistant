import React from 'react';
import { Text } from 'react-native';
import { NavigationContainer, DarkTheme } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import DashboardScreen from '../screens/DashboardScreen';
import TipsScreen from '../screens/TipsScreen';
import TransactionsListScreen from '../screens/TransactionsListScreen';
import AddTransactionScreen from '../screens/AddTransactionScreen';
import LoansListScreen from '../screens/LoansListScreen';
import AddLoanScreen from '../screens/AddLoanScreen';
import SideHustlesScreen from '../screens/SideHustlesScreen';
import {
  HomeStackParamList,
  LoansStackParamList,
  RootTabParamList,
  TransactionsStackParamList,
} from './types';
import { colors } from '../theme';

const Tab = createBottomTabNavigator<RootTabParamList>();
const HomeStack = createNativeStackNavigator<HomeStackParamList>();
const TransactionsStack = createNativeStackNavigator<TransactionsStackParamList>();
const LoansStack = createNativeStackNavigator<LoansStackParamList>();

const screenOptions = {
  headerStyle: { backgroundColor: colors.background },
  headerTintColor: colors.text,
  headerShadowVisible: false,
  contentStyle: { backgroundColor: colors.background },
};

function HomeStackNavigator() {
  return (
    <HomeStack.Navigator screenOptions={screenOptions}>
      <HomeStack.Screen name="Dashboard" component={DashboardScreen} options={{ headerShown: false }} />
      <HomeStack.Screen name="Tips" component={TipsScreen} options={{ title: 'Financial Tips' }} />
    </HomeStack.Navigator>
  );
}

function TransactionsStackNavigator() {
  return (
    <TransactionsStack.Navigator screenOptions={screenOptions}>
      <TransactionsStack.Screen
        name="TransactionsList"
        component={TransactionsListScreen}
        options={{ headerShown: false }}
      />
      <TransactionsStack.Screen
        name="AddTransaction"
        component={AddTransactionScreen}
        options={{ title: 'Add Transaction' }}
      />
    </TransactionsStack.Navigator>
  );
}

function LoansStackNavigator() {
  return (
    <LoansStack.Navigator screenOptions={screenOptions}>
      <LoansStack.Screen name="LoansList" component={LoansListScreen} options={{ headerShown: false }} />
      <LoansStack.Screen name="AddLoan" component={AddLoanScreen} options={{ title: 'Add Loan' }} />
    </LoansStack.Navigator>
  );
}

const TAB_ICONS: Record<keyof RootTabParamList, string> = {
  HomeTab: '🏠',
  TransactionsTab: '💵',
  LoansTab: '🏦',
  SideHustlesTab: '🚀',
};

const TAB_LABELS: Record<keyof RootTabParamList, string> = {
  HomeTab: 'Home',
  TransactionsTab: 'Transactions',
  LoansTab: 'Loans',
  SideHustlesTab: 'Side Hustles',
};

const navTheme = {
  ...DarkTheme,
  colors: {
    ...DarkTheme.colors,
    background: colors.background,
    card: colors.surface,
    border: colors.border,
    primary: colors.primary,
    text: colors.text,
  },
};

export default function RootNavigator() {
  return (
    <NavigationContainer theme={navTheme}>
      <Tab.Navigator
        screenOptions={({ route }) => ({
          headerShown: false,
          tabBarActiveTintColor: colors.primary,
          tabBarInactiveTintColor: colors.textMuted,
          tabBarStyle: { backgroundColor: colors.surface, borderTopColor: colors.border },
          tabBarLabel: TAB_LABELS[route.name as keyof RootTabParamList],
          tabBarIcon: ({ color }) => (
            <Text style={{ fontSize: 18, color }}>
              {TAB_ICONS[route.name as keyof RootTabParamList]}
            </Text>
          ),
        })}
      >
        <Tab.Screen name="HomeTab" component={HomeStackNavigator} />
        <Tab.Screen name="TransactionsTab" component={TransactionsStackNavigator} />
        <Tab.Screen name="LoansTab" component={LoansStackNavigator} />
        <Tab.Screen name="SideHustlesTab" component={SideHustlesScreen} />
      </Tab.Navigator>
    </NavigationContainer>
  );
}
