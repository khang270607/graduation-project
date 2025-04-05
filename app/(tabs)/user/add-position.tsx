import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';

const AddPosition = () => {
  const [positionName, setPositionName] = useState('');
  const [positionNote, setPositionNote] = useState('');
  const [errors, setErrors] = useState<{ positionName?: string }>({});
  const router = useRouter();

  // Ép kiểu rõ ràng để tránh lỗi TS7053
  const {
    companyName,
    regionName,
    regionNote,
    branchRegion,
    branchNote,
  } = useLocalSearchParams() as {
    companyName?: string;
    regionName?: string;
    regionNote?: string;
    branchRegion?: string;
    branchNote?: string;
  };

  const validateForm = () => {
    let tempErrors: { positionName?: string } = {};

    if (!positionName || positionName.trim().length === 0) {
      tempErrors.positionName = 'Tên chức vụ không được để trống';
    } else if (positionName.trim().length < 3) {
      tempErrors.positionName = 'Tên chức vụ phải có ít nhất 3 ký tự';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddPosition = () => {
    if (validateForm()) {
      router.push({
        pathname: '/user/add-department',
        params: {
          companyName,
          regionName,
          regionNote,
          branchRegion,
          branchNote,
          positionName,
          positionNote,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backArrow}>
            <Link href="/user/add-branch">←</Link>
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

      <Text style={styles.title}>Thêm chức vụ</Text>

      <TextInput
        style={[styles.input, errors.positionName && styles.inputError]}
        placeholder="Tên chức vụ"
        value={positionName}
        onChangeText={setPositionName}
        autoCapitalize="words"
      />
      {errors.positionName && (
        <Text style={styles.errorText}>{errors.positionName}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Ghi chú"
        value={positionNote}
        onChangeText={setPositionNote}
        multiline
      />

      <TouchableOpacity style={styles.createButton} onPress={handleAddPosition}>
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

export default AddPosition;
