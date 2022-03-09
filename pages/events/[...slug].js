import { useRouter } from "next/router";
import { getFilteredEvents } from "../../dummy-data";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";

export default function FilterEventsPage() {
  const router = useRouter();
  const filterEvent = router.query.slug;

  if (!filterEvent) {
    return <p className="center">Loading...</p>;
  }
  const filterYear = +filterEvent[0];
  const filterMonth = +filterEvent[1];

  if (
    isNaN(filterYear) ||
    isNaN(filterMonth) ||
    filterYear > 2030 ||
    filterYear < 2020 ||
    filterMonth < 1 ||
    filterMonth > 12 ||
    filterEvent.length > 2
  ) {
    return (
      <>
        <div>
          <ErrorAlert>
            <p>Invalid Filter. Please try again</p>;
          </ErrorAlert>
          <div className="center">
            <Button link="/events">Show All Events</Button>
          </div>
        </div>
      </>
    );
  }

  const filteredEvents = getFilteredEvents({
    year: filterYear,
    month: filterMonth,
  });

  if (!filteredEvents || filteredEvents.length === 0) {
    return (
      <>
        <ErrorAlert>
          <p>No events found for the chosen filter!</p>
        </ErrorAlert>
        <div className="center">
          <Button link="/events">Show All Events</Button>
        </div>
      </>
    );
  }

  const date = new Date(filterYear, filterMonth - 1);

  return (
    <div>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}
