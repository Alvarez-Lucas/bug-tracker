import Link from "next/link";
import { useRouter } from "next/router";

export default function TicketFeed({ tickets }) {
  return tickets
    ? tickets.map((ticket) => <TicketItem ticket={ticket} />)
    : null;
}

function TicketItem({ ticket }) {
  const router = useRouter();

  return (
    <>
      <h1>{ticket.data.title}</h1>

      <p>{ticket.data.description}</p>
      <button
        type="button"
        onClick={() => {
          router.push({
            pathname: "/[id]",
            query: { id: ticket.id },
          });
        }}
      >
        Test{" "}
      </button>
    </>
  );
}
