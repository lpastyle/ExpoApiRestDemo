import { View, Text, StyleSheet } from 'react-native';

export default function ErreurMessage({ message }) {
  return (
    <View style={styles.erreurBox}>
      <Text style={styles.erreurTexte}>⚠️  {message}</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  erreurBox:   { backgroundColor: '#FEE2E2', padding: 16,
                 borderRadius: 12, marginTop: 16 },
  erreurTexte: { color: '#DC2626', textAlign: 'center', fontSize: 15 },
});
