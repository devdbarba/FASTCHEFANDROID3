import { useState } from 'react';
import { StatusBar } from 'expo-status-bar';
import { Pressable, Text, TextInput, View } from 'react-native';
import { styles } from '../src/styles';
import { auth } from '../src/firebase.config';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { useRouter } from 'expo-router';

export default function App() {
  const [userMail, setUserMail] = useState('');
  const [userPass, setUserPass] = useState('');
  const router = useRouter();

  function newUser() {
    router.replace('/newUser');
  }

  function userLogin() {
    signInWithEmailAndPassword(auth, userMail, userPass)
    .then((userCredential) => { 
      const user  = userCredential.user;
      router.replace('/home');


    })

    .catch((error) => {
      const errorCode = error.code;
      const errorMessage = error.Message;
      alert(errorMessage);
    })
  }

  return (
    <View style={styles.container}>
      <Text style={styles.formTitle}>Login no sistema</Text>
      <TextInput 
           style={styles.formInput} 
           placeholder="Informe o E-mail" 
           keyboardType="email -address" 
           autoCapitalize="none" 
           autoComplete="email" 
           value={userMail} 
           onChangeText={setUserMail} 
           />
      <TextInput 
           style={styles.formInput} 
           placeholder="Informe a Senha" 
           autoCapitalize="none" 
           secureTextEntry 
           value={userPass} 
           onChangeText={setUserPass} 
           />
      <Pressable style={styles.formButton} onPress={userLogin}>
        <Text style={styles.buttonText}>Logar</Text> {/* Corrigido para aplicar o estilo adequado no texto */}
      </Pressable>
      <View style={styles.subContainer}>
        <Pressable style={styles.subButton}>
          <Text style={styles.subTextButton}>Esqueci a senha</Text> 
        </Pressable>
        <Pressable style={styles.subButton}>
          <Text 
            style={styles.subTextButton} 
            onPress={newUser}
          >
            Cadastrar
          </Text>
        </Pressable>
      </View>
      <StatusBar style="auto" />
    </View>
  );
}
