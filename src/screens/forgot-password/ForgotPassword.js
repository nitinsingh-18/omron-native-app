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

const forgotPasswordSchema = Yup.object().shape({
  email: Yup.string()
    .matches(EMAIL_REGEX, "Invalid email address")
    .required("Email is required"),
});

const ForgotPassword = ({ navigation }) => {
  const handleForgotPassword = () => {
    navigation.navigate("AddNewPassword");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>
          Enter Your Registered Email to Reset Password
        </Text>
        <Formik
          initialValues={{
            email: "",
          }}
          validationSchema={forgotPasswordSchema}
          onSubmit={(values) => handleForgotPassword(values)}
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

              <View style={styles.forgotPasswordButton}>
                <Button title="Next" onPress={handleSubmit} />
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
  forgotPasswordButton: {
    marginBottom: 10,
  },
  link: {
    color: "#0E55AA",
    padding: 10,
  },
});

export default ForgotPassword;
