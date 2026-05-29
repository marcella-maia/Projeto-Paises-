import { Pressable, StyleSheet, Text, TextInput, View } from "react-native";

import RESTCountriesClient from "./utils/RESTCountriesClient";
import { useState } from "react";

  interface Pais {
    nomeComum: string;
    nomeOficial: string;
    nomeRusso: string;
    bandeira: string;
    foto: string;
  }

export default function App() {
  const [termo, setTermo] = useState("");
  const [pais, setPais] = useState<Pais>();

  const carregarDados = (termoDeBusca : string) => {
    RESTCountriesClient.get(`/name/${termoDeBusca}`).then((result) => {
      console.log(result.data);
    }).catch(() => {
      RESTCountriesClient.get(`/capital/${termoDeBusca}`).then((result) => {
      console.log(result.data);
    })
    });
  };


  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Digite um país ou capital"
        onChangeText={(termo) =>
          setTermo(termo)
        }
        value={termo}
      ></TextInput>
      <Pressable
        style={styles.button}
        onPress={() => {
          carregarDados(termo);
        }}
      >
        <Text style={styles.buttonText}>
          {"Buscar"}
        </Text>
      </Pressable>
    </View>
  )
}

const styles = StyleSheet.create({
  button: {
    width: "80%",
    backgroundColor: "#0096F3",
    padding: 8,
    borderRadius: 4,
  },
  buttonText: {
    color: "white",
    textAlign: "center",
  },
  container: {
    flex: 1,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 40,
  },
  input: {
    width: "80%",
    borderColor: "grey",
    borderWidth: 1,
    marginBottom: 12,
    padding: 6,
    textAlign: "center",
    borderRadius: 4,
  },
});