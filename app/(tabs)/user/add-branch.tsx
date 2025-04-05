import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image } from 'react-native';
import { Link, useRouter, useLocalSearchParams } from 'expo-router';
import { SelectList } from 'react-native-dropdown-select-list';

// Định nghĩa kiểu lỗi rõ ràng
type ErrorState = {
  branchRegion?: string;
};

const AddBranch = () => {
  const [branchRegion, setBranchRegion] = useState('');
  const [branchNote, setBranchNote] = useState('');
  const [errors, setErrors] = useState<ErrorState>({});
  const router = useRouter();
  const { companyName, regionName, regionNote } = useLocalSearchParams();

  // Danh sách vùng (lấy từ dữ liệu đã nhập)
  const regions = [regionName];
  const regionData = regions.map(region => ({
    key: region,
    value: region,
  }));

  const validateForm = () => {
    let tempErrors: ErrorState = {};

    // Validation cho Chọn vùng
    if (!branchRegion || branchRegion.trim().length === 0) {
      tempErrors.branchRegion = 'Vùng không được để trống';
    }

    setErrors(tempErrors);
    return Object.keys(tempErrors).length === 0;
  };

  const handleAddBranch = () => {
    if (validateForm()) {
      // Điều hướng đến trang Thêm chức vụ và truyền dữ liệu
      router.push({
        pathname: '/user/add-position',
        params: {
          companyName,
          regionName,
          regionNote,
          branchRegion,
          branchNote,
        },
      });
    }
  };

  return (
    <View style={styles.container}>
      {/* Header tích hợp trực tiếp */}
      <View style={styles.header}>
        <TouchableOpacity>
          <Text style={styles.backArrow}>
            <Link href="/user/add-region">←</Link>
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

      {/* Form Thêm chi nhánh */}
      <Text style={styles.title}>Thêm chi nhánh</Text>

      <SelectList
        setSelected={setBranchRegion}
        data={regionData}
        placeholder="Chọn vùng"
        boxStyles={{
          ...styles.selectBox,
          ...(errors.branchRegion ? styles.inputError : {}),
        }}
        dropdownStyles={styles.dropdown}
        search={false}
        maxHeight={200}
      />

      {errors.branchRegion && <Text style={styles.errorText}>{errors.branchRegion}</Text>}

      <TextInput
        style={styles.input}
        placeholder="Ghi chú"
        value={branchNote}
        onChangeText={setBranchNote}
        multiline
      />

      <TouchableOpacity style={styles.createButton} onPress={handleAddBranch}>
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
  selectBox: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
    padding: 10,
    marginBottom: 10,
  },
  dropdown: {
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 5,
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

export default AddBranch;
