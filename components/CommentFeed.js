import Link from "next/link";
import { useRouter } from "next/router";
import { firestore, auth, serverTimeStamp } from "../lib/firebase";
import {
  useCollection,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";
import {
  List,
  ListItem,
  Divider,
  ListItemText,
  ListItemAvatar,
  Avatar,
  Typography,
} from "@mui/material";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

export default function CommentFeed({ commentData }) {
  return commentData
    ? commentData.map((comment) => (
        <CommentItem comment={comment} key={comment.id} />
      ))
    : null;
}

// an individual comment
function CommentItem({ comment }) {
  const ref = firestore.collection("users").doc(comment.data.reporter);
  const [userDoc] = useDocumentData(ref);
  // const regex = /^\w*(\s\w*){3}/;
  const regex = /^\w*(\s\w*)(\s\d*){2}/;
  return (
    // <>
    //   <p>{comment.data.comment}</p>
    //   <p>by {userDoc && userDoc.username}</p>
    // </>
    <>
      <List sx={{ width: "100%", bgcolor: "background.paper" }}>
        <ListItem alignItems="flex-start">
          <ListItemAvatar>
            <Avatar>{userDoc && <img src={userDoc.photoURL} />}</Avatar>
          </ListItemAvatar>
          <ListItemText
            primary={
              userDoc &&
              comment.data.creationDate && (
                <>
                  {userDoc.displayName}{" "}
                  <Typography variant="body2" mt={0}>
                    {
                      comment.data.creationDate
                        .toDate()
                        .toString()
                        .match(regex)[0]
                    }
                  </Typography>
                </>
              )
            }
            secondary={
              <>
                <Typography
                  sx={{ display: "inline" }}
                  component="span"
                  variant="body1"
                  color="text.primary"
                >
                  {comment.data.comment}
                </Typography>
              </>
            }
          />
        </ListItem>
        <Divider variant="inset" component="li" />
      </List>
    </>
  );
}
