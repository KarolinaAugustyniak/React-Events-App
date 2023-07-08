import React from "react";
import Layout from "../components/Layout";
import ProfilePictureUpload from "../components/ProfilePictureUpload";

export default function Settings() {
    return (
        <Layout>
            <div className="settings container">
                <ProfilePictureUpload />
            </div>
        </Layout>
    );
}
