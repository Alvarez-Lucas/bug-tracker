import { firestore, auth, serverTimeStamp } from "../lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
// import TicketFeed from "../../components/TicketFeed";
import { UserContext } from "../lib/context";
// import { useRouter } from "next/router";
import { useContext, useState } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import TicketFeed from "../components/TicketFeed";
// import ProjectFeed from "../../components/ProjectFeed";
export default function MyTickets() {
  const { user } = useContext(UserContext);

  const ref = firestore
    .collectionGroup("tickets")
    .where("assignee", "==", "esMQxvEHzcMFGJhFsxEwUsiI8ga2");

  const [query] = useCollection(ref);
  var tickets = [];
  query?.docs.forEach(function (doc) {
    tickets.push({ data: doc.data(), id: doc.id });
  });

  console.log("tickets", tickets);
  return (
    <>
      <TicketFeed tickets={tickets} />
    </>
  );
}
