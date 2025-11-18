// frontend/src/pages/ProfilePage.jsx
import React from "react";
import { useNavigate } from "react-router-dom";
import ProfileForm from "../components/ProfileForm";

const ProfilePage = () => {
    const navigate = useNavigate();

    const handleSave = () => {
        // In real app: save to backend first
        navigate("/dashboard");
    };

    return (
        <div className="row justify-content-center mt-5">
            <div className="col-md-8 col-lg-6">
                <div className="text-center mb-4">
                    <h1>Welcome!</h1>
                    <p className="text-muted">
                        Tell us about your skills to get personalized GitHub issues
                    </p>
                </div>
                <ProfileForm onSave={handleSave} />
            </div>
        </div>
    );
};

export default ProfilePage;
