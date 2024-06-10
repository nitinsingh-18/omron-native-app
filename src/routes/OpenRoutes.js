import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../screens/login/Login";
import SignUp from "../screens/signup/Signup";

const OpenRoutes = () => {
  const Stack = createNativeStackNavigator();
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName="Login">
        <Stack.Screen
          name="Login"
          component={Login}
          options={{ title: "Login Page" }}
        />
        <Stack.Screen
          name="Signup"
          component={SignUp}
          options={{ title: "Signup Page" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default OpenRoutes;
