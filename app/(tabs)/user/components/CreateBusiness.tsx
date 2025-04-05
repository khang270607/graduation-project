import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link, useRouter } from 'expo-router';

const CreateBusiness = () => {
  const [companyName, setCompanyName] = useState('');
  const [errors, setErrors] = useState<{ companyName?: string }>({});
  const router = useRouter();

  const validateForm = () => {
    let tempErrors: { companyName?: string } = {};

    // Validation cho Tên công ty
    if (!companyName || companyName.trim().length === 0) {
      tempErrors.companyName = 'Tên công ty không được để trống';
    } else if (companyName.trim().length < 3) {
      tempErrors.companyName = 'Tên công ty phải có ít nhất 3 ký tự';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleCreateBusiness = () => {
    if (validateForm()) {
      // Điều hướng đến trang Thêm vùng và truyền dữ liệu công ty
      router.push({
        pathname: '/user/add-region',
        params: { companyName } as any, // ✅ Ép kiểu tránh lỗi TypeScript
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header tích hợp trực tiếp */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backArrow}>
            <Link href="/user">←</Link>
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

      {/* Form Thêm doanh nghiệp */}
      <Text style={styles.title}>Thêm doanh nghiệp</Text>

      <TextInput
        style={[styles.input, errors.companyName && styles.inputError]}
        placeholder="Tên công ty"
        value={companyName}
        onChangeText={setCompanyName}
        autoCapitalize="words"
      />
      {errors.companyName && <Text style={styles.errorText}>{errors.companyName}</Text>}

      <TouchableOpacity style={styles.createButton} onPress={handleCreateBusiness}>
        <Text style={styles.createButtonText}>Tạo doanh nghiệp</Text>
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

export default CreateBusiness;
