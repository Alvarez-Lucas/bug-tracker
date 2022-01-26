// specific ticket under specific project
import TicketView from "../../../../components/TicketView";
import CommentFeed from "../../../../components/CommentFeed";
import EditTicket from "../../../../components/EditTicket";
import { withRouter, NextRouter, useRouter } from "next/router";
import { firestore, auth, serverTimeStamp } from "../../../../lib/firebase";
import CommentField from "../../../../components/CommentField";
import {
  useCollection,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { Breadcrumbs, Container } from "@mui/material";
import Link from "next/link";
import { Typography } from "@mui/material";
import TicketGarlicBread from "../../../../components/TicketGarlicBread";
import { useContext, useEffect, useState } from "react";
import { GetTicketDataAndUsername } from "../../../../lib/hooks";

// Firebase call for ticket data
function TicketQuery(ref) {
  const [ticketData] = useDocumentData(ref);
  return ticketData;
}

// Firebase call for comments
function CommentQuery(ref) {
  const commentQuery = ref.collection("comments").orderBy("creationDate");

  const [commentData] = useCollection(commentQuery);

  var comments = [];
  commentData?.docs.forEach(function (doc) {
    comments.push({ data: doc.data(), id: doc.id });
  });

  return comments;
}

function ProjectNameQuery(projectID) {
  const ref = firestore.collection("projects").doc(projectID);

  const [projectData] = useDocumentData(ref);

  return projectData ? projectData.title : " ";
}

const TicketDetails = () => {
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const ticketID = router.query.id;
  const projectID = router.query.projectID;

  // Proof of concept
  // store fetched data into states
  const [testTicketData, setTestTicketData] = useState();
  const [testUserData, setTestUserData] = useState();

  // Proof of concept
  // async await in use effect
  useEffect(() => {
    async function fetchData() {
      // Tickets
      const ticketRef = firestore.doc(
        "/projects/XsnuP6atBad2HJcU8ooX/tickets/sVese45Im13jT60Nxfsf"
      );
      const localTicketData = await ticketRef.get();

      // Users
      const userRef = firestore.doc(
        `/users/${localTicketData.data().assignee}`
      );
      const localUserData = await userRef.get();

      // Update States
      setTestTicketData(localTicketData.data());
      setTestUserData(localUserData.data());
    }
    fetchData();
  }, []); // call once

  //could have another use effect that monitors the undefined value shit?

  const ref = firestore
    .collection("projects")
    .doc(projectID)
    .collection("tickets")
    .doc(ticketID);

  const ticketData = TicketQuery(ref);
  const commentData = CommentQuery(ref);
  const projectName = ProjectNameQuery(projectID);

  return (
    <Container maxWidth="xl">
      {testTicketData ? (
        <h1>Loaded {testTicketData.assignee}</h1>
      ) : (
        <h1>not loaded</h1>
      )}
      {testUserData ? (
        <h1>Loaded {testUserData.username}</h1>
      ) : (
        <h1>not loaded</h1>
      )}
      <TicketGarlicBread
        data={{ ticketData, projectName, projectID, ticketID }}
      />
      <TicketView ticketData={ticketData} />
      <EditTicket ticketData={ticketData} />
      <CommentField />
      <CommentFeed commentData={commentData} />
    </Container>
  );
};

export default TicketDetails;
