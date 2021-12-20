// Specific profile
import { withRouter, NextRouter, useRouter } from "next/router";
import {
  useDocument,
  useDocumentData,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";
import {
  firestore,
  auth,
  serverTimeStamp,
  getUserWithUsername,
} from "../../lib/firebase";
import Image from "next/image";
import { GetUserID } from "../../lib/hooks";

export async function getServerSideProps({ query }) {
  // const { username } = query;
  const username = query.profileID;

  const userDoc = await getUserWithUsername(username);
  let user = null;

  if (userDoc) {
    user = userDoc.data();
  }
  return {
    props: { user },
  };
}

function UserProfile({ user }) {
  return (
    <div>
      <h1>
        {user.username.charAt(0).toUpperCase()}
        {user.username.slice(1)}
      </h1>

      <img src={user.photoURL} />
      <p>{user.displayName}</p>
    </div>
  );
}

export default UserProfile;
