// frontend/src/pages/Dashboard.jsx
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import LanguageSelector from '../components/LanguageSelector';
import IssuesList from '../components/IssuesList';
import { mockUser } from '../mockData';
import api from '../services/api'; // ← THIS WAS MISSING!

const Dashboard = () => {
    const navigate = useNavigate();
    const [selectedLang, setSelectedLang] = useState('');
    const [filteredIssues, setFilteredIssues] = useState([]);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    // Get user data from localStorage or fallback to mockUser
    const storedProfile = localStorage.getItem('userProfile');
    const userProfile = storedProfile ? JSON.parse(storedProfile) : mockUser;

    // Extract unique languages from user's skills
    const userLanguages = [...new Set(userProfile.skills.map(s => s.language))];

    // Fetch issues when language changes
    useEffect(() => {
        const fetchIssues = async () => {
            if (selectedLang === undefined) return;

            setLoading(true);
            setError('');
            try {
                const res = await api.get(`/issues/recommend?lang=${selectedLang || ''}`);
                setFilteredIssues(res.data || []);
            } catch (err) {
                setError('Failed to load issues. Please try again.');
                setFilteredIssues([]);
                console.error('API Error:', err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };

        fetchIssues();
    }, [selectedLang]);

    return (
        <div className="py-4">
            {/* Header */}
            <div className="d-flex justify-content-between align-items-center mb-4">
                <div>
                    <h2>Recommended Issues</h2>
                    <p className="text-muted">
                        Hi <strong>{userProfile.githubUsername}</strong>! Here are issues matching your skills.
                    </p>
                </div>
                <button
                    className="btn btn-outline-secondary"
                    onClick={() => navigate('/profile')}
                >
                    Edit Profile
                </button>
            </div>

            {/* Language Filter */}
            <div className="mb-4">
                <LanguageSelector
                    languages={userLanguages}
                    selected={selectedLang}
                    onChange={setSelectedLang}
                />
            </div>

            {/* Loading / Error / Issues */}
            {loading ? (
                <div className="text-center py-5">
                    <div className="spinner-border text-primary" role="status">
                        <span className="visually-hidden">Loading issues...</span>
                    </div>
                    <p className="mt-3 text-muted">Finding the best issues for you...</p>
                </div>
            ) : error ? (
                <div className="alert alert-danger" role="alert">
                    <strong>Oops!</strong> {error}
                </div>
            ) : (
                <IssuesList issues={filteredIssues} />
            )}
        </div>
    );
};

export default Dashboard;