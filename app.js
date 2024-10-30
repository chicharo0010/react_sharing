import React, { useState, useEffect } from "react";
import { Text, View, StyleSheet, TouchableOpacity, Image, TextInput, Alert } from 'react-native';
import image from './assets/alberto.jpg';
import * as ImagePicker from 'expo-image-picker';
import * as Sharing from 'expo-sharing';

const App = () => {
  const [selectedImage, setSelectedImage] = useState(null);

  // Solicitar permisos al iniciar la aplicación
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

  const openImagePickerAsync = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();

    if (permissionResult.granted === false) {
      alert('Permisos son requeridos');
      return;
    }

    const pickerResult = await ImagePicker.launchImageLibraryAsync();
    if (!pickerResult.canceled) {
      setSelectedImage({ uri: pickerResult.uri });
    }
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
          style={styles.button3}>
          <Text style={styles.buttonText}>COMPARTIR</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button2} onPress={pickImageFoto}>
          <Text style={styles.buttonText}>TOMAR UNA FOTO</Text>
        </TouchableOpacity>

        <View style={styles.subcontainer2}>
          <Text style={styles.subtitle}>Nombre de usuario:</Text>
          <TextInput style={styles.input} placeholder="Nombre" />

          <Text style={styles.subtitle}>Contraseña:</Text>
          <TextInput style={styles.input} placeholder="Contraseña" secureTextEntry={true} />

          <View>
            <TouchableOpacity style={styles.button} onPress={() => alert('Usuario Registrado')}>
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
    backgroundColor: '#f5f5f5',
  },
  subcontainer: {
    width: '90%',
    padding: 20,
    backgroundColor: '#ffffff',
    borderRadius: 10,
    alignItems: 'center',
    marginBottom: 20,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 2 },
    shadowRadius: 5,
    elevation: 3,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    color: '#333333',
  },
  image: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20,
    borderColor: '#ccc',
    borderWidth: 2,
  },
  button3: {
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
  button2: {
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
  button: {
    backgroundColor: '#ff5722',
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignItems: 'center',
  },
});

export default App;
