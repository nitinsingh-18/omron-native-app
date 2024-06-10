import { NavigationContainer } from "@react-navigation/native";
import { createNativeStackNavigator } from "@react-navigation/native-stack";
import React from "react";
import Login from "../screens/login/Login";
import SignUp from "../screens/signup/Signup";
import AddNewPassword from "../screens/forgot-password/AddNewPassword";
import ForgotPassword from "../screens/forgot-password/ForgotPassword";

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
        <Stack.Screen
          name="ForgotPassword"
          component={ForgotPassword}
          options={{ title: "Forgot Password" }}
        />
        <Stack.Screen
          name="AddNewPassword"
          component={AddNewPassword}
          options={{ title: "Add New Password" }}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default OpenRoutes;
