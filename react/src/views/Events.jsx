import { useEffect, useState } from "react";
import styled from "styled-components";
import Event from "../components/Event";
import Layout from "../components/Layout";
import Pagination from "@mui/material/Pagination";

export default function Events() {
    const [events, setEvents] = useState([]);
    let [page, setPage] = useState(1);
    const postsPerPage = 20;
    const [totalPages, setTotalPages] = useState(1);

    useEffect(() => {
        getEvents();
    }, [page]);

    const getEvents = async () => {
        const api = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events.json?countryCode=PL&size=${postsPerPage}&page=${
                page - 1
            }&apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}`
        );
        const data = await api.json();
        console.log(data);
        setTotalPages(data.page.totalPages);
        setEvents(data._embedded.events);
    };

    const eventList = events.map((event) => (
        <Event key={event.id} event={event} />
    ));

    const handlePaginationChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    };

    return (
        // <Layout>
        <div className="container">
            <Wrapper>{eventList}</Wrapper>
            <Pagination
                count={totalPages}
                page={page}
                onChange={handlePaginationChange}
                shape="rounded"
            />
        </div>
        // </Layout>
    );
}

const Wrapper = styled.div`
    display: flex;
    row-gap: 50px;
    column-gap: 30px;
    flex-wrap: wrap;
`;
