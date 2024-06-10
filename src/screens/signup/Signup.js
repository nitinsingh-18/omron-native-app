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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9]{10}$/;
const ACCOUNT_REGEX = /^[0-9]{8}$/;

const signUpSchema = Yup.object().shape({
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  email: Yup.string()
    .matches(EMAIL_REGEX, "Invalid email address")
    .required("Email is required"),
  password: Yup.string()
    .min(8, "Password must be at least 8 characters long")
    .matches(/[a-z]/, "Password must contain at least one lowercase letter")
    .matches(/[A-Z]/, "Password must contain at least one uppercase letter")
    .matches(/[0-9]/, "Password must contain at least one number")
    .matches(/@$!%*?&#/, "Password must contain at least one special character")
    .required("Password is required"),
  accountNumber: Yup.string() // Adjust regex based on your account number format
    .matches(ACCOUNT_REGEX, "Invalid account number")
    .required("Account Number is required"),
  phoneNumber: Yup.string() // Use string for phone number
    .matches(
      /^(\+\d{1,2}\s)?\(?\d{3}\)?[\s.-]\d{3}[\s.-]\d{4}$/,
      "Invalid Phone Number"
    )
    .required("Phone Number is required"),
});

const SignUp = ({ navigation }) => {
  const handleSignUp = () => {
    navigation.navigate("Login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Sign Up</Text>
        <Formik
          initialValues={{
            email: "",
            name: "",
            password: "",
            phoneNumber: "",
            accountNumber: "",
          }}
          validationSchema={signUpSchema}
          onSubmit={(values) => loginHandler(values)}
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
                  id="name"
                  name="name"
                  placeholder="Name"
                  onBlur={handleBlur("name")}
                  value={values.name}
                  onChangeText={handleChange("name")}
                  style={styles.input}
                />
                {touched.name && errors.name && (
                  <Text style={styles.errorText}>{errors.name}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  id="email"
                  name="email"
                  placeholder="Email"
                  keyboardType="email"
                  onBlur={handleBlur("email")}
                  value={values.email}
                  onChangeText={handleChange("email")}
                  style={styles.input}
                />
                {touched.email && errors.email && (
                  <Text style={styles.errorText}>{errors.email}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  id="phoneNumber"
                  name="phoneNumber"
                  placeholder="Phone Number"
                  keyboardType="Phone Number"
                  onBlur={handleBlur("phoneNumber")}
                  value={values.phoneNumber}
                  onChangeText={handleChange("phoneNumber")}
                  style={styles.input}
                />
                {touched.phoneNumber && errors.phoneNumber && (
                  <Text style={styles.errorText}>{errors.phoneNumber}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  id="password"
                  name="password"
                  placeholder="Password"
                  keyboardType="Password"
                  onBlur={handleBlur("password")}
                  value={values.password}
                  onChangeText={handleChange("password")}
                  style={styles.input}
                />
                {touched.password && errors.password && (
                  <Text style={styles.errorText}>{errors.password}</Text>
                )}
              </View>
              <View style={styles.inputContainer}>
                <TextInput
                  id="accountNumber"
                  name="accountNumber"
                  placeholder="Account Number"
                  keyboardType="Account Number"
                  onBlur={handleBlur("accountNumber")}
                  value={values.accountNumber}
                  onChangeText={handleChange("accountNumber")}
                  style={styles.input}
                />
                {touched.accountNumber && errors.accountNumber && (
                  <Text style={styles.errorText}>{errors.accountNumber}</Text>
                )}
              </View>
              <View style={styles.signupButton}>
                <Button title="Sign Up" onPress={handleSubmit} />
              </View>
              <View>
                <Pressable onPress={() => navigation.navigate("Login")}>
                  <Text style={styles.link}>
                    Already have an account? Login
                  </Text>
                </Pressable>
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
    fontSize: 24,
    marginBottom: 20,
  },
  inputContainer: {
    marginBottom: 25,
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
    position: "absolute",
    top: 40,
  },
  signupButton: {
    marginBottom: 10,
  },
  link: {
    color: "#0E55AA",
    padding: 10,
  },
});

export default SignUp;
