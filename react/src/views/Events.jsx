import { useEffect, useState } from "react";
import styled from "styled-components";
import Event from "../components/Event";

export default function Events() {
    const [events, setEvents] = useState([]);
    const [search, setSearch] = useState("");
    console.log(search);

    useEffect(() => {
        getEvents();
    }, []);

    const getEvents = async () => {
        const api = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=PL&apikey=MQG9xdWEIuZCAp9T7wf7UzyyQAJI0RLe`
        );
        const data = await api.json();
        setEvents(data._embedded.events);
        console.log(data._embedded.events);
    };

    const eventList = events
        .filter((event) => {
            return search.toLowerCase() === ""
                ? event
                : event.name.toLowerCase().includes(search);
        })
        .map((event) => <Event key={event.id} event={event} />);

    return (
        <div className="container">
            <form>
                <label>
                    <input
                        type="text"
                        name="name"
                        onChange={(e) => setSearch(e.target.value)}
                        placeholder="Search"
                        className="search"
                    />
                </label>
            </form>
            <Wrapper>{eventList}</Wrapper>
        </div>
    );
}

const Wrapper = styled.div`
    display: flex;
    row-gap: 50px;
    column-gap: 30px;
    flex-wrap: wrap;
`;
