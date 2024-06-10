import React, { useState } from "react";
import * as Yup from "yup";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";
import { Formik } from "formik";

const forgotPasswordSchema = Yup.object().shape({
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(
      /[@$!%*?&#]/,
      "Password must contain at least one special character"
    )
    .required("Password is required"),
  confirmPassword: Yup.string()
    .oneOf([Yup.ref("password"), null], "Passwords must match")
    .required("Confirm Password is required"),
});

const AddNewPassword = ({ navigation }) => {
  const resetPasswordHandler = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Reset Your Password?</Text>
        <Formik
          initialValues={{
            password: "",
            confirmPassword: "",
          }}
          validationSchema={forgotPasswordSchema}
          onSubmit={(values) => resetPasswordHandler(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
          }) => (
            <View style={styles.mainView}>
              <View style={styles.inputContainer}>
                <TextInput
                  name="password"
                  placeholder="Password"
                  onBlur={handleBlur("password")}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  style={styles.input}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
                <TextInput
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  onBlur={handleBlur("confirmPassword")}
                  value={values.confirmPassword}
                  onChangeText={handleChange("confirmPassword")}
                  style={styles.input}
                />
                {touched.confirmPassword && errors.confirmPassword && (
                  <Text style={styles.errorText}>{errors.confirmPassword}</Text>
                )}
              </View>

              <View style={styles.resetPasswordButton}>
                <Button title="Reset Password" onPress={handleSubmit} />
              </View>
            </View>
          )}
        </Formik>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#0E55AA",
  },
  box: {
    backgroundColor: "#fff",
    padding: 35,
    borderRadius: 10,
    elevation: 8,
    width: "80%",
    maxWidth: 600,
    margin: 25,
  },
  mainView: {
    color: "black",
    flexDirection: "column",
    gap: 6,
  },
  title: {
    fontSize: 16,
    marginBottom: 20,
    fontWeight: "800",
  },
  inputContainer: {
    flexDirection: "column",
    gap: 6,
  },
  input: {
    height: 40,
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 4,
    paddingHorizontal: 10,
  },
  errorText: {
    color: "red",
    fontSize: 11,
    fontWeight: "700",
  },
  resetPasswordButton: {
    marginTop: 16,
  },
  link: {
    color: "#0E55AA",
    padding: 10,
  },
});

export default AddNewPassword;
