import { useRouter } from 'expo-router';
import { useState } from 'react';
import { Pressable, Text, TextInput, View } from "react-native";
import { styles } from "../src/styles";
import { createUserWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../src/firebase.config';

export default function NewUser() {
    const [userMail, setUserMail] = useState('');
    const [userPass, setUserPass] = useState('');
    const [userRePass, setUserRePass] = useState('');
    const router = useRouter();

    function newUser() {
        if (userMail === '' || userPass === '' || userRePass === '') {
            alert('Todos os campos devem ser preenchidos.');
            return;
        }

        if (userPass !== userRePass) {
            alert('A senha e a confirmação não são iguais.');
            return;
        }

        createUserWithEmailAndPassword(auth, userMail, userPass)
            .then((userCredential) => {
                const user = userCredential.user;
                alert(`O usuário ${userMail} foi criado. Faça o login.`);
                router.replace('/');
            })
            .catch((error) => {
                const errorMessage = error.message;
                alert(errorMessage);
                router.replace('/');
            });
    }

    return (
        <View style={styles.container}>
            <Text style={styles.formTitle}>Novo Usuário</Text>
            <TextInput 
                style={styles.formInput} 
                placeholder="E-mail de usuário" 
                keyboardType="email-address" 
                autoCapitalize="none" 
                autoComplete="email"   
                value={userMail} 
                onChangeText={setUserMail}
            />
            <TextInput 
                style={styles.formInput} 
                placeholder="Senha de usuário" 
                autoCapitalize="none" 
                secureTextEntry={true}
                value={userPass} 
                onChangeText={setUserPass}
            />
            <TextInput 
                style={styles.formInput} 
                placeholder="Repita a senha" 
                autoCapitalize="none" 
                secureTextEntry={true}
                value={userRePass} 
                onChangeText={setUserRePass}
            />
            <Pressable 
                style={styles.formButton} 
                onPress={newUser}
            >
                <Text style={styles.textButton}>
                    Cadastrar
                </Text>
            </Pressable>
        </View>
    );
}