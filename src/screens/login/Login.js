import React, { useState } from "react";
import { login } from "../../redux/slices/authSlice";
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
import { useDispatch } from "react-redux";
import { Formik } from "formik";

const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

const loginSchema = Yup.object().shape({
  email: Yup.string()
    .matches(emailRegex, "Invalid email address")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = ({ navigation }) => {
  const dispatch = useDispatch();

  const handleLogin = (values) => {
    const params = {
      action: "login",
      emailAddress: values.email,
      password: values.password,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    dispatch(login(params));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Login</Text>
        <Formik
          initialValues={{ email: "", password: "" }}
          validationSchema={loginSchema}
          onSubmit={(values) => handleLogin(values)}
        >
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            values,
            errors,
            touched,
            isSubmitting,
            resetForm,
          }) => (
            <View style={styles.mainView}>
              <TextInput
                style={styles.input}
                placeholder="Email"
                id="email"
                name="email"
                value={values.email}
                onChangeText={handleChange("email")}
                keyboardType="email-address"
                autoCapitalize="none"
                textContentType="emailAddress"
                onBlur={handleBlur("email")}
              />
              {touched.email && errors.email && (
                <Text style={styles.errorText}>{errors.email}</Text>
              )}
              <TextInput
                id="password"
                name="password"
                style={styles.input}
                placeholder="Password"
                secureTextEntry={true}
                textContentType="password"
                fieldButtonLabel={"Forgot?"}
                fieldButtonFunction={() => {}}
                onBlur={handleBlur("password")}
                value={values.password}
                onChangeText={handleChange("password")}
              />
              {touched.password && errors.password && (
                <Text style={styles.errorText}>{errors.password}</Text>
              )}
              <View style={styles.loginButton}>
                <Button title="Login" onPress={handleSubmit} />
              </View>
              <View>
                <Pressable onPress={() => navigation.navigate("Signup")}>
                  <Text style={styles.link}>Create a new account. Signup</Text>
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
    flexDirection: "column",
    gap: 12,
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
    fontSize: 12,
  },
  loginButton: {
    marginBottom: 10,
  },
  link: {
    color: "#0E55AA",
    padding: 10,
  },
});

export default Login;
