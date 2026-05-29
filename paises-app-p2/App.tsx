import { useState } from 'react'

import {
  Button,
  Image,
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

  }

  const buscarPorCapital = () => {

    RESTCountriesClient.get(`capital/${capital}`)
      .then(resultado => {

        setPaisCapital(resultado.data[0])

      })

  }

  return (

    <View style={styles.container}>

      <TextInput
        style={styles.input}
        placeholder='Digite o nome do país'
        value={nomePais}
        onChangeText={setNomePais}
      />

      <Button
        title='Buscar país'
        onPress={buscarPorNome}
      />

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

      <TextInput
        style={styles.input}
        placeholder='Digite a capital'
        value={capital}
        onChangeText={setCapital}
      />

      <Button
        title='Buscar capital'
        onPress={buscarPorCapital}
      />

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

    </View>

  )

}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    padding: 20
  },

  input: {
    borderWidth: 1,
    borderColor: 'gray',
    marginBottom: 10,
    padding: 10,
    borderRadius: 5
  },

  resultado: {
    marginTop: 20
  },

  bandeira: {
    width: 150,
    height: 100,
    marginTop: 10
  }

})