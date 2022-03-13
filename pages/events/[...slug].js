import { useRouter } from "next/router";
import useSWR from "swr";
import EventList from "../../components/events/event-list";
import ResultsTitle from "../../components/events/results-title";
import Button from "../../components/ui/button";
import ErrorAlert from "../../components/ui/error-alert";
import { useState, useEffect } from "react";
import Head from "next/head";

export default function FilterEventsPage() {
  const router = useRouter();
  const filterEvent = router.query.slug;
  const [loadedEvents, setLoadedEvents] = useState();
  const { data, error } = useSWR(
    "https://nextjs-course-b1c96-default-rtdb.europe-west1.firebasedatabase.app/events.json",
    (url) => fetch(url).then((res) => res.json())
  );

  useEffect(() => {
    if (data) {
      const events = [];
      for (const key in data) {
        events.push({
          id: key,
          ...data[key],
        });
      }
      setLoadedEvents(events);
    }
  }, [data]);

  if (!loadedEvents) {
    return <p className="center">Loading...</p>;
  }
  const filterYear = +filterEvent[0];
  const filterMonth = +filterEvent[1];

  const filteredEvents = loadedEvents.filter((event) => {
    const eventDate = new Date(event.date);
    return (
      eventDate.getFullYear() === filterYear &&
      eventDate.getMonth() === filterMonth - 1
    );
  });

  if (
    isNaN(filterYear) ||
    isNaN(filterMonth) ||
    filterYear > 2030 ||
    filterYear < 2020 ||
    filterMonth < 1 ||
    filterMonth > 12 ||
    filterEvent.length > 2 ||
    error
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
      <Head>
        <title>Events from {date}</title>
        <meta name="description" content={`All Events from ${date}`} />
      </Head>
      <ResultsTitle date={date} />
      <EventList items={filteredEvents} />
    </div>
  );
}
