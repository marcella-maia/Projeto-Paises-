import { useState } from 'react'

import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  View
} from 'react-native'

import React from 'react'
import RESTCountriesClient from './utils/RESTCountriesClient'

export default function App() {

  const [nomePais, setNomePais] = useState('')
  const [pais, setPais] = useState<any>(null)

  const [capital, setCapital] = useState('')
  const [paisCapital, setPaisCapital] = useState<any>(null)

  const buscarPorNome = () => {

    RESTCountriesClient.get(`name/${nomePais}`)
      .then(resultado => {

        setPais(resultado.data[0])

      })
      .catch(() => {

        setPais(null)

        alert('País não encontrado')

      })

  }

  const buscarPorCapital = () => {

    RESTCountriesClient.get(`capital/${capital}`)
      .then(resultado => {

        setPaisCapital(resultado.data[0])

      })
      .catch(() => {

        setPaisCapital(null)

        alert('Capital não encontrada')

      })

  }

  const limparBuscaNome = () => {
    setNomePais('')
    setPais(null)
  }

  const limparBuscaCapital = () => {
    setCapital('')
    setPaisCapital(null)
  }

  return (
  
  <ScrollView contentContainerStyle={styles.container}>

      <Text style={styles.titulo}>
        Informações sobre Países
      </Text>

      <Text style={styles.subtitulo}>
        Busca por país
      </Text>
      <TextInput
        style={styles.input}
        placeholder='Digite o nome do país'
        value={nomePais}
        onChangeText={setNomePais}
      />

      <View style={styles.botoes}>

        <View style={styles.botao}>
          <Button
            title='Buscar país'
            onPress={buscarPorNome}
          />
        </View>

        <View style={styles.botao}>
          <Button
            title='Limpar'
            onPress={limparBuscaNome}
          />
        </View>

      </View>

      {
        pais && (

          <View style={styles.resultado}>

            <Text>
              Nome comum: {pais.name.common}
            </Text>

            <Text>
              Nome oficial: {pais.name.official}
            </Text>

            <Text>
              Nome em russo:
              {' '}
              {pais.translations.rus.common}
            </Text>

            <Text>
              OpenStreetMap:
              {' '}
              {pais.maps.openStreetMaps}
            </Text>

            <Image
              source={{
                uri: pais.flags.png
              }}
              style={styles.bandeira}
            />

          </View>

        )
      }
      <Text style={styles.subtitulo}>
        Busca por capital
      </Text>

      <TextInput
        style={styles.input}
        placeholder='Digite a capital'
        value={capital}
        onChangeText={setCapital}
      />

      <View style={styles.botoes}>

        <View style={styles.botao}>
          <Button
            title='Buscar capital'
            onPress={buscarPorCapital}
          />
        </View>

        <View style={styles.botao}>
          <Button
            title='Limpar'
            onPress={limparBuscaCapital}
          />
        </View>

      </View>
      {
        paisCapital && (

          <View style={styles.resultado}>

            <Text>
              Nome oficial:
              {' '}
              {paisCapital.name.official}
            </Text>

            <Image
              source={{
                uri: paisCapital.flags.png
              }}
              style={styles.bandeira}
            />

          </View>

        )
      }

    </ScrollView>

  )

}

const styles = StyleSheet.create({

  container: {
    padding: 20,
    backgroundColor: '#f2f2f2',
    flexGrow: 1
  },

  titulo: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 30,
    marginTop: 40,
    color: '#222'
  },

  subtitulo: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
    marginTop: 20,
    color: '#333'
  },

  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    backgroundColor: 'white',
    marginBottom: 10,
    padding: 12,
    borderRadius: 10,
    fontSize: 16
  },

  resultado: {
    marginTop: 20,
    marginBottom: 25,
    backgroundColor: 'white',
    padding: 15,
    borderRadius: 12,
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3
  },

  bandeira: {
    width: 180,
    height: 120,
    marginTop: 15,
    alignSelf: 'center',
    borderRadius: 8
  },

  botoes: {
  flexDirection: 'row',
  justifyContent: 'space-between',
  marginBottom: 10
},

  botao: {
    width: '48%'
  }
})
