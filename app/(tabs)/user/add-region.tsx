import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';

const AddRegion = () => {
  const [regionName, setRegionName] = useState('');
  const [regionNote, setRegionNote] = useState('');
  const [errors, setErrors] = useState<{ regionName?: string }>({});

  const router = useRouter();

  const { companyName } = useLocalSearchParams() as { companyName?: string };

  const validateForm = () => {
    let tempErrors: { regionName?: string } = {};

    if (!regionName || regionName.trim().length === 0) {
      tempErrors.regionName = 'Tên vùng không được để trống';
    } else if (regionName.trim().length < 3) {
      tempErrors.regionName = 'Tên vùng phải có ít nhất 3 ký tự';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddRegion = () => {
    if (validateForm()) {
      router.push({
        pathname: '/user/add-branch',
        params: {
          companyName,
          regionName,
          regionNote,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backArrow}>
            <Link href="/user/create-business">←</Link>
          </Text>
        </TouchableOpacity>
        <View style={styles.flagContainer}>
          <Image
            source={{ uri: 'https://flagcdn.com/w20/vn.png' }}
            style={styles.flag}
          />
          <Text style={styles.language}>VN</Text>
        </View>
      </View>

      <Text style={styles.title}>Thêm vùng</Text>

      <TextInput
        style={[styles.input, errors.regionName && styles.inputError]}
        placeholder="Tên vùng"
        value={regionName}
        onChangeText={setRegionName}
        autoCapitalize="words"
      />
      {errors.regionName && <Text style={styles.errorText}>{errors.regionName}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Ghi chú"
        value={regionNote}
        onChangeText={setRegionNote}
        multiline
      />

      <TouchableOpacity style={styles.createButton} onPress={handleAddRegion}>
        <Text style={styles.createButtonText}>Tiếp tục</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  backArrow: {
    fontSize: 24,
    color: '#000',
  },
  flagContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  flag: {
    width: 20,
    height: 20,
    marginRight: 5,
  },
  language: {
    fontSize: 16,
    color: '#000',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    fontSize: 16,
    marginBottom: 10,
  },
  inputError: {
    borderColor: 'red',
  },
  errorText: {
    color: 'red',
    fontSize: 12,
    marginBottom: 10,
  },
  createButton: {
    backgroundColor: '#28a745',
    padding: 15,
    borderRadius: 5,
    alignItems: 'center',
  },
  createButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default AddRegion;
