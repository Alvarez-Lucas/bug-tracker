// Specific profile
import { withRouter, NextRouter, useRouter } from "next/router";
import {
  useDocument,
  useDocumentData,
  useDocumentOnce,
} from "react-firebase-hooks/firestore";
import {
  firestore,
  auth,
  serverTimeStamp,
  getUserWithUsername,
} from "../../lib/firebase";
import Image from "next/image";
import { GetUserID } from "../../lib/hooks";
import {
  Avatar,
  Box,
  Container,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";

export async function getServerSideProps({ query }) {
  // const { username } = query;
  const username = query.profileID;

  const userDoc = await getUserWithUsername(username);
  let user = null;

  if (userDoc) {
    user = userDoc.data();
  }
  return {
    props: { user },
  };
}
const style = {
  width: "100%",
  maxWidth: 360,
  bgcolor: "background.paper",
};

function UserProfile({ user }) {
  return (
    <Container>
      <Stack direction="row" spacing={2}>
        <Avatar src={user.photoURL} sx={{ width: 64, height: 64 }} />
        <Stack>
          <Typography variant="h4">{user.displayName}</Typography>
          <Typography variant="subtitle1">Software Engineer</Typography>
        </Stack>
      </Stack>
      <Divider />
      <Typography variant="h6">Currently working on</Typography>

      <Box sx={{ width: "100%", maxWidth: 360, bgcolor: "background.paper" }}>
        <List sx={style} component="nav">
          <ListItem disablePadding>
            <ListItemButton>
              <ListItemText primary="Testing" />
            </ListItemButton>
          </ListItem>
        </List>
      </Box>
    </Container>
  );
}

export default UserProfile;
