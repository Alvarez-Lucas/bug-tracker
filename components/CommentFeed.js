import Link from "next/link";
import { useRouter } from "next/router";
import { firestore, auth, serverTimeStamp } from "../lib/firebase";
import {
  useCollection,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";

export default function CommentFeed({ commentData }) {
  return commentData
    ? commentData.map((comment) => (
        <CommentItem comment={comment} key={comment.id} />
      ))
    : null;
}

// an individual comment
function CommentItem({ comment }) {
  const router = useRouter();
  // get username associated with UID

  const ref = firestore.collection("users").doc(comment.data.reporter);

  const [userDoc] = useDocumentData(ref);

  console.log(`username`, userDoc);
  return (
    <>
      <p>{comment.data.comment}</p>
      <p>by {userDoc && userDoc.username}</p>
    </>
  );
}
