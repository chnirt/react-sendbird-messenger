import React, {
    useContext,
    createContext,
    useLayoutEffect,
    useRef,
} from 'react'
import firebase from 'firebase/app'
import 'firebase/auth'
import 'firebase/firestore'
// import 'firebase/database' // If using Firebase database
// import 'firebase/storage' // If using Firebase storage

import {
    FB_API_KEY,
    FB_AUTH_DOMAIN,
    FB_DB_URL,
    FB_PROJECT_ID,
    FB_STORAGE_BUCKET,
    FB_MESSAGING_SENDER_ID,
    FB_APP_IP,
    FB_MEASUREMENT_ID,
} from '../constants'

const firebaseConfig = {
    apiKey: FB_API_KEY,
    authDomain: FB_AUTH_DOMAIN,
    databaseURL: FB_DB_URL,
    projectId: FB_PROJECT_ID,
    storageBucket: FB_STORAGE_BUCKET,
    messagingSenderId: FB_MESSAGING_SENDER_ID,
    appId: FB_APP_IP,
    measurementId: FB_MEASUREMENT_ID,
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
    // if (process.env.REACT_APP_FIREBASE_CONFIG === undefined) {
    // 	throw new Error('Missing REACT_APP_FIREBASE_CONFIG')
    // }

    const authRef = useRef(null)
    const dbRef = useRef(null)

    useLayoutEffect(() => {
        if (firebase.apps.length === 0) {
            firebase.initializeApp(firebaseConfig)
            authRef.current = firebase.auth()
            dbRef.current = firebase.firestore()
        }
    }, [])

    async function registerFB(displayName, email, password) {
        const result = await authRef.current.createUserWithEmailAndPassword(
            email,
            password
        )
        // console.log(result)

        if (result) {
            authRef.current.currentUser.updateProfile({
                displayName,
            })

            const { user } = result
            const { uid, photoURL, providerId } = user

            // console.log('Sign-in provider: ' + profile.providerId)
            // console.log('  Provider-specific UID: ' + profile.uid)
            // console.log('  Name: ' + profile.displayName)
            // console.log('  Email: ' + profile.email)
            // console.log('  Photo URL: ' + profile.photoURL)
            addUser({
                uid,
                email,
                displayName,
                photoURL,
                providerId,
            })
        }

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

    /**
     *
     * DB
     */

    async function addUser(user) {
        console.log('addUser')

        if (!authRef.current.currentUser) {
            return console.log('Not authorized')
        }

        const { email, ...rest } = user

        const result = await dbRef.current
            .collection('users')
            .doc(email)
            .set({
                ...rest,
                createdAt: firebase.firestore.FieldValue.serverTimestamp(),
                updatedAt: firebase.firestore.FieldValue.serverTimestamp(),
            })

        return result
    }

    async function getUsers({ email = '' }) {
        if (authRef.current) {
            const usersRef = dbRef.current.collection('users')

            const snapshot = await usersRef
                .orderBy(firebase.firestore.FieldPath.documentId())
                .startAt(email)
                .endAt(email + '~')
                .get()

            // snapshot.forEach(function (doc) {
            // 	console.log(doc.id, ' => ', doc.data())
            // })

            return snapshot
        }

        console.log('Not authorized')
        return false
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

        addUser,
        getUsers,
    }
}
