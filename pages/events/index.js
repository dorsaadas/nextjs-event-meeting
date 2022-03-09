import { getAllEvents } from "../../dummy-data";
import { useRouter } from "next/router";
import EventList from "../../components/events/event-list";
import EventSearch from "../../components/events/event-search";

export default function EventsPage() {
  const events = getAllEvents();
  const router = useRouter();

  function findEventHandler(year, month) {
    const fullPath = `events/${year}/${month}`;
    router.push(fullPath);
  }

  return (
    <>
      <h1 className="center margin">All Events</h1>
      <EventSearch onSearch={findEventHandler} />
      <EventList items={events} />
    </>
  );
}
