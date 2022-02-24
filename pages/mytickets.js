import { firestore, auth, serverTimeStamp } from "../lib/firebase";
import { useCollection } from "react-firebase-hooks/firestore";
// import TicketFeed from "../../components/TicketFeed";
import { UserContext } from "../lib/context";
// import { useRouter } from "next/router";
import { useContext, useState, useEffect } from "react";
import { useDocument } from "react-firebase-hooks/firestore";
import TicketFeed from "../components/TicketFeed";
import { getDocs } from "firebase/firestore";
import {
  Button,
  Card,
  CssBaseline,
  Stack,
  Box,
  Input,
  Typography,
} from "@mui/material";

export default function MyTickets() {
  const { user } = useContext(UserContext);
  const [myTicketData, setMyTicketData] = useState([]);

  useEffect(() => {
    async function fetchData() {
      try {
        const ref = await firestore
          .collectionGroup("tickets")
          .where("assignee", "==", user.uid);
        const query = await getDocs(ref);
        setMyTicketData(
          query.docs.map((doc) => {
            return { data: doc.data(), id: doc.id };
          })
        );
      } catch (e) {}
    }
    fetchData();
  }, [user]);

  return (
    <>
      <Stack spacing={3}>
        <TicketFeed tickets={myTicketData} />
      </Stack>
    </>
  );
}
