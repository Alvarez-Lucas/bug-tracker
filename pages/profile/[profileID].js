// Specific profile
import { withRouter, NextRouter, useRouter } from "next/router";
import {
  useDocument,
  useDocumentData,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";
import { firestore, auth, serverTimeStamp } from "../../lib/firebase";
import Image from "next/image";
import { GetUserID } from "../../lib/hooks";

function UserProfile() {
  // const UID = GetUserID();
  return (
    <div>
      {/* {console.log(`UID`, UID)} */}
      <ProfilePage />
    </div>
  );
}

function ProfilePage() {
  // console.log(`userIDref`, userIDref);
  // if (userID) {
  //   const ref = firestore.collection("users").doc(userID);
  //   const [value, loading, error] = useDocumentData(ref);
  // }
  const router = useRouter();
  const userName = router.query.profileID;
  const userIDref = firestore.collection("usernames").doc(userName);
  const [userID, loading, error] = useDocumentData(userIDref);
  if (!loading) {
    const ref = firestore.collection("users").doc(userID.uid);
    const [value, loading, error] = useDocumentData(ref);

    console.log(`ref`, value);
  }
  console.log(loading);
  return (
    <>
      <h1>Profile Page:</h1>
      {/* <h2>Username: {value && value.username}</h2>
      <h2>Name: {value && value.displayName}</h2>
      <img src={value && value.photoURL}></img> */}
    </>
  );
}

export default UserProfile;
