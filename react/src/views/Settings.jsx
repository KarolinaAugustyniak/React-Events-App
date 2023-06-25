import React from "react";
import Layout from "../components/Layout";
import ProfilePictureUpload from "../components/ProfilePictureUpload";

export default function Settings() {
    const userId = 2;
    return (
        <Layout>
            <div className="settings">
                <ProfilePictureUpload userId={userId} />
            </div>
        </Layout>
    );
}
