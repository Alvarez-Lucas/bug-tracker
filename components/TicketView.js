import { firestore, auth, serverTimeStamp } from "../lib/firebase";
import { useContext, useState } from "react";
import {
  useCollection,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { withRouter, NextRouter, useRouter } from "next/router";
import { UserContext } from "../lib/context";
import { Typography, Button, Container, Chip } from "@mui/material";

// Individual Ticket Card
export default function TicketView({ ticketData }) {
  const [editMode, setEditMode] = useState(false);

  return (
    <>
      {!editMode ? (
        ticketData && (
          <Container>
            <Typography variant="h3">
              {ticketData.title} <Chip label={ticketData.status} />
            </Typography>{" "}
            <Typography variant="h4">Description</Typography>
            <Typography variant="body1">{ticketData.description}</Typography>
            <Typography variant="h4">
              Assignee: {ticketData.assignee}
            </Typography>
            <Typography variant="h4">
              priority: {ticketData.priority}
            </Typography>
            <Typography variant="h4">
              reporter: {ticketData.reporter}
            </Typography>
            <Button variant="outlined" onClick={() => setEditMode(true)}>
              Edit mode
            </Button>
          </Container>
        )
      ) : (
        <div>
          <h1> edit mode </h1>

          <Button varient="contained" onClick={() => setEditMode(false)}>
            View mode
          </Button>
        </div>
      )}
    </>
  );
}
