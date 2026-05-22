import { View, TextInput, TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function SearchBar({ ville, onChangeVille, onSearch, loading }) {
  return (
    <View style={styles.searchRow}>
      <TextInput
        style={styles.input}
        placeholder="Nom de la ville..."
        value={ville}
        onChangeText={onChangeVille}
        onSubmitEditing={onSearch}
        returnKeyType="search"
        autoCorrect={false}
      />
      <TouchableOpacity
        style={styles.btnSearch}
        onPress={onSearch}
        disabled={loading}
      >
        <Text style={styles.btnSearchTexte}>CALL</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  searchRow:      { flexDirection: 'row', gap: 8, marginBottom: 20 },
  input:          { flex: 1, height: 50, borderWidth: 1.5,
                    borderColor: '#93C5FD', borderRadius: 12,
                    paddingHorizontal: 16, fontSize: 16,
                    backgroundColor: '#FFF' },
  btnSearch:      { width: 70, height: 50, backgroundColor: '#23B2A4',
                    borderRadius: 12, alignItems: 'center',
                    justifyContent: 'center' },
  btnSearchTexte: { fontSize: 20 },
});
