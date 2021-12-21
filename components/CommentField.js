import { firestore, auth, serverTimeStamp } from "../lib/firebase";
import { useContext, useState } from "react";
import {
  useCollection,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { withRouter, NextRouter, useRouter } from "next/router";
import { UserContext } from "../lib/context";

// input field and post for user comments
export default function CommentField() {
  const router = useRouter();
  const [comment, setComment] = useState("");
  const projectID = router.query.projectID;
  const ticketID = router.query.id;
  const { user } = useContext(UserContext);
  console.log(`user`, user);

  const createComment = async (e) => {
    e.preventDefault();
    const ref = firestore
      .collection("projects")
      .doc(projectID)
      .collection("tickets")
      .doc(ticketID)
      .collection("comments")
      .doc();

    const data = {
      creationDate: serverTimeStamp(),
      reporter: user.uid,
      comment,
    };

    await ref.set(data);
  };

  return (
    <form onSubmit={createComment}>
      <h1>Comment</h1>
      <input value={comment} onChange={(e) => setComment(e.target.value)} />
      <button type="submit">Create New Comment</button>
    </form>
  );
}
