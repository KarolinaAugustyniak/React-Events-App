import { useEffect, useState } from "react";
import styled from "styled-components";
import Event from "../components/Event";
import Layout from "../components/Layout";
import Pagination from "@mui/material/Pagination";
import CategoryBox from "../components/CategoryBox";

import MusicImage from "../assets/img/undraw_compose_music.svg";
import SportsImage from "../assets/img/undraw_home_run.svg";
import ArtsImage from "../assets/img/undraw_making_art.svg";
import OtherImage from "../assets/img/undraw_woman.svg";

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
            }&countryCode=PL&size=${postsPerPage}&page=${page - 1}&sort=${sort}&apikey=${
                import.meta.env.VITE_TICKETMASTER_API_KEY
            }`
        );
        const data = await api.json();
        console.log(data);
        setTotalPages(data.page.totalPages);
        data._embedded && setEvents(data._embedded.events);
    };

    const eventList = events.map(event => <Event key={event.id} event={event} />);

    const handlePaginationChange = (event, value) => {
        setPage(value);
        window.scrollTo(0, 0);
    };

    const handleSorting = event => {
        setSort(event.target.value);
    };

    const handleCategoryChange = event => {
        const { value, checked } = event.target;
        setPage(1);

        if (checked) {
            setCategories(prevCategories => [...prevCategories, value]);
        } else {
            setCategories(prevCategories => prevCategories.filter(category => category !== value));
        }
    };

    return (
        <Layout>
            <div className="container">
                <div className="categories ">
                    <CategoryBox
                        label="Music"
                        imgSrc={MusicImage}
                        handleCategoryChange={handleCategoryChange}
                        isActive={categories.length == 0 || categories.includes("Music")}
                    />
                    <CategoryBox
                        label="Sports"
                        imgSrc={SportsImage}
                        handleCategoryChange={handleCategoryChange}
                        isActive={categories.length == 0 || categories.includes("Sports")}
                    />
                    <CategoryBox
                        label="Arts & Theater"
                        imgSrc={ArtsImage}
                        handleCategoryChange={handleCategoryChange}
                        isActive={categories.length == 0 || categories.includes("Arts & Theater")}
                    />
                    <CategoryBox
                        label="Other"
                        imgSrc={OtherImage}
                        handleCategoryChange={handleCategoryChange}
                        isActive={categories.length == 0 || categories.includes("Other")}
                    />
                </div>
                <div className="sort">
                    <p> Sort by</p>
                    <select name="sort" onChange={handleSorting} defaultValue={sort} className="sort__select">
                        <option value="relevance,desc">Default</option>
                        <option value="name,asc">Name ascending</option>
                        <option value="name,desc">Name descending</option>
                        <option value="date,asc">Date ascending</option>
                        <option value="date,desc">Date descending</option>
                    </select>
                </div>
                <Wrapper>{eventList.length ? eventList : "No results"}</Wrapper>
                {events.length !== 0 && (
                    <Pagination count={totalPages} page={page} onChange={handlePaginationChange} shape="rounded" />
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
