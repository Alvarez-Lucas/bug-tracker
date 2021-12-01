import { firestore, auth, serverTimeStamp } from "../lib/firebase";
import { useContext, useState } from "react";
import {
  useCollection,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { withRouter, NextRouter, useRouter } from "next/router";

const TicketView = () => {
  return (
    <div>
      <TicketQuery />
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
        </div>
      ) : (
        <div>
          <h1> view mode </h1>

          <button onClick={() => setEditMode(false)}>Edit mode</button>
        </div>
      )}
    </>
  );
}

export default TicketView;
