// App.js — Version 1 : appel basique
import { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { OPENWEATHER_API_KEY, OPENWEATHER_BASE_URL } from '@env';

const VILLE_TEST = 'Valbonne';

export default function App() {
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [erreur,  setErreur]  = useState(null);

  const fetchMeteo = async () => {
    setLoading(true);
    setErreur(null);

    try {
      // Construction de l'URL avec les paramètres
      const url = `${OPENWEATHER_BASE_URL}/weather` +
        `?q=${VILLE_TEST}` +
        `&appid=${OPENWEATHER_API_KEY}` +
        `&units=metric` +     // température en Celsius
        `&lang=fr`;           // descriptions en français

      // Appel HTTP GET
      const response = await fetch(url);

      // Vérifier le statut HTTP
      if (!response.ok) {
        throw new Error(`Erreur HTTP : ${response.status}`);
      }

      // Parser le JSON
      const json = await response.json();
      console.log("Réponse de l'API :", JSON.stringify(json, null, 2));
      setData(json);

    } catch (e) {
      setErreur(e.message);
      console.error('Erreur fetch :', e);
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
  boutonTexte: { color: '#FFF', fontWeight: 'bold', fontSize: 16 },
  erreur:    { color: '#DC2626', marginTop: 20, textAlign: 'center' },
  resultat:  { fontSize: 18, marginTop: 20, textAlign: 'center' },
});
