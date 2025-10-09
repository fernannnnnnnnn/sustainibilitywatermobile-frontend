import React, { useEffect, useReducer, useRef, useState } from "react";
import { Pressable, StatusBar, StyleSheet, View, Text } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import { useSafeAreaInsets } from "react-native-safe-area-context";
import { MaterialIcons, FontAwesome, Entypo } from "@expo/vector-icons";

import Svg, { Path } from "react-native-svg";
import Animated, {
  useAnimatedStyle,
  withTiming,
  useDerivedValue,
} from "react-native-reanimated";

import PlaceholderScreenAir from "../screens/MenuScreen/PlaceHolderScreenAir";
import PlaceholderScreenHome from "../screens/MenuScreen/PlaceHolderScreenHome";
import PlaceholderScreenSetting from "../screens/MenuScreen/PlaceHolderScreenSetting";
import PlaceholderScreenListrik from "../screens/MenuScreen/PlaceHolderScreenListrik";

const Tab = createBottomTabNavigator();
const AnimatedSvg = Animated.createAnimatedComponent(Svg);
const NavigationMenu = () => {
  const [isLoading, setIsLoading] = useState(true);

  // useEffect(() => {
  //   const timeout = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 6200);

  //   return () => clearTimeout(timeout);
  // }, []);

  // if (isLoading) {
  //   return (
  //     <View style={{ flex: 1 }}>
  //       <PlaceHolderSplashScreen />
  //     </View>
  //   );
  // }
  return (
    <Tab.Navigator
      screenOptions={{ headerShown: false }}
      tabBar={(props) => <AnimatedTabBar {...props} />}
    >
      <Tab.Screen
        backgroundColor="#0973FF"
        name="Home"
        options={{
          tabBarIcon: () => <HomeIcon />,
        }}
        component={PlaceholderScreenHome}
      />
      <Tab.Screen
        backgroundColor="#0973FF"
        name="Listrik"
        options={{
          tabBarIcon: () => <ListrikIcon />,
        }}
        component={PlaceholderScreenListrik}
      />
      <Tab.Screen
        name="Air"
        options={{
          tabBarIcon: () => <AirIcon />,
        }}
        component={PlaceholderScreenAir}
      />
      <Tab.Screen
        name="Settings"
        options={{
          tabBarIcon: () => <SettingsIcon />,
        }}
        component={PlaceholderScreenSetting}
      />
    </Tab.Navigator>
  );
};

const AnimatedTabBar = ({
  state: { index: activeIndex, routes },
  navigation,
  descriptors,
}) => {
  const { bottom } = useSafeAreaInsets();

  const reducer = (state, action) => {
    return [...state, { x: action.x, index: action.index }];
  };

  const [layout, dispatch] = useReducer(reducer, []);

  const handleLayout = (event, index) => {
    dispatch({ x: event.nativeEvent.layout.x, index });
  };

  const xOffset = useDerivedValue(() => {
    if (layout.length !== routes.length) return 0;
    return [...layout].find(({ index }) => index === activeIndex).x - 25;
  }, [activeIndex, layout]);

  const animatedStyles = useAnimatedStyle(() => {
    return {
      transform: [{ translateX: withTiming(xOffset.value, { duration: 250 }) }],
    };
  });

  const getFillColor = () => {
    const activeRoute = routes[activeIndex];

    switch (activeRoute.name) {
      case "Home":
        return "#0973FF";
      case "Listrik":
        return "#054599";
      case "Air":
        return "#054599";
      case "Settings":
        return "#054599";
      default:
        return "#054599"; // default
    }
  };

  return (
    <View style={[styles.tabBar, { paddingBottom: bottom }]}>
      <AnimatedSvg
        width={110}
        height={60}
        viewBox="0 0 110 60"
        style={[styles.activeBackground, animatedStyles]}
      >
        <Path
          fill={getFillColor()}
          d="M20 0H0c11.046 0 20 8.953 20 20v5c0 19.33 15.67 35 35 35s35-15.67 35-35v-5c0-11.045 8.954-20 20-20H20z"
        />
      </AnimatedSvg>

      <View style={styles.tabBarContainer}>
        {routes.map((route, index) => {
          const active = index === activeIndex;
          const { options } = descriptors[route.key];

          return (
            <TabBarComponent
              key={route.key}
              active={active}
              options={options}
              onLayout={(e) => handleLayout(e, index)}
              onPress={() => navigation.navigate(route.name)}
            />
          );
        })}
      </View>
    </View>
  );
};

const TabBarComponent = ({ active, options, onLayout, onPress }) => {
  const animatedComponentCircleStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          scale: withTiming(active ? 1 : 0, { duration: 250 }),
        },
      ],
    };
  });

  const animatedIconContainerStyles = useAnimatedStyle(() => {
    return {
      opacity: withTiming(active ? 1 : 0.5, { duration: 250 }),
    };
  });

  return (
    <Pressable onPress={onPress} onLayout={onLayout} style={styles.component}>
      <Animated.View
        style={[styles.componentCircle, animatedComponentCircleStyles]}
      />
      <Animated.View
        style={[styles.iconContainer, animatedIconContainerStyles]}
      >
        {options.tabBarIcon ? options.tabBarIcon() : <Text>?</Text>}
      </Animated.View>
    </Pressable>
  );
};

// ------------------ EXPO ICON COMPONENTS ---------------------

const HomeIcon = () => <FontAwesome name="home" size={24} color="#604AE6" />;

const ListrikIcon = () => (
  <MaterialIcons name="electric-meter" size={24} color="#604AE6" />
);

const AirIcon = () => <Entypo name="water" size={24} color="#604AE6" />;

const SettingsIcon = () => (
  <MaterialIcons name="manage-accounts" size={24} color="#604AE6" />
);

// ------------------ STYLES ---------------------

const styles = StyleSheet.create({
  tabBar: {
    backgroundColor: "white",
  },
  activeBackground: {
    position: "absolute",
  },
  tabBarContainer: {
    flexDirection: "row",
    justifyContent: "space-evenly",
  },
  component: {
    height: 60,
    width: 60,
    marginTop: -5,
  },
  componentCircle: {
    flex: 1,
    borderRadius: 30,
    backgroundColor: "white",
  },
  iconContainer: {
    position: "absolute",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default NavigationMenu;
