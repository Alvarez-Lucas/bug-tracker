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
import { Breadcrumbs } from "@mui/material";
import Link from "next/link";
import { Typography } from "@mui/material";

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

  console.log(`comments`, comments);

  return comments;
}

function TicketNameQuery() {
  return;
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
  const ticketName = TicketNameQuery();
  // console.log(`ticketData`, ticketData);

  return (
    <div>
      {/* Breadcrumbs ? */}
      <Breadcrumbs aria-label="breadcrumb">
        <Link underline="hover" color="inherit" href="/">
          MUI
        </Link>
        <Link
          underline="hover"
          color="inherit"
          href="/getting-started/installation/"
        >
          Core
        </Link>
        <Typography color="text.primary">Breadcrumbs</Typography>
      </Breadcrumbs>
      <TicketView ticketData={ticketData} />
      <CommentFeed commentData={commentData} />
      <CommentField />
    </div>
  );
};

export default TicketDetails;
