// specific ticket under specific project
import TicketView from "../../../../components/TicketView";
import CommentFeed from "../../../../components/CommentFeed";
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

// Firebase call for ticket data
function TicketQuery(ref) {
  const router = useRouter();

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
  // console.log(`ticketData`, ticketData);
  // projects #1 / ticket #1
  return (
    <Container maxWidth="xl">
      {/* Breadcrumbs ? */}
      <TicketGarlicBread
        data={{ ticketData, projectName, projectID, ticketID }}
      />
      <TicketView ticketData={ticketData} />
      <CommentFeed commentData={commentData} />
      <CommentField />
    </Container>
  );
};

export default TicketDetails;
