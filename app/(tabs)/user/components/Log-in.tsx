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

const LoginScreen = () => {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
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
        // Kiểm tra Mật khẩu
        if (!password) {
            tempErrors.password = 'Mật khẩu không được để trống';
        } else if (password.length < 6) {
            tempErrors.password = 'Mật khẩu phải có ít nhất 6 ký tự';
        } else if (!/(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])/.test(password)) {
            tempErrors.password = 'Mật khẩu phải có ít nhất 1 chữ hoa, 1 chữ thường, 1 số và 1 ký tự đặc biệt';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };

    const handleLogin = () => {
        if (validateForm()) {
            console.log('Form is valid, proceed with login');
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

                <Text style={styles.title}>Đăng nhập</Text>

                <TextInput
                    style={[styles.input, errors.email && styles.inputError]}
                    placeholder="Nhập vào Email"
                    value={email}
                    onChangeText={setEmail}
                    keyboardType="email-address"
                    autoCapitalize="none"
                />
                {errors.email && <Text style={styles.errorText}>{errors.email}</Text>}

                <TextInput
                    style={[styles.input, errors.password && styles.inputError]}
                    placeholder="Mật khẩu"
                    value={password}
                    onChangeText={setPassword}
                    secureTextEntry
                />
                {errors.password && <Text style={styles.errorText}>{errors.password}</Text>}

                <TouchableOpacity>
                    <Link href="/user/components/ForgotPassword" style={styles.forgotPasswordLink}>
                        Quên mật khẩu?
                    </Link>
                </TouchableOpacity>

                <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                    <Text style={styles.loginButtonText}>Đăng nhập</Text>
                </TouchableOpacity>

                <View style={styles.dividerContainer}>
                    <View style={styles.divider} />
                    <Text style={styles.dividerText}>hoặc</Text>
                    <View style={styles.divider} />
                </View>

                <View style={styles.socialButtonsContainer}>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image
                            source={{ uri: 'https://img.icons8.com/ios-filled/50/phone.png' }}
                            style={styles.socialIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image
                            source={{ uri: 'https://img.icons8.com/color/48/facebook.png' }}
                            style={styles.socialIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image
                            source={{ uri: 'https://img.icons8.com/color/48/google-logo.png' }}
                            style={styles.socialIcon}
                        />
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.socialButton}>
                        <Image
                            source={{ uri: 'https://img.icons8.com/color/48/microsoft.png' }}
                            style={styles.socialIcon}
                        />
                    </TouchableOpacity>
                </View>

                <Text style={styles.registerPrompt}>
                    Bạn chưa có tài khoản?{' '}
                    <Link href="/user/register" style={styles.registerLink}>
                        Đăng ký ngay
                    </Link>
                </Text>
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
    forgotPasswordLink: {
        color: '#007bff',
        textAlign: 'center',
        marginBottom: 20,
    },
    loginButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    loginButtonText: {
        color: '#fff',
        fontSize: 18,
        fontWeight: 'bold',
    },
    dividerContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginVertical: 20,
    },
    divider: {
        flex: 1,
        height: 1,
        backgroundColor: '#ddd',
    },
    dividerText: {
        marginHorizontal: 10,
        color: '#666',
    },
    socialButtonsContainer: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    socialButton: {
        borderWidth: 1,
        borderColor: '#ddd',
        borderRadius: 5,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    socialIcon: {
        width: 30,
        height: 30,
    },
    registerPrompt: {
        fontSize: 16,
        textAlign: 'center',
        marginTop: 20,
    },
    registerLink: {
        color: '#007bff',
        fontWeight: 'bold',
    },
});

export default LoginScreen;