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

const RegisterScreen = () => {
    const [fullName, setFullName] = useState('');
    const [phoneNumber, setPhoneNumber] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [gender, setGender] = useState('');
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

        // Dọn dẹp listener khi component unmount
        return () => {
            keyboardDidShowListener.remove();
            keyboardDidHideListener.remove();
        };
    }, []);

    const validateForm = () => {
        let tempErrors = {};

        // Kiểm tra Họ và tên
        if (!fullName.trim()) {
            tempErrors.fullName = 'Họ và tên không được để trống';
        } else if (!/^[A-Za-zÀ-Ỹà-ỹ\s]{2,50}$/.test(fullName)) {
            tempErrors.fullName = 'Họ và tên chỉ được chứa chữ cái và khoảng trắng';
        }

        // Kiểm tra Số điện thoại (Việt Nam: 10 số, bắt đầu bằng 03x, 05x, 07x, 08x, 09x)
        if (!phoneNumber) {
            tempErrors.phoneNumber = 'Số điện thoại không được để trống';
        } else if (!/^(03|05|07|08|09)[0-9]{8}$/.test(phoneNumber)) {
            tempErrors.phoneNumber = 'Số điện thoại không hợp lệ (phải bắt đầu bằng 03, 05, 07, 08, 09 và có 10 số)';
        }

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

        // Kiểm tra Nhập lại mật khẩu
        if (!confirmPassword) {
            tempErrors.confirmPassword = 'Vui lòng nhập lại mật khẩu';
        } else if (password !== confirmPassword) {
            tempErrors.confirmPassword = 'Mật khẩu không khớp';
        }

        setErrors(tempErrors);
        return Object.keys(tempErrors).length === 0;
    };


    const handleRegister = () => {
        if (validateForm()) {
            console.log('Form is valid, proceed with registration');
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

                <Text style={styles.title}>Đăng ký</Text>

                <TextInput
                    style={[styles.input, errors.fullName && styles.inputError]}
                    placeholder="Họ và tên"
                    value={fullName}
                    onChangeText={setFullName}
                    autoCapitalize="words"
                />
                {errors.fullName && <Text style={styles.errorText}>{errors.fullName}</Text>}

                <TextInput
                    style={[styles.input, errors.phoneNumber && styles.inputError]}
                    placeholder="Số điện thoại"
                    value={phoneNumber}
                    onChangeText={setPhoneNumber}
                    keyboardType="phone-pad"
                />
                {errors.phoneNumber && <Text style={styles.errorText}>{errors.phoneNumber}</Text>}

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

                <TextInput
                    style={[styles.input, errors.confirmPassword && styles.inputError]}
                    placeholder="Nhập lại mật khẩu"
                    value={confirmPassword}
                    onChangeText={setConfirmPassword}
                    secureTextEntry
                />
                {errors.confirmPassword && <Text style={styles.errorText}>{errors.confirmPassword}</Text>}

                <View style={styles.genderContainer}>
                    <Text style={styles.genderLabel}>Giới tính:</Text>
                    <View style={styles.radioGroup}>
                        <TouchableOpacity
                            style={styles.radioOption}
                            onPress={() => setGender('Nam')}
                        >
                            <View style={styles.radioCircle}>
                                {gender === 'Nam' && <View style={styles.selectedRadio} />}
                            </View>
                            <Text style={styles.radioText}>Nam</Text>
                        </TouchableOpacity>
                        <TouchableOpacity
                            style={styles.radioOption}
                            onPress={() => setGender('Nữ')}
                        >
                            <View style={styles.radioCircle}>
                                {gender === 'Nữ' && <View style={styles.selectedRadio} />}
                            </View>
                            <Text style={styles.radioText}>Nữ</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                <TouchableOpacity style={styles.registerButton} onPress={handleRegister}>
                    <Text style={styles.registerButtonText}>Đăng ký</Text>
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
                    Bạn đã có tài khoản?{' '}
                    <Link href="/user/log-in" style={styles.registerLink}>
                        Đăng nhập
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
    genderContainer: {
        marginBottom: 20,
    },
    genderLabel: {
        fontSize: 16,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    radioGroup: {
        flexDirection: 'row',
        justifyContent: 'flex-start',
    },
    radioOption: {
        flexDirection: 'row',
        alignItems: 'center',
        marginRight: 20,
    },
    radioCircle: {
        height: 20,
        width: 20,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: '#007bff',
        alignItems: 'center',
        justifyContent: 'center',
        marginRight: 5,
    },
    selectedRadio: {
        height: 12,
        width: 12,
        borderRadius: 6,
        backgroundColor: '#007bff',
    },
    radioText: {
        fontSize: 16,
    },
    registerButton: {
        backgroundColor: '#28a745',
        padding: 15,
        borderRadius: 5,
        alignItems: 'center',
    },
    registerButtonText: {
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

export default RegisterScreen;