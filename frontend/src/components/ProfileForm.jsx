// frontend/src/components/ProfileForm.jsx
import React, { useState, useEffect } from 'react';
import { mockUser } from '../mockData';
import api from '../services/api';

const LANGUAGES = ['Python', 'JavaScript', 'Java', 'C++', 'Go', 'Ruby'];
const FRAMEWORKS = {
    Python: ['Flask', 'Django', 'FastAPI', 'NumPy', 'Pandas'],
    JavaScript: ['React', 'Node.js', 'Express', 'Vue', 'Angular'],
    Java: ['Spring Boot', 'Hibernate'],
    C__: ['STL', 'Qt'],
    Go: ['Gin', 'Echo'],
    Ruby: ['Rails', 'Sinatra']
};

const ProfileForm = ({ onSave }) => {
    const [githubUsername, setGithubUsername] = useState('');
    const [skills, setSkills] = useState([]);
    const [loading, setLoading] = useState(false);
    const [usernameStatus, setUsernameStatus] = useState(null); // null, 'checking', 'valid', 'invalid'

    useEffect(() => {
        setSkills([{ language: '', frameworks: [], level: 'beginner' }]);
    }, []);

    // VERIFY GITHUB USERNAME
    const verifyGitHubUsername = async (username) => {
        if (!username.trim()) {
            setUsernameStatus(null);
            return;
        }

        setUsernameStatus('checking');
        try {
            const res = await fetch(`https://api.github.com/users/${username}`);
            if (res.ok) {
                setUsernameStatus('valid');
            } else {
                setUsernameStatus('invalid');
            }
        } catch (err) {
            setUsernameStatus('invalid');
        }
    };

    const addSkill = () => {
        setSkills([...skills, { language: '', frameworks: [], level: 'beginner' }]);
    };

    const updateSkill = (index, field, value) => {
        const newSkills = [...skills];
        if (field === 'language') {
            newSkills[index] = { language: value, frameworks: [], level: 'beginner' };
        } else {
            newSkills[index][field] = value;
        }
        setSkills(newSkills);
    };

    const removeSkill = (index) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // VALIDATION
        if (!githubUsername.trim()) {
            alert('GitHub username is required!');
            setLoading(false);
            return;
        }
        if (usernameStatus !== 'valid') {
            alert('Please enter a valid GitHub username!');
            setLoading(false);
            return;
        }
        if (skills.some(s => !s.language)) {
            alert('All skills must have a language!');
            setLoading(false);
            return;
        }

        try {
            // REAL SAVE — BACKEND IS READY!
            await api.put('/profile', { githubUsername, skills });

            // Optional: Save to localStorage as backup
            localStorage.setItem('userProfile', JSON.stringify({ githubUsername, skills }));

            onSave?.(); // Redirect to dashboard
        } catch (err) {
            const msg = err.response?.data?.message || 'Save failed!';
            alert(msg);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="card shadow-sm p-4">
            <h3 className="mb-4">Complete Your Profile</h3>
            <form onSubmit={handleSubmit}>

                {/* GITHUB USERNAME */}
                <div className="mb-4">
                    <label className="form-label fw-bold">GitHub Username</label>
                    <div className="input-group">
                        <span className="input-group-text">@</span>
                        <input
                            type="text"
                            className={`form-control ${usernameStatus === 'valid' ? 'is-valid' : ''} ${usernameStatus === 'invalid' ? 'is-invalid' : ''}`}
                            placeholder="e.g., prajwalMangaji"
                            value={githubUsername}
                            onChange={(e) => setGithubUsername(e.target.value)}
                            onBlur={(e) => verifyGitHubUsername(e.target.value)}
                            required
                        />
                        {usernameStatus === 'checking' && (
                            <span className="input-group-text">
                                <div className="spinner-border spinner-border-sm" role="status">
                                    <span className="visually-hidden">Checking...</span>
                                </div>
                            </span>
                        )}
                        {usernameStatus === 'valid' && (
                            <span className="input-group-text text-success">✓</span>
                        )}
                        {usernameStatus === 'invalid' && (
                            <span className="input-group-text text-danger">✗</span>
                        )}
                    </div>
                    <div className="form-text">
                        {usernameStatus === 'invalid' ? (
                            <small className="text-danger">User not found on GitHub</small>
                        ) : (
                            'Used to verify your PRs later'
                        )}
                    </div>
                </div>

                {/* SKILLS */}
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label fw-bold">Your Skills</label>
                        <button type="button" className="btn btn-outline-primary btn-sm" onClick={addSkill}>
                            + Add Skill
                        </button>
                    </div>

                    {skills.map((skill, index) => (
                        <div key={index} className="border rounded p-3 mb-3 bg-light">
                            <div className="row g-2">
                                <div className="col-md-4">
                                    <select
                                        className="form-select"
                                        value={skill.language}
                                        onChange={(e) => updateSkill(index, 'language', e.target.value)}
                                    >
                                        <option value="">Select Language</option>
                                        {LANGUAGES.map(lang => (
                                            <option key={lang} value={lang}>{lang}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="col-md-4">
                                    <select
                                        multiple
                                        className="form-select"
                                        size="3"
                                        value={skill.frameworks}
                                        onChange={(e) => {
                                            const selected = Array.from(e.target.selectedOptions, o => o.value);
                                            updateSkill(index, 'frameworks', selected);
                                        }}
                                        disabled={!skill.language}
                                    >
                                        {(FRAMEWORKS[skill.language] || []).map(fw => (
                                            <option key={fw}>{fw}</option>
                                        ))}
                                    </select>
                                    <div className="form-text">Hold Ctrl/Cmd to select multiple</div>
                                </div>

                                <div className="col-md-3">
                                    <select
                                        className="form-select"
                                        value={skill.level}
                                        onChange={(e) => updateSkill(index, 'level', e.target.value)}
                                    >
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>

                                <div className="col-md-1">
                                    <button
                                        type="button"
                                        className="btn btn-danger btn-sm"
                                        onClick={() => removeSkill(index)}
                                    >
                                        X
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}

                    {skills.length === 0 && (
                        <p className="text-muted">Click "+ Add Skill" to begin</p>
                    )}
                </div>

                <button
                    type="submit"
                    className="btn btn-success btn-lg w-100"
                    disabled={loading || usernameStatus !== 'valid'}
                >
                    {loading ? 'Saving...' : 'Save Profile & Explore Issues'}
                </button>
            </form>
        </div>
    );
};

export default ProfileForm;