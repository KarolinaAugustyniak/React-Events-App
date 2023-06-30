import React from "react";
import Layout from "../components/Layout";
import ProfilePictureUpload from "../components/ProfilePictureUpload";
// import { useStateContext } from "../contexts/ContextProvider";

export default function Settings() {
    // const userId = 2;
    // const { user } = useStateContext();

    return (
        <Layout>
            <div className="settings">
                <ProfilePictureUpload />
            </div>
        </Layout>
    );
}
