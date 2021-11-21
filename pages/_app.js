import Layout from "../components/Layout";
import "../styles/globals.css";
import { UserContext } from "../lib/context";
import { useEffect, useState } from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { auth, firestore } from "../lib/firebase";
import { UseUserData } from "../lib/hooks";

function MyApp({ Component, pageProps }) {
  const userData = UseUserData();

  return (
    <UserContext.Provider value={userData}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </UserContext.Provider>
  );
}

export default MyApp;
