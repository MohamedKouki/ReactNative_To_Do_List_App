import React, { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, Modal, StyleSheet } from "react-native";

const LoginScreen = ({ navigation }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showAlert, setShowAlert] = useState(false);

  const handleLogin = () => {
    if (!username || !password) {
      // Afficher une alerte personnalisée si les champs sont vides
      setShowAlert(true);
      return;
    }

    // Vérifiez les informations d'identification ici
    // Pour simplifier, je vais simplement naviguer vers la liste des tâches
    navigation.navigate("TodoList");
  };

  const hideAlert = () => {
    // Masquer l'alerte
    setShowAlert(false);
  };

  const navigateToRegister = () => {
    navigation.navigate("Register");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Login</Text>
      <TextInput
        style={styles.input}
        placeholder="Username"
        value={username}
        onChangeText={setUsername}
      />
      <TextInput
        style={styles.input}
        placeholder="Password"
        secureTextEntry
        value={password}
        onChangeText={setPassword}
      />
      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>
      <Text style={styles.registerText} onPress={navigateToRegister}>
        Don't have an account? Register here.
      </Text>

      {/* Afficher l'alerte personnalisée */}
      <Modal visible={showAlert} transparent={true} animationType="slide">
        <View style={styles.alertContainer}>
          <Text style={styles.alertTitle}>Error</Text>
          <Text style={styles.alertMessage}>Please verify username or password.</Text>
          <TouchableOpacity style={styles.alertButton} onPress={hideAlert}>
            <Text style={styles.alertButtonText}>OK</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  title: {
    fontSize: 24,
    marginBottom: 16,
  },
  input: {
    borderWidth: 1,
    borderColor: "#000",
    borderRadius: 6,
    width: 200,
    paddingVertical: 8,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  button: {
    backgroundColor: "#000",
    borderRadius: 6,
    paddingVertical: 12,
    paddingHorizontal: 16,
    marginBottom: 16,
  },
  buttonText: {
    color: "#ADFF2F",
    fontWeight: "bold",
    fontSize: 20,
  },
  registerText: {
    color: "#000",
    fontSize: 16,
    textDecorationLine: "underline",
  },
  // Styles pour l'alerte personnalisée
  alertContainer: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    alignSelf: "center",
    marginTop: "50%",
    width: 300,
    elevation: 5,
  },
  alertTitle: {
    fontSize: 18,
    fontWeight: "bold",
    marginBottom: 8,
  },
  alertMessage: {
    fontSize: 16,
    marginBottom: 16,
  },
  alertButton: {
    backgroundColor: "#000",
    borderRadius: 6,
    paddingVertical: 8,
    paddingHorizontal: 16,
    alignSelf: "flex-end",
  },
  alertButtonText: {
    color: "#ADFF2F",
    fontWeight: "bold",
  },
});

export default LoginScreen;
