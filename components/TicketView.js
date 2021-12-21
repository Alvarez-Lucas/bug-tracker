import { firestore, auth, serverTimeStamp } from "../lib/firebase";
import { useContext, useState } from "react";
import {
  useCollection,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { withRouter, NextRouter, useRouter } from "next/router";
import { UserContext } from "../lib/context";

// Individual Ticket Card
export default function TicketView({ ticketData }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {!editMode ? (
        ticketData && (
          <div>
            <h3>description: {ticketData.description}</h3>
            <h3>Status: {ticketData.status}</h3>
            <h3>Assignee: {ticketData.assignee}</h3>
            <h3>priority: {ticketData.priority}</h3>
            <h3>project:{ticketData.title}</h3>
            <h3>reporter: {ticketData.reporter}</h3>
            <button onClick={() => setEditMode(true)}>Edit mode</button>
            comments below here
          </div>
        )
      ) : (
        <div>
          <h1> edit mode </h1>

          <button onClick={() => setEditMode(false)}>View mode</button>
        </div>
      )}
    </>
  );
}
