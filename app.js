import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import image from './assets/mordo.jpg';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');

  useEffect(() => {
    const requestPermissions = async () => {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
      if (status !== 'granted') {
        alert('Se requieren permisos para acceder a la galería.');
      }
    };
    requestPermissions();
  }, []);

  const pickImageGaleria = async () => {
    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage({ uri: result.uri });
    }
  };

  const pickImageFoto = async () => {
    const result = await ImagePicker.launchCameraAsync({
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage({ uri: result.uri });
    }
  };

  const handleSubmit = () => {
    if (username.length==0 || password.length==0) {
      alert( 'Los campos no deben estar vacíos.');
      return;
    }
    if (!/^[a-zA-Z]+$/.test(username)) {
    alert('El nombre de usuario no puede contener números.');
      return;
    }
    if (password.length < 6) {
      alert('La contraseña debe tener al menos 6 caracteres.');
      return;
    }
    alert('Éxito', 'Usuario Registrado');
  };

  return (
    <View style={styles.container}>
      <View style={styles.subcontainer}>
        <Text style={styles.title}>Inicio de Sesión</Text>

        <TouchableOpacity onPress={pickImageGaleria}>
          <Image source={selectedImage ? { uri: selectedImage.uri } : image} style={styles.image} />
        </TouchableOpacity>

        <TouchableOpacity 
          onPress={() => selectedImage ? Sharing.shareAsync(selectedImage.uri) : alert("No hay imagen seleccionada para compartir")} 
          style={styles.buttonShare}>
          <Text style={styles.buttonText}>COMPARTIR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.buttonTakePhoto} onPress={pickImageFoto}>
          <Text style={styles.buttonText}>TOMAR UNA FOTO</Text>
        </TouchableOpacity>

        <View style={styles.subcontainer2}>
          <Text style={styles.subtitle}>Nombre de usuario:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Nombre" 
            value={username} 
            onChangeText={setUsername} 
          />

          <Text style={styles.subtitle}>Contraseña:</Text>
          <TextInput 
            style={styles.input} 
            placeholder="Contraseña" 
            secureTextEntry={true} 
            value={password} 
            onChangeText={setPassword} 
          />

          <View>
            <TouchableOpacity style={styles.buttonSubmit} onPress={handleSubmit}>
              <Text style={styles.buttonText}>ACEPTAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#e3f2fd', // Color de fondo más claro
  },
  subcontainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 5,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#1976d2', // Azul más fuerte
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderColor: '#bbdefb', // Color del borde
    borderWidth: 2,
  },
  buttonShare: {
    backgroundColor: '#4caf50',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  buttonText: {
    color: '#ffffff',
    fontSize: 16,
    fontWeight: 'bold',
  },
  buttonTakePhoto: {
    backgroundColor: '#2196f3',
    padding: 10,
    borderRadius: 5,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
  },
  subcontainer2: {
    width: '100%',
    paddingHorizontal: 10,
  },
  subtitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333333',
    marginVertical: 10,
  },
  input: {
    height: 40,
    borderColor: '#cccccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 15,
  },
  buttonSubmit: {
    backgroundColor: '#ccc75c',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
});

export default App;
