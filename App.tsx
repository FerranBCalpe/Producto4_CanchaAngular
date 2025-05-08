import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './src/navigation/AppNavigator';
import Footer from './src/components/Footer';

enableScreens();

export default function App() {
  return (
    <SafeAreaProvider>
      <View style={styles.container}>
        {/* Configuración de la StatusBar de React Native */}
        <StatusBar barStyle="light-content" backgroundColor="transparent" translucent={true} />

        <AppNavigator />

        {/* Franja vertical roja */}
        <View style={styles.redStripe} />

        <Footer />
      </View>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    position: 'relative',
  },
  redStripe: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    left: 16,
    width: 60, // o el ancho que veas bien visualmente
    backgroundColor: '#C02A2D',
    zIndex: -1,
  },
});
