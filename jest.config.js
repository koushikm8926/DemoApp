module.exports = {
  preset: 'react-native',
  transformIgnorePatterns: [
    'node_modules/(?!(react-native|@react-native|@react-navigation|immer|@reduxjs/toolkit|react-redux|redux-persist|@react-native-async-storage)/)',
  ],
};
