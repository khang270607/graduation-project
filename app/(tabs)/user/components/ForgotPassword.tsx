import React, { useState, useEffect } from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Image,
    ScrollView,
    KeyboardAvoidingView,
    Platform,
    Keyboard,
} from 'react-native';
import { Link } from 'expo-router';

const ForgotPasswordScreen = () => {
    const [email, setEmail] = useState('');
    const [errors, setErrors] = useState({});
    const [keyboardVisible, setKeyboardVisible] = useState(false);

    // Theo dõi trạng thái bàn phím
    useEffect(() => {
        const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', () => {
            setKeyboardVisible(true);
        });
        const keyboardDidHideListener = Keyboard.addListener('keyboardDidHide', () => {
            setKeyboardVisible(false);
        });

        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const validateForm = () => {
        let tempErrors = {};

        // Kiểm tra Email
        if (!email.trim()) {
            tempErrors.email = 'Email không được để trống';
        } else if (!/^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/.test(email)) {
            tempErrors.email = 'Email không hợp lệ (định dạng đúng: example@domain.com)';
        }
        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleResetPassword = () => {
        if (validateForm()) {
            console.log('Form is valid, proceed with password reset');
            // Thêm logic gửi yêu cầu đặt lại mật khẩu ở đây (ví dụ: gọi API)
        }
    };

    return (
        <KeyboardAvoidingView
            style={styles.container}
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            keyboardVerticalOffset={Platform.OS === 'ios' ? 0 : -100}
        >
            <ScrollView
                contentContainerStyle={[
                    styles.scrollContent,
                    { paddingBottom: keyboardVisible ? 300 : 40 }, // Tăng chiều cao thêm 1000px khi bàn phím hiển thị
                ]}
                showsVerticalScrollIndicator={true}
                keyboardShouldPersistTaps="handled"
            >
                <View style={styles.header}>
                    <TouchableOpacity>
                        <Text style={styles.backArrow}>
                            <Link href="/user/log-in">←</Link> {/* Quay lại màn hình đăng nhập */}
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

                <Text style={styles.title}>Quên mật khẩu</Text>

                <Text style={styles.instruction}>
                    Nhập email của bạn để đặt lại mật khẩu
                </Text>

                <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    placeholder="Nhập vào Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <TouchableOpacity style={styles.resetButton} onPress={handleResetPassword}>
                    <Text style={styles.resetButtonText}>Gửi yêu cầu</Text>
                </TouchableOpacity>
            </ScrollView>
        </KeyboardAvoidingView>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
    },
    scrollContent: {
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
    instruction: {
        fontSize: 16,
        color: '#666',
        textAlign: 'center',
        marginBottom: 20,
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
    resetButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    resetButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default ForgotPasswordScreen;