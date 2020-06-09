import React, { useState, useEffect, useRef, createRef } from 'react'
import { View, Image, ImageBackground, StyleSheet, Text, TextInput, KeyboardAvoidingView, Platform, SafeAreaView } from 'react-native'
import { RectButton } from 'react-native-gesture-handler'
import { Feather as Icon } from '@expo/vector-icons'
import { useNavigation } from '@react-navigation/native'
import { Autocomplete } from 'react-native-dropdown-autocomplete';
import { localidadesApi, IBGEUFResponse, IBGECityResponse } from '../../services/AxiosProvider'

interface UF {
  id: number,
  abbreviation: string,
  name: string
}

interface City {
  id: number,
  name: string
}

const Home = () => {
  const navigation = useNavigation();

  const [selectedUF, setSelectedUF] = useState<UF>({} as UF)
  const [selectedCity, setSelectedCity] = useState('')

  const [ufs, setUfs] = useState<UF[]>([]);
  const [cities, setCities] = useState<City[]>([]);


  const [ufQuery, setUFQuery] = useState('')
  const [cityQuery, setCityQuery] = useState('')
  const [filteredUFs, setFilteredUFs] = useState<UF[]>([]);
  const [filteredCities, setFilteredCities] = useState<City[]>([]);

  useEffect(() => {
    localidadesApi.get<IBGEUFResponse[]>('estados', { params: { orderBy: 'nome' } }).then(response => {
      setUfs(response.data.map(uf => {
        return { id: uf.id, name: uf.nome, abbreviation: uf.sigla }
      }))
    });
  }, [])


  useEffect(() => {
    if (selectedUF.abbreviation === '0') return
    localidadesApi.get<IBGECityResponse[]>(`estados/${selectedUF.id}/municipios`, { params: { orderBy: 'nome' } }).then(response => {
      setCities(response.data.map(city => {
        return { id: city.id, name: city.nome }
      }))
    });
  }, [selectedUF])

  useEffect(() => {
    setFilteredUFs(ufs.filter(
      (item: UF) =>
        item.name.toLowerCase().indexOf(ufQuery.toLowerCase()) !== -1)
    );
  }, [ufQuery])

  useEffect(() => {
    setFilteredCities(cities.filter(
      (item: City) =>
        item.name.toLowerCase().indexOf(cityQuery.toLowerCase()) !== -1)
    );
  }, [cityQuery])

  function handleSelectUFItem(item: UF, id: number) {
    setSelectedUF(item)
  }

  function handleSelectCityItem(item: City, id: number) {
    setSelectedCity(item.name)
  }

  function handleNavigateToPoints() {
    navigation.navigate('Points', {
      uf: selectedUF.abbreviation,
      city: selectedCity
    });
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={Platform.OS === 'ios' ? 'padding' : undefined}>
      <ImageBackground
        style={styles.container}
        imageStyle={styles.backgroundImage}
        source={require('../../assets/home-background.png')}>

        <View style={styles.main}>
          <Image source={require('../../assets/logo.png')} />
          <Text style={styles.title}>Seu Marketplace de coleta de resíduos</Text>
          <Text style={styles.description}>Ajudamos pessoas a encontrarem pontos de coleta de forma eficiente.</Text>

        </View>

        <View style={styles.footer}>

          <View style={styles.autocompleteContainer}>
            <SafeAreaView>
              <Autocomplete
                highlightText
                highLightColor='#2FB86E'
                placeholder="Digite o estado"
                noDataText="Nenhum estado foi encontrado"
                scrollStyle={styles.white}
                pickerStyle={styles.picker}
                inputStyle={styles.autoCompleteInput}
                minimumCharactersCount={0}
                handleSelectItem={(item, id) => handleSelectUFItem(item, id)}
                fetchData={async () => filteredUFs}
                valueExtractor={item => item.name}
                onChangeText={setUFQuery}
                rightContent
                rightTextExtractor={item => item.sigla} />
            </SafeAreaView>
          </View>

          <View style={styles.autocompleteContainer}>
            <SafeAreaView>
              <Autocomplete
                highlightText
                highLightColor='#2FB86E'
                placeholder="Digite a cidade"
                noDataText="Nenhuma cidade foi encontrada"
                scrollStyle={styles.white}
                pickerStyle={styles.picker}
                inputStyle={styles.autoCompleteInput}
                minimumCharactersCount={0}
                handleSelectItem={(item, id) => handleSelectCityItem(item, id)}
                fetchData={async () => filteredCities}
                valueExtractor={item => item.name}
                onChangeText={setCityQuery} />
            </SafeAreaView>
          </View>

          <RectButton style={styles.button} onPress={handleNavigateToPoints}>
            <View style={styles.buttonIcon}>
              <Text>
                <Icon name="arrow-right" color="#FFF" size={24} />
              </Text>
            </View>
            <Text style={styles.buttonText}>
              Entrar
            </Text>
          </RectButton>
        </View>

      </ImageBackground>
    </KeyboardAvoidingView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 32,
  },

  backgroundImage: {
    width: 274,
    height: 268
  },

  main: {
    flex: 1,
    justifyContent: 'center',
  },

  title: {
    color: '#322153',
    fontSize: 32,
    fontFamily: 'Ubuntu_700Bold',
    maxWidth: 260,
    marginTop: 64,
  },

  description: {
    color: '#6C6C80',
    fontSize: 16,
    marginTop: 16,
    fontFamily: 'Roboto_400Regular',
    maxWidth: 260,
    lineHeight: 24,
  },

  footer: {},

  select: {},

  input: {
    height: 60,
    backgroundColor: '#FFF',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
  },

  button: {
    backgroundColor: '#34CB79',
    height: 60,
    flexDirection: 'row',
    borderRadius: 10,
    overflow: 'hidden',
    alignItems: 'center',
    marginTop: 8,
  },

  buttonIcon: {
    height: 60,
    width: 60,
    backgroundColor: 'rgba(0, 0, 0, 0.1)',
    justifyContent: 'center',
    alignItems: 'center'
  },

  buttonText: {
    flex: 1,
    justifyContent: 'center',
    textAlign: 'center',
    color: '#FFF',
    fontFamily: 'Roboto_500Medium',
    fontSize: 16,
  },
  autocompleteContainer: {
    zIndex: 1,
  },
  autoCompleteInput: {
    paddingLeft: 24,
    height: 60,
    borderColor: '#FFF',
    backgroundColor: 'white',
    borderRadius: 10,
    marginBottom: 8,
    paddingHorizontal: 24,
    fontSize: 16,
    width: '100%',
  },
  white: {
    borderColor: 'transparent',
  },
  picker: {
    width: '100%',
    borderTopStartRadius: 0,
    borderTopEndRadius: 0,
    borderRadius: 10,
    marginStart: -36,
    marginTop: -12,
    elevation: 0
  }
});