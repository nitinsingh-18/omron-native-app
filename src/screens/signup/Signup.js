import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  Button,
  StyleSheet,
  Pressable,
  ScrollView,
} from "react-native";

const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const PHONE_REGEX = /^[0-9]{10}$/;
const ACCOUNT_REGEX = /^[0-9]{8}$/;

const SignUp = ({ navigation }) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [accountNumber, setAccountNumber] = useState("");
  const [nameError, setNameError] = useState(null);
  const [emailError, setEmailError] = useState(null);
  const [phoneError, setPhoneError] = useState(null);
  const [passwordError, setPasswordError] = useState(null);
  const [accountError, setAccountError] = useState(null);

  const handleNameChange = (text) => {
    setName(text);
    if (!text.trim()) {
      setNameError("Name is required");
    } else {
      setNameError(null);
    }
  };

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

  const handlePhoneChange = (text) => {
    setPhone(text);
    if (!text.trim()) {
      setPhoneError("Phone number is required");
    } else if (!PHONE_REGEX.test(text)) {
      setPhoneError("Invalid phone number format");
    } else {
      setPhoneError(null);
    }
  };

  const handlePasswordChange = (text) => {
    setPassword(text);
    if (!text.trim()) {
      setPasswordError("Password is required");
    } else if (text.length < 12 || text.length > 128) {
      setPasswordError("Password must be between 12 to 128 characters");
    } else {
      setPasswordError(null);
    }
  };

  const handleAccountNumberChange = (text) => {
    setAccountNumber(text);
    if (!text.trim()) {
      setAccountError("Account number is required");
    } else if (!ACCOUNT_REGEX.test(text)) {
      setAccountError("Invalid account number format (8 digits)");
    } else {
      setAccountError(null);
    }
  };

  const handleSignUp = () => {
    if (
      nameError ||
      emailError ||
      phoneError ||
      passwordError ||
      accountError
    ) {
      return;
    }
    if (!name) {
      setNameError("Name is required");
      return;
    }
    if (!email) {
      setEmailError("Email is required");
      return;
    }
    if (!phone) {
      setPhoneError("Phone Number is required");
      return;
    }
    if (!password) {
      setPasswordError("Password is required");
      return;
    }
    if (!accountNumber) {
      setAccountError("Account Number is required");
      return;
    }
    navigation.navigate("Login");
  };

  return (
    <ScrollView contentContainerStyle={styles.container}>
      <View style={styles.box}>
        <Text style={styles.title}>Sign Up</Text>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Name"
            value={name}
            onChangeText={handleNameChange}
          />
          {nameError && <Text style={styles.errorText}>{nameError}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Email"
            value={email}
            onChangeText={handleEmailChange}
            keyboardType="email-address"
            autoCapitalize="none"
            textContentType="emailAddress"
          />
          {emailError && <Text style={styles.errorText}>{emailError}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Phone Number"
            value={phone}
            onChangeText={handlePhoneChange}
            keyboardType="phone-pad"
          />
          {phoneError && <Text style={styles.errorText}>{phoneError}</Text>}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Password"
            value={password}
            onChangeText={handlePasswordChange}
            secureTextEntry={true}
            textContentType="password"
          />
          {passwordError && (
            <Text style={styles.errorText}>{passwordError}</Text>
          )}
        </View>
        <View style={styles.inputContainer}>
          <TextInput
            style={styles.input}
            placeholder="Account Number"
            value={accountNumber}
            onChangeText={handleAccountNumberChange}
            keyboardType="numeric"
          />
          {accountError && <Text style={styles.errorText}>{accountError}</Text>}
        </View>
        <View style={styles.signupButton}>
          <Button title="Sign Up" onPress={handleSignUp} />
        </View>
        <View>
          <Pressable onPress={() => navigation.navigate("Login")}>
            <Text style={styles.link}>Already have an account? Login</Text>
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
  signupButton: {
    marginBottom: 10,
  },
  link: {
    color: "#0E55AA",
    padding: 10,
  },
});

export default SignUp;
