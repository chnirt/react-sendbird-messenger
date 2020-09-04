import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
	apiKey: 'AIzaSyCFfq-lMjI9ekYrcNpW6LH9r9P5k62GHls',
	authDomain: 'sendbird-981b4.firebaseapp.com',
	databaseURL: 'https://sendbird-981b4.firebaseio.com',
	projectId: 'sendbird-981b4',
	storageBucket: 'sendbird-981b4.appspot.com',
	messagingSenderId: '135218547215',
	appId: '1:135218547215:web:f90088d7472486a77bf17a',
	measurementId: 'G-MFSVF1CFGK',
}


firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();