import { getFeaturedEvents } from "../dummy-data";
import EventLink from "../components/events/event-list";
export default function HomePage() {
  const featuredEvents = getFeaturedEvents();

  return (
    <div>
      <EventLink items={featuredEvents} />
    </div>
  );
}
