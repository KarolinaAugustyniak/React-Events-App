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
    let [sort, setSort] = useState("relevance,desc");
    let [categories, setCategories] = useState([]);

    useEffect(() => {
        getEvents();
    }, [page, sort, categories]);

    const getEvents = async () => {
        //load events from category
        let categoryString = "";
        if (categories.length !== 0) {
            categoryString = categories.join("','");
        }
        //fetching events
        const api = await fetch(
            `https://app.ticketmaster.com/discovery/v2/events.json?&${
                categoryString && `classificationName='${categoryString}'`
            }&countryCode=PL&size=${postsPerPage}&page=${
                page - 1
            }&sort=${sort}&apikey=${import.meta.env.VITE_TICKETMASTER_API_KEY}`
        );
        const data = await api.json();
        console.log(data);
        setTotalPages(data.page.totalPages);
        data._embedded && setEvents(data._embedded.events);
    };

    const eventList = events.map((event) => (
        <Event key={event.id} event={event} />
    ));

    const handlePaginationChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    };

    const handleSorting = (event) => {
        setSort(event.target.value);
    };

    const handleCategoryChange = (event) => {
        const { value, checked } = event.target;
        setPage(1);

        if (checked) {
            setCategories((prevCategories) => [...prevCategories, value]);
        } else {
            setCategories((prevCategories) =>
                prevCategories.filter((category) => category !== value)
            );
        }
    };

    console.log(categories);

    return (
        <Layout>
            <div className="container">
                <div className="categories">
                    <label className="categories__box">
                        <p>Music</p>
                        <input
                            type="checkbox"
                            name="category"
                            value="music"
                            onChange={handleCategoryChange}
                        />
                    </label>
                    <label className="categories__box">
                        <p>Sports</p>
                        <input
                            type="checkbox"
                            name="category"
                            value="sports"
                            onChange={handleCategoryChange}
                        />
                    </label>
                    <label className="categories__box">
                        <p>Arts & Theater</p>
                        <input
                            type="checkbox"
                            name="category"
                            value="Arts & Theatre"
                            onChange={handleCategoryChange}
                        />
                    </label>
                    <label className="categories__box">
                        <p>Other</p>
                        <input
                            type="checkbox"
                            name="category"
                            value="miscellaneous"
                            onChange={handleCategoryChange}
                        />
                    </label>
                </div>
                <div className="sort">
                    <p> Sort by</p>
                    <select
                        name="sort"
                        onChange={handleSorting}
                        defaultValue={sort}
                        className="sort__select"
                    >
                        <option value="relevance,desc">Default</option>
                        <option value="name,asc">Name ascending</option>
                        <option value="name,desc">Name descending</option>
                        <option value="date,asc">Date ascending</option>
                        <option value="date,desc">Date descending</option>
                    </select>
                </div>
                <Wrapper>{eventList.length ? eventList : "No results"}</Wrapper>
                {events.length !== 0 && (
                    <Pagination
                        count={totalPages}
                        page={page}
                        onChange={handlePaginationChange}
                        shape="rounded"
                    />
                )}
            </div>
        </Layout>
    );
}

const Wrapper = styled.div`
    display: flex;
    row-gap: 50px;
    column-gap: 30px;
    flex-wrap: wrap;
`;
