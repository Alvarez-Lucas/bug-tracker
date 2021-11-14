import '../styles/globals.css'
import { UserContext } from '../lib/context'
import { useEffect, useState } from 'react';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth, firestore } from '../lib/firebase';
import { userUserData } from '../lib/hooks';

function MyApp({ Component, pageProps }) {

  const userData = userUserData();

  return (
    <UserContext.Provider value={{userData}}>
      <Component {...pageProps} />
    </UserContext.Provider>
  );
}

export default MyApp
