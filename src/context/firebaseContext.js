import React, {
	useContext,
	createContext,
	useLayoutEffect,
	useRef,
} from 'react'
import firebase from 'firebase'

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

const FirebaseContext = createContext()

export function FirebaseProvider({ children }) {
	return (
		<FirebaseContext.Provider value={FirebaseValue()}>
			{children}
		</FirebaseContext.Provider>
	)
}

export const useFirebase = () => useContext(FirebaseContext)

function FirebaseValue() {
	if (process.env.REACT_APP_FIREBASE_CONFIG === undefined) {
		throw new Error('Missing REACT_APP_FIREBASE_CONFIG')
	}

	const authRef = useRef(null)
	const firestoreRef = useRef(null)

	useLayoutEffect(() => {
		if (firebase.apps.length === 0) {
			firebase.initializeApp(firebaseConfig)
		}
		authRef.current = firebase.auth()
		firestoreRef.current = firebase.firestore()

		firebase.auth().onAuthStateChanged(function (user) {
			if (user !== null) {
				// User is signed in.
				user.providerData.forEach(function (profile) {
					console.log('Sign-in provider: ' + profile.providerId)
					console.log('  Provider-specific UID: ' + profile.uid)
					console.log('  Name: ' + profile.displayName)
					console.log('  Email: ' + profile.email)
					console.log('  Photo URL: ' + profile.photoURL)
				})
			} else {
				// No user is signed in.
				console.log('no')
			}
		})
	}, [])

	async function registerFB(displayName, email, password) {
		const result = await authRef.current.createUserWithEmailAndPassword(
			email,
			password
		)
		authRef.current.updateProfile({
			displayName,
		})
		return !!result
	}

	function loginFB(email, password) {
		return authRef.current.signInWithEmailAndPassword(email, password)
	}

	function currentUser() {
		return authRef.current.currentUser
	}

	function logoutFB() {
		return authRef.current.signOut()
	}

	function updateProfileFB(
		displayName = 'Jane Q. User',
		photoURL = 'https://example.com/jane-q-user/profile.jpg'
	) {
		var user = authRef.current.currentUser

		return user
			.updateProfile({
				displayName,
				photoURL,
			})
			.then(function () {
				// Update successful.
			})
			.catch(function (error) {
				// An error happened.
			})
	}

	function updateEmailFB(email = 'user@example.com') {
		var user = authRef.current.currentUser

		return user
			.updateEmail(email)
			.then(function () {
				// Update successful.
			})
			.catch(function (error) {
				// An error happened.
			})
	}

	function sendEmailVerificationFB() {
		var user = authRef.current.currentUser

		return user
			.sendEmailVerification()
			.then(function () {
				// Email sent.
			})
			.catch(function (error) {
				// An error happened.
			})
	}

	function updatePasswordFB(newPassword) {
		var user = authRef.current.currentUser
		// var newPassword = getASecureRandomPassword()

		return user
			.updatePassword(newPassword)
			.then(function () {
				// Update successful.
			})
			.catch(function (error) {
				// An error happened.
			})
	}

	function sendPasswordResetEmailFB(emailAddress, languageCode = 'de') {
		// var emailAddress = 'user@example.com'

		authRef.current.languageCode = languageCode

		return authRef.current
			.sendPasswordResetEmail(emailAddress)
			.then(function () {
				// Email sent.
			})
			.catch(function (error) {
				// An error happened.
			})
	}

	function deleteFB() {
		var user = authRef.current.currentUser

		return user
			.delete()
			.then(function () {
				// User deleted.
			})
			.catch(function (error) {
				// An error happened.
			})
	}

	function reauthenticateWithCredentialFB() {
		var user = authRef.current.currentUser
		var credential

		// Prompt the user to re-provide their sign-in credentials

		return user
			.reauthenticateWithCredential(credential)
			.then(function () {
				// User re-authenticated.
			})
			.catch(function (error) {
				// An error happened.
			})
	}

	return {
		authRef,
		registerFB,
		loginFB,
		currentUser,
		logoutFB,
		updateProfileFB,
		updateEmailFB,
		sendEmailVerificationFB,
		updatePasswordFB,
		sendPasswordResetEmailFB,
		deleteFB,
		reauthenticateWithCredentialFB,
	}
}
