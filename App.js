import React, { useState, useEffect } from 'react';
import { SafeAreaView, View, Text, StyleSheet } from 'react-native';
import messaging from '@react-native-firebase/messaging';

export default () => {
  // Tipos de STATUS:
  // - feito
  // - aceito
  // - enviado
  // - entregue
  const [orderStatus, setOrderStatus] = useState('feito');

  useEffect(()=>{
    // Pedindo permissão de notificação
    const requestNotifPermission = async () => {
      const authStatus = await messaging().requestPermission();
      console.log('Permissão', authStatus);
    }
    requestNotifPermission();

    // Recebendo notificação foreground (app aberto)
    const unsubscribe = messaging().onMessage(async (remoteMessage) => {
      console.log('Recebido no FOREGROUND', remoteMessage);

      if(remoteMessage.data.newStatus) {
        setOrderStatus(remoteMessage.data.newStatus);
      }
    });

    return unsubscribe;
  }, []);

  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.orderTitle}>Pedido 1234</Text>
      <Text>Status:</Text>
      <Text style={styles.orderStatusText}>
        {orderStatus == 'feito' && '#1 Seu pedido foi feito'}
        {orderStatus == 'aceito' && '#2 Seu pedido está sendo preparado'}
        {orderStatus == 'enviado' && '#3 Saiu para entrega'}
        {orderStatus == 'entregue' && '#4 Pedido entregue com sucesso'}
      </Text>
    </SafeAreaView>
  );
}
const styles = StyleSheet.create({
  container:{
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  orderTitle:{
    fontSize: 20,
    marginBottom: 20
  },
  orderStatusText:{
    fontSize: 20
  }
});