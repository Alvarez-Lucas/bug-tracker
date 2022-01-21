// specific ticket under specific project
import TicketView from "../../../../components/TicketView";
import CommentFeed from "../../../../components/CommentFeed";
import EditTicket from "../../../../components/EditTicket";
import { withRouter, NextRouter, useRouter } from "next/router";
import { firestore, auth, serverTimeStamp } from "../../../../lib/firebase";
import CommentField from "../../../../components/CommentField";
import GetTicketData from "../../../../lib/hooks";
import {
  useCollection,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import { Breadcrumbs, Container } from "@mui/material";
import Link from "next/link";
import { Typography } from "@mui/material";
import TicketGarlicBread from "../../../../components/TicketGarlicBread";
import { useContext, useState, useEffect } from "react";
import { LegendToggle } from "@mui/icons-material";

function AssigneeQuery(userID) {
  const query = firestore.collection("users").doc(userID);
  const [userName] = useDocumentData(query);
  return userName ? userName.username : " ";
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

  const ticketData = router.query;
  const userID = ticketData.assignee;

  const ref = firestore
    .collection("projects")
    .doc(projectID)
    .collection("tickets")
    .doc(ticketID);

  const commentData = CommentQuery(ref);
  const projectName = ProjectNameQuery(projectID);
  const assignee = AssigneeQuery(userID);

  return (
    <Container maxWidth="xl">
      <TicketGarlicBread
        data={{ ticketData, projectName, projectID, ticketID }}
      />
      <TicketView ticketData={ticketData} assignee={assignee} />
      <EditTicket ticketData={ticketData} />
      <CommentField />
      <CommentFeed commentData={commentData} />
    </Container>
  );
};

export default TicketDetails;
