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
import { useContext, useState } from "react";

// Firebase call for ticket data
async function TicketQuery(ref) {
  const router = useRouter();

  const [ticketData] = await useDocumentData(ref);

  // THIS PART IS BROKEN, AWAITING FOR TICKETDATA
  const newRef = await firestore.collection("users").doc(ticketData.assignee);
  const [userData] = useDocumentData(newRef);
  console.log(`userData`, userData);

  return ticketData, userData;
}

// async function UsernameQuery(uid) {
//   const ref = await firestore.collection("users").doc(uid.assignee);
//   const [userData] = useDocumentData(ref);
//   console.log(`userData`, userData);
//   return userData ? userData : " ";
// }

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

  const ref = firestore
    .collection("projects")
    .doc(projectID)
    .collection("tickets")
    .doc(ticketID);

  const ticketData = TicketQuery(ref);
  const commentData = CommentQuery(ref);
  const projectName = ProjectNameQuery(projectID);
  // const userData = UsernameQuery(ticketData.assignee);
  // ticketData ? UsernameQuery(ticketData.assignee) : console.log(`loading`);

  // const userData = UsernameQuery(ticketData);
  // console.log(`ticketData`, ticketData.assignee);
  // projects #1 / ticket #1
  return (
    <Container maxWidth="xl">
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
