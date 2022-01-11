import Link from "next/link";
import { useRouter } from "next/router";
import { Button, Card, Stack, CssBaseline, Typography } from "@mui/material";
import { styled } from "@mui/material/styles";
import Paper from "@mui/material/Paper";

export default function TicketFeed({ tickets }) {
  return tickets
    ? tickets.map((ticket) => <TicketItem ticket={ticket} key={ticket.id} />)
    : null;
}

function TicketItem({ ticket }) {
  const router = useRouter();

  const Item = styled(Paper)(({ theme }) => ({
    ...theme.typography.body2,
    padding: theme.spacing(1),
    textAlign: "center",
    color: theme.palette.text.secondary,
  }));

  return (
    <Item>
      <Typography variant="h4">{ticket.data.title}</Typography>

      <p>{ticket.data.description}</p>
      <Button
        type="button"
        onClick={() => {
          router.push({
            pathname: "/projects/[projectID]/tickets/[id]",
            query: { projectID: router.query.projectID, id: ticket.id },
          });
        }}
      >
        View{" "}
      </Button>
    </Item>
  );
}
