import * as React from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import CircularProgress from "@mui/material/CircularProgress";
import { firestore, auth, serverTimeStamp } from "../lib/firebase";
import {
  useCollection,
  useDocument,
  useDocumentData,
} from "react-firebase-hooks/firestore";

// Query usernames and uids
function UsernameQuery() {
  const usernameQuery = firestore.collection("usernames");

  const [usernameData] = useCollection(usernameQuery);

  var users = [];
  usernameData?.docs.forEach(function (doc) {
    users.push({ uid: doc.data().uid, username: doc.id });
  });
  return users;
}

export default function ElectReporter({ reporter, setReporter }) {
  // const [assignee, setAssignee] = React.useState("");
  const [open, setOpen] = React.useState(false);
  const [options, setOptions] = React.useState([]);
  const loading = open && options.length === 0;

  const usernames = UsernameQuery();

  let rep = usernames.find(({ uid }) => uid === reporter);

  React.useEffect(() => {
    let active = true;

    if (!loading) {
      return undefined;
    }

    (async () => {
      if (active) {
        // data
        setOptions(usernames);
      }
    })();

    return () => {
      active = false;
    };
  }, [loading]);

  React.useEffect(() => {
    if (!open) {
      setOptions([]);
    }
  }, [open]);

  return (
    <>
      {rep && (
        <Autocomplete
          defaultValue={rep}
          onChange={(event, value) =>
            value ? setReporter(value.uid) : setReporter("")
          }
          open={open}
          onOpen={() => {
            setOpen(true);
          }}
          onClose={() => {
            setOpen(false);
          }}
          isOptionEqualToValue={(option, value) =>
            option.username === value.username
          }
          getOptionLabel={(option) => option.username}
          options={options}
          loading={loading}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Reporter"
              InputProps={{
                ...params.InputProps,
                endAdornment: (
                  <>
                    {loading ? (
                      <CircularProgress color="inherit" size={20} />
                    ) : null}
                    {params.InputProps.endAdornment}
                  </>
                ),
              }}
            />
          )}
        />
      )}
    </>
  );
}
