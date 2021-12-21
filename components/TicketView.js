import { firestore, auth, serverTimeStamp } from "../lib/firebase";
import { useContext, useState } from "react";
import {
  useCollection,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { withRouter, NextRouter, useRouter } from "next/router";
import { UserContext } from "../lib/context";

const TicketView = () => {
  return (
    <div>
      <TicketQuery />
      <CreateNewComment />
    </div>
  );
};

function TicketQuery() {
  const router = useRouter();
  const ticketID = router.query.id;
  console.log(`router.query`, router.query);
  const projectID = router.query.projectID;

  const ref = firestore
    .collection("projects")
    .doc(projectID)
    .collection("tickets")
    .doc(ticketID);

  const [querySnapshot] = useDocumentData(ref);

  return querySnapshot ? <Ticket querySnapshot={querySnapshot} /> : null;
}

function Ticket({ querySnapshot }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {!editMode ? (
        <div>
          <h3>description: {querySnapshot.description}</h3>
          <h3>Status: {querySnapshot.status}</h3>
          <h3>Assignee: {querySnapshot.assignee}</h3>
          <h3>priority: {querySnapshot.priority}</h3>
          <h3>project:{querySnapshot.title}</h3>
          <h3>reporter: {querySnapshot.reporter}</h3>
          <button onClick={() => setEditMode(true)}>Edit mode</button>
          {/* comments below here */}
        </div>
      ) : (
        <div>
          <h1> edit mode </h1>

          <button onClick={() => setEditMode(false)}>View mode</button>
        </div>
      )}
    </>
  );
}

// input field and post for user comments
function CreateNewComment() {
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

export default TicketView;
