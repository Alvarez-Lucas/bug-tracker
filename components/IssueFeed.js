import Link from "next/link";

export default function TicketFeed({ tickets }) {
  return tickets
    ? tickets.map((ticket) => <TicketItem ticket={ticket} />)
    : null;
}

function TicketItem({ ticket }) {
  return (
    <>
      <h1>{ticket.title}</h1>
      <p>{ticket.description}</p>
    </>
  );
}
