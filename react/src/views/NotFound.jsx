import React from "react";
import Layout from "../components/Layout";
import Illustration from "../assets/img/not_found.png";

export default function NotFound() {
    return (
        <Layout>
            <div className="not-found">
                <img src={Illustration} />
                <p className="not-found__title title title--40">
                    404 - Page Not Found
                </p>
            </div>
        </Layout>
    );
}
