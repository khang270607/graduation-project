// .eslintrc.js
module.exports = {
  extends: ['expo', 'prettier'],
  plugins: ['prettier', 'react', 'react-native', 'react-hooks'],
  env: {
    browser: true,
    node: true,
    es6: true,
  },
  rules: {
    // Prettier formatting: báo lỗi nếu code không đúng format
    'prettier/prettier': 'error',

    // Quy tắc cho biến không sử dụng
    'no-unused-vars': 'warn',

    // Nếu dùng React 17+ với automatic JSX runtime, tắt các quy tắc sau
    'react/jsx-uses-react': 'off',
    'react/react-in-jsx-scope': 'off',

    // Các quy tắc cho React Hooks
    'react-hooks/rules-of-hooks': 'error',
    'react-hooks/exhaustive-deps': 'warn',

    // Các quy tắc đặc thù cho React Native
    'react-native/no-unused-styles': 'warn',
    'react-native/split-platform-components': 'warn',
    'react-native/no-inline-styles': 'warn',
    'react-native/no-color-literals': 'warn',
    'react-native/no-single-element-style-arrays': 'warn',
  },
  settings: {
    react: {
      version: 'detect', // Tự động phát hiện phiên bản React
    },
  },
}
