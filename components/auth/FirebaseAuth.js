import initFirebase from '../../firebase/initFirebase'
import { useEffect, useState } from 'react'
import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth'
import firebase from 'firebase/app'
import 'firebase/auth'
import {setUserCookie} from '../../firebase/userCookies'
import {mapUserData} from '../../firebase/mapUserData'


initFirebase()


const FirebaseAuthConfig = {
    signInFlow: 'popup',
    signInOptions: [
        {
            provider: firebase.auth.EmailAuthProvider.PROVIDER_ID,
            requireDisplayName: true,
        },
        firebase.auth.GoogleAuthProvider.PROVIDER_ID
    ],
}