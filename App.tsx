import React from 'react';
import { StyleSheet, View, StatusBar } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { enableScreens } from 'react-native-screens';
import AppNavigator from './src/navigation/AppNavigator';
import Footer from './src/components/Footer';
import messaging from '@react-native-firebase/messaging';
import { useEffect } from 'react';
import { Alert, Platform } from 'react-native';
enableScreens();
messaging().setBackgroundMessageHandler(async remoteMessage => {
  console.log('📥 Notificación en segundo plano o cerrada:', remoteMessage);
});
export default function App() {
    useEffect(() => {
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('📩 Nueva notificación!', JSON.stringify(remoteMessage));
      });

      return unsubscribe;
    }, []);
    useEffect(() => {
      // Solicita permisos para notificaciones (iOS, pero útil para todos)
      messaging()
        .requestPermission()
        .then(authStatus => {
          const enabled =
            authStatus === messaging.AuthorizationStatus.AUTHORIZED ||
            authStatus === messaging.AuthorizationStatus.PROVISIONAL;

          if (enabled) {
            console.log('Permisos de notificación habilitados');
          }
        });

      // Obtener el token del dispositivo
      messaging()
        .getToken()
        .then(token => {
          console.log('FCM Token:', token);
          // Aquí puedes enviarlo a tu backend si quieres enviar notificaciones específicas
        });

      // Notificación cuando la app está en primer plano
      const unsubscribe = messaging().onMessage(async remoteMessage => {
        Alert.alert('📬 Nueva notificación', remoteMessage?.notification?.body || 'Sin contenido');
      });

      // Limpia el listener
      return unsubscribe;
    }, []);

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
