import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link, useLocalSearchParams } from 'expo-router';

const AddDepartment = () => {
  const [departmentName, setDepartmentName] = useState('');
  const [departmentNote, setDepartmentNote] = useState('');
  const [errors, setErrors] = useState<{ departmentName?: string }>({});

  // Ép kiểu tạm để tránh lỗi TS khi dùng useLocalSearchParams
  const {
    companyName,
    regionName,
    regionNote,
    branchRegion,
    branchNote,
    positionName,
    positionNote,
  } = useLocalSearchParams() as {
    companyName?: string;
    regionName?: string;
    regionNote?: string;
    branchRegion?: string;
    branchNote?: string;
    positionName?: string;
    positionNote?: string;
  };

  const validateForm = () => {
    let tempErrors: { departmentName?: string } = {};

    if (!departmentName || departmentName.trim().length === 0) {
      tempErrors.departmentName = 'Tên phòng ban không được để trống';
    } else if (departmentName.trim().length < 3) {
      tempErrors.departmentName = 'Tên phòng ban phải có ít nhất 3 ký tự';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddDepartment = () => {
    if (validateForm()) {
      console.log('All data:', {
        companyName,
        region: { regionName, regionNote },
        branch: { branchRegion, branchNote },
        position: { positionName, positionNote },
        department: { departmentName, departmentNote },
      });
      // Sau này có thể gọi API tại đây để lưu dữ liệu
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backArrow}>
            <Link href="/user/add-position">←</Link>
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

      <Text style={styles.title}>Thêm phòng ban</Text>

      <TextInput
        style={[styles.input, errors.departmentName && styles.inputError]}
        placeholder="Tên phòng ban"
        value={departmentName}
        onChangeText={setDepartmentName}
        autoCapitalize="words"
      />
      {errors.departmentName && (
        <Text style={styles.errorText}>{errors.departmentName}</Text>
      )}

      <TextInput
        style={styles.input}
        placeholder="Ghi chú"
        value={departmentNote}
        onChangeText={setDepartmentNote}
        multiline
      />

      <TouchableOpacity style={styles.createButton} onPress={handleAddDepartment}>
        <Text style={styles.createButtonText}>Hoàn tất</Text>
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

export default AddDepartment;
