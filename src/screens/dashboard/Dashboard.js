import React from "react";
import { Button, StyleSheet, View } from "react-native";
import { useDispatch } from "react-redux";
import { logout } from "../../redux/slices/authSlice";

const Dashboard = ({}) => {
  const dispatch = useDispatch();
  const handleLogout = () => {
    dispatch(logout());
  };
  return (
    <View>
      <Button
        title="Logout"
        onPress={() => {
          handleLogout();
        }}
      />
    </View>
  );
};

const styles = StyleSheet.create({});

export default Dashboard;
