import { firestore, auth, serverTimeStamp } from "../lib/firebase";
import { useContext, useState } from "react";
import {
  useCollection,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";
const TicketView = () => {
  return (
    <div>
      <TicketQuery />
    </div>
  );
};

function TicketQuery() {
  const ref = firestore
    .collection("projects")
    .doc("kladfjvjkhgbjyhb")
    .collection("tickets")
    .doc("ldfksjkladn");

  const [querySnapshot] = useDocumentData(ref);

  console.log("query this:", querySnapshot);

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
          <h3>Assignee: {querySnapshot.assigneeID}</h3>
          <h3>priority: {querySnapshot.priority}</h3>
          <h3>project:</h3>
          <h3>reporter: {querySnapshot.reporterID}</h3>
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
