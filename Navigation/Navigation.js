// Navigation/Navigation.js

import React, {Component} from 'react';
import { StyleSheet, Image } from "react-native";
import { createStackNavigator } from "react-navigation-stack";
import { createAppContainer } from "react-navigation";
import { createBottomTabNavigator } from "react-navigation-tabs";
import Search from "../Components/Search";
import Profiles from "../Components/Profiles";
import FilmDetail from "../Components/FilmDetail";
import Favorites from "../Components/Favorites";
import About from "../Components/About";

export const ProfilesStackNavigator = createStackNavigator({
  Profiles: {
    screen: Profiles,
    navigationOptions: {
      title: "Profils"
    }
  }
});

export const AboutStackNavigator = createStackNavigator({
  About: {
    screen: About,
    navigationOptions: {
      title: "À propos"
    }
  }
});

export const SearchStackNavigator = createStackNavigator({
  Search: {
    screen: Search,
    navigationOptions: {
      title: "Rechercher"
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
});

export const FavoritesStackNavigator = createStackNavigator({
  Favorites: {
    screen: Favorites,
    navigationOptions: {
      title: "Favoris"
    }
  },
  FilmDetail: {
    screen: FilmDetail
  }
});

const AjarisTabNavigator = createBottomTabNavigator(
  {
    Profiles: {
      screen: ProfilesStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image
              source={require("../Images/ic_search.png")}
              style={styles.icon}
            />
          );
        }
      }
    },
    Search: {
      screen: SearchStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image
              source={require("../Images/ic_search.png")}
              style={styles.icon}
            />
          );
        }
      }
    },
    About: {
      screen: AboutStackNavigator,
      navigationOptions: {
        tabBarIcon: () => {
          return (
            <Image
              source={require("../Images/ic_favorite.png")}
              style={styles.icon}
            />
          );
        }
      }
    }
  },
  {
    tabBarOptions: {
      activeBackgroundColor: "#DDDDDD",
      inactiveBackgroundColor: "#FFFFFF",
      showLabel: false,
      showIcon: true
    }
  }
);

const styles = StyleSheet.create({
  icon: {
    width: 30,
    height: 30
  }
});

export default createAppContainer(AjarisTabNavigator);
