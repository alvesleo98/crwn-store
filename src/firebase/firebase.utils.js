import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const config = {
    apiKey: "AIzaSyBVt45E63qN81JiHE1ApEqWwRyc1qQ-iiQ",
    authDomain: "crwn-commerce.firebaseapp.com",
    databaseURL: "https://crwn-commerce.firebaseio.com",
    projectId: "crwn-commerce",
    storageBucket: "crwn-commerce.appspot.com",
    messagingSenderId: "198558451548",
    appId: "1:198558451548:web:84ee08d8229b8ea829a399"
};
 
firebase.initializeApp(config);

//função que extrai dados do usuario autenticado via google e salva no bd
export const createUserProfileDocument = async (userAuth, other_data) => {
    if(!userAuth) return;

    const userRef = firestore.doc(`users/${userAuth.uid}`);
    const snapshot = await userRef.get();

    console.log(snapshot);

    //verifica se existem dados na referencia de usuario
    if(!snapshot.exists){
        const {displayName, email} = userAuth;
        const createdAt = new Date();

        try{
            //realiza a criação do usuario
            await userRef.set({
                displayName,
                email,
                createdAt,
                ...other_data
            })

        } catch(error){
            //caso aconteça um erro imprime mensagem com o erro
            console.log('error creating user', error.message);
        }
    }

    return userRef;
};

//cria a referencia collections e adicionar os produtos no bd
export const addCollectionAndDocuments = async (collectionKey, objectsToAdd) => {
    const collectionRef = firestore.collection(collectionKey);
    
    //objeto que agrupa todos os itens e adiciona ao bd numa requisição só
    const batch = firestore.batch();
    
    objectsToAdd.forEach(obj =>{
        const newDocRef = collectionRef.doc();
        batch.set(newDocRef, obj);
    });

    return await batch.commit();
}

export const convertCollectionsSnapshotToMap = (collections) => {
    const transformedCollections = collections.docs.map(doc =>{
        const { title, items } = doc.data();

        return {
            id: doc.id,
            routeName: encodeURI(title.toLowerCase()),
            title,
            items
        }
    });
    
    return transformedCollections.reduce((accumulator, collection) =>{
        accumulator[collection.title.toLowerCase()] = collection;
        return accumulator;
    }, {});
}

//auth sera necessario quando for realizar operações que necessitam de autenticação
export const auth = firebase.auth();
//firestore sera necessario quando for realizar operações em banco de dados
export const firestore = firebase.firestore();

//autenticação com Google
const provider = new firebase.auth.GoogleAuthProvider();
//abre um pop-up para selecionar uma conta
provider.setCustomParameters({prompt: 'select_account'});

export const signInGoogle = () => {
    auth.signInWithPopup(provider);
}

export default firebase;