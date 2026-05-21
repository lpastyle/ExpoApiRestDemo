// App.js — Version 1 : appel basique
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } from '@env';
import axios from 'axios';

const VILLE_TEST = 'Valbonne';

export default function App() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [erreur,  setErreur]  = useState(null);

  const fetchMeteo = async () => {
    setLoading(true);
    setErreur(null);

    try {
      // Axios construit l'URL automatiquement à partir des paramètres 
      const { data: json } = await axios.get(`${OPENWEATHER_BASE_URL}/weather`, {
        params: {
          q:     VILLE_TEST,
          appid: OPENWEATHER_API_KEY,
          units: 'metric',
          lang:  'fr',
        },
      });
      // le JSON est directement parsé par axios
      console.log("Réponse de l'API :", JSON.stringify(json, null, 2));
      setData(json);

    } catch (e) {
      // axios lance automatiquement une exception pour les codes 4xx/5xx
      const message = e.response ? `Erreur HTTP : ${e.response.status}` : e.message;
      setErreur(message);
      console.error('Erreur axios :', e);
    } finally {
      setLoading(false);  // toujours exécuté, succès ou erreur
    }
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity style={styles.bouton} onPress={fetchMeteo}>
        <Text style={styles.boutonTexte}>
          {loading ? 'Chargement...' : 'Fetch'}
        </Text>
      </TouchableOpacity>

      {erreur && <Text style={styles.erreur}>{erreur}</Text>}

      {data && (
        <Text style={styles.resultat}>
          {data.name} : {Math.round(data.main.temp)}°C
          {' '}{data.weather[0].description}
        </Text>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, alignItems: 'center',
               justifyContent: 'center', padding: 20 },
  bouton:    { backgroundColor: '#23B2A4', padding: 16,
               borderRadius: 10 },
  boutonTexte: { color: '#FFF', fontWeight: 'bold', fontSize: 20 },
  erreur:    { color: '#DC2626', marginTop: 20, textAlign: 'center', fontSize: 18 },
  resultat:  { fontSize: 18, marginTop: 20, textAlign: 'center', fontSize: 24 },
});
