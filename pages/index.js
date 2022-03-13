import EventLink from "../components/events/event-list";
import { getFeaturedEvents } from "../helpers/api-util";
import Head from "next/head";

export default function HomePage(props) {
  return (
    <div>
      <Head>
        <title>Home Page</title>
        <meta name="description" content="Find a lot of great events" />
      </Head>
      <EventLink items={props.events} />
    </div>
  );
}

export async function getStaticProps() {
  const featuredEvents = await getFeaturedEvents();

  return {
    props: { events: featuredEvents },
    revalidate: 60,
  };
}
