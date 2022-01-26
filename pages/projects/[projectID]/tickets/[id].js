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
  // Proof of concept
  // async await in use effect
  const [editMode, setEditMode] = useState(false);
  const router = useRouter();
  const ticketID = router.query.id;
  const projectID = router.query.projectID;

  // Proof of concept
  // store fetched data into states
  const [ticketData, setTicketData] = useState();
  const [assigneeUserData, setAssigneeUserData] = useState();
  const [reporterUserData, setReporterUserData] = useState();
  const ref = firestore.doc(`/projects/${projectID}/tickets/${ticketID}`);

  useEffect(() => {
    async function fetchData() {
      try {
        const localTicketData = await ref.get();

        const assigneeRef = firestore.doc(
          `/users/${localTicketData.data().assignee}`
        );
        const reporterRef = firestore.doc(
          `/users/${localTicketData.data().reporter}`
        );

        const assigneeUser = await assigneeRef.get();
        const reporterUser = await reporterRef.get();

        setTicketData(localTicketData.data());

        setAssigneeUserData(assigneeUser.data());
        setReporterUserData(reporterUser.data());
      } catch (e) {}
    }
    fetchData();
  }, [projectID, ticketID]); // call once

  // const ticketData = TicketQuery(ref);
  const commentData = CommentQuery(ref);
  const projectName = ProjectNameQuery(projectID);

  return (
    <Container maxWidth="xl">
      <TicketGarlicBread
        data={{ ticketData, projectName, projectID, ticketID }}
      />
      <TicketView
        ticketData={ticketData}
        assigneeUserData={assigneeUserData}
        reporterUserData={reporterUserData}
      />
      <EditTicket ticketData={ticketData} />
      <CommentField />
      <CommentFeed commentData={commentData} />
    </Container>
  );
};

export default TicketDetails;
