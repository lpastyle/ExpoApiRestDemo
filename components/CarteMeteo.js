import { View, Text, Image, StyleSheet } from 'react-native';

export default function CarteMeteo({ data }) {
  return (
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
  );
}

const styles = StyleSheet.create({
  carteMeteo:  { backgroundColor: '#CCC', borderRadius: 20,
                 padding: 24, marginTop: 16, alignItems: 'center',
                 shadowColor: '#000', shadowOffset: { width: 0, height: 4 },
                 shadowOpacity: 0.1, shadowRadius: 12, elevation: 6 },
  ville:       { fontSize: 22, fontWeight: 'bold', color: '#1E3A5F' },
  temp:        { fontSize: 72, fontWeight: 'bold', color: '#23B2A4',
                 marginVertical: 8 },
  icone:       { width: 80, height: 80 },
  description: { fontSize: 18, color: '#64748B',
                 textTransform: 'capitalize', marginBottom: 8 },
  ressenti:    { fontSize: 14, color: '#94A3B8' },
});
