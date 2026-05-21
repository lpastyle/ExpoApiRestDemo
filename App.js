import { useState } from 'react';
import {
  View, Text, TextInput, TouchableOpacity,
  ActivityIndicator, Image, Keyboard, StyleSheet
} from 'react-native';
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } from '@env';
import axios from 'axios';

export default function App() {
  const [ville,   setVille]   = useState('');
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [erreur,  setErreur]  = useState(null);

  const fetchMeteo = async () => {
    if (ville.trim() === '') return;
    Keyboard.dismiss();   // ferme le clavier
    setLoading(true);
    setErreur(null);
    setData(null);        // efface les données précédentes

    try {
      const { data: json } = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
        params: {
          q:     ville.trim(),
          appid: OPENWEATHER_API_KEY,
          units: 'metric',
          lang:  'fr',
        },
      });

      setData(json);

    } catch (e) {
      const status = e.response?.status;
      if (status === 404) setErreur(`Ville "${ville}" introuvable`);
      else if (status === 401) setErreur('Clé API invalide ou non activée');
      else setErreur(e.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>OpenWeather API</Text>

      {/* Zone de recherche */}
      <View style={styles.searchRow}>
        <TextInput
          style={styles.input}
          placeholder="Nom de la ville..."
          value={ville}
          onChangeText={setVille}
          onSubmitEditing={fetchMeteo}
          returnKeyType="search"
          autoCorrect={false}
        />
        <TouchableOpacity
          style={styles.btnSearch}
          onPress={fetchMeteo}
          disabled={loading}
        >
          <Text style={styles.btnSearchTexte}>CALL</Text>
        </TouchableOpacity>
      </View>

      {/* Spinner de chargement */}
      {loading && (
        <ActivityIndicator size="large" color="#23B2A4" style={{ marginTop: 40 }} />
      )}

      {/* Message d'erreur */}
      {erreur && !loading && (
        <View style={styles.erreurBox}>
          <Text style={styles.erreurTexte}>⚠️  {erreur}</Text>
        </View>
      )}

      {/* Données météo */}
      {data && !loading && (
        <View style={styles.carteMeteo}>
          <Text style={styles.ville}>
            {data.name}, {data.sys.country}
          </Text>
          <Text style={styles.temp}>
            {Math.round(data.main.temp)}°C
          </Text>
          <Image
            style={styles.icone}
            source={{ uri: `https://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png` }}
          />
          <Text style={styles.description}>
            {data.weather[0].description}
          </Text>
          <Text style={styles.ressenti}>
            Ressenti : {Math.round(data.main.feels_like)}°C
          </Text>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container:    { flex: 1, backgroundColor: '#F0F9FF',
                  paddingTop: 70, paddingHorizontal: 20 },
  titre:        { fontSize: 32, fontWeight: 'bold', textAlign: 'center',
                  marginBottom: 24, color: '#1E3A5F' },
  searchRow:    { flexDirection: 'row', gap: 8, marginBottom: 20 },
  input:        { flex: 1, height: 50, borderWidth: 1.5,
                  borderColor: '#93C5FD', borderRadius: 12,
                  paddingHorizontal: 16, fontSize: 16,
                  backgroundColor: '#FFF' },
  btnSearch:    { width: 70, height: 50, backgroundColor: '#23B2A4',
                  borderRadius: 12, alignItems: 'center',
                  justifyContent: 'center' },
  btnSearchTexte: { fontSize: 20 },
  erreurBox:    { backgroundColor: '#FEE2E2', padding: 16,
                  borderRadius: 12, marginTop: 16 },
  erreurTexte:  { color: '#DC2626', textAlign: 'center', fontSize: 15 },
  carteMeteo:   { backgroundColor: '#CCC', borderRadius: 20,
                  padding: 24, marginTop: 16, alignItems: 'center',
                  shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
                  shadowOpacity: 0.1, shadowRadius: 12, elevation: 6 },
  ville:        { fontSize: 22, fontWeight: 'bold', color: '#1E3A5F' },
  temp:         { fontSize: 72, fontWeight: 'bold', color: '#23B2A4',
                  marginVertical: 8 },
  icone:        { width: 80, height: 80 },
  description:  { fontSize: 18, color: '#64748B',
                  textTransform: 'capitalize', marginBottom: 8 },
  ressenti:     { fontSize: 14, color: '#94A3B8' },
});
