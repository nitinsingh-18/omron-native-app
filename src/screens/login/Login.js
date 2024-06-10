import React, { useState } from "react";
import { login } from "../../redux/slices/authSlice";
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

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

const Login = ({ navigation }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [emailError, setEmailError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);

  const dispatch = useDispatch();

  const handleEmailChange = (text) => {
    setEmail(text);
    if (!text.trim()) {
      setEmailError("Email is required");
    } else if (!EMAIL_REGEX.test(text)) {
      setEmailError("Invalid email format");
    } else {
      setEmailError(null);
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (!text.trim()) {
      setPasswordError("Password is required");
    } else {
      setPasswordError(null);
    }
  };

  const handleLogin = () => {
    if (emailError || passwordError) {
      return;
    }
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    const params = {
      action: "login",
      emailAddress: email,
      password: password,
      timeZone: Intl.DateTimeFormat().resolvedOptions().timeZone,
    };
    dispatch(login(params));
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Login</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
            errorMessage={emailError}
          />
          {emailError && <Text style={styles.errorText}>{emailError}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={true}
            textContentType="password"
            errorMessage={passwordError}
          />
          {passwordError && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}
        </View>
        <View style={styles.loginButton}>
          <Button title="Login" onPress={handleLogin} />
        </View>
        <View>
          <Pressable onPress={() => navigation.navigate("Signup")}>
            <Text style={styles.link}>Create a new account. Signup</Text>
          </Pressable>
        </View>
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
    position: "absolute",
    top: 40,
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
