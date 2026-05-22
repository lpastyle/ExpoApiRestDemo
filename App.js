import { useState } from 'react';
import { View, Text, ActivityIndicator, StyleSheet } from 'react-native';
import { fetchMeteoParVille } from './services/weatherService';
import SearchBar    from './components/SearchBar';
import ErreurMessage from './components/ErreurMessage';
import CarteMeteo   from './components/CarteMeteo';

export default function App() {
  const [ville,   setVille]   = useState('');
  const [data,    setData]    = useState(null);
  const [loading, setLoading] = useState(false);
  const [erreur,  setErreur]  = useState(null);

  const handleSearch = async () => {
    if (ville.trim() === '') return;
    setLoading(true);
    setErreur(null);
    setData(null);

    const { data, erreur: err } = await fetchMeteoParVille(ville.trim());
    setData(data);
    setErreur(err);
    setLoading(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.titre}>OpenWeather API</Text>

      <SearchBar
        ville={ville}
        onChangeVille={setVille}
        onSearch={handleSearch}
        loading={loading}
      />

      {loading && (
        <ActivityIndicator size="large" color="#23B2A4" style={{ marginTop: 40 }} />
      )}

      {erreur && !loading && <ErreurMessage message={erreur} />}

      {data && !loading && <CarteMeteo data={data} />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: '#F0F9FF',
               paddingTop: 70, paddingHorizontal: 20 },
  titre:     { fontSize: 32, fontWeight: 'bold', textAlign: 'center',
               marginBottom: 24, color: '#1E3A5F' },
});
