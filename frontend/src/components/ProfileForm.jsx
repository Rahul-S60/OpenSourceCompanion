// frontend/src/components/ProfileForm.jsx
import React, { useState, useEffect } from "react";
import { mockUser } from "../mockData";

const LANGUAGES = ["Python", "JavaScript", "Java", "C++", "Go", "Ruby"];
const FRAMEWORKS = {
    Python: ["Flask", "Django", "FastAPI", "NumPy", "Pandas"],
    JavaScript: ["React", "Node.js", "Express", "Vue", "Angular"],
    Java: ["Spring Boot", "Hibernate"],
    C__: ["STL", "Qt"],
    Go: ["Gin", "Echo"],
    Ruby: ["Rails", "Sinatra"],
};

const ProfileForm = ({ onSave }) => {
    // STATE: What the form remembers
    const [githubUsername, setGithubUsername] = useState("");
    const [skills, setSkills] = useState([]); // Array of {language, frameworks[], level}
    const [loading, setLoading] = useState(false);

    // Load mock data when form opens
    useEffect(() => {
        setGithubUsername(mockUser.githubUsername);
        setSkills(mockUser.skills);
    }, []);

    // Add a new empty skill row
    const addSkill = () => {
        setSkills([...skills, { language: "", frameworks: [], level: "beginner" }]);
    };

    // Update one field in a skill
    const updateSkill = (index, field, value) => {
        const newSkills = [...skills];
        if (field === "language") {
            newSkills[index] = { language: value, frameworks: [], level: "beginner" };
        } else {
            newSkills[index][field] = value;
        }
        setSkills(newSkills);
    };

    // Remove a skill row
    const removeSkill = (index) => {
        setSkills(skills.filter((_, i) => i !== index));
    };

    // SAVE: Later calls backend, now just logs + redirects
    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        // VALIDATION
        if (!githubUsername.trim()) {
            alert("GitHub username is required!");
            setLoading(false);
            return;
        }
        if (skills.some((s) => !s.language)) {
            alert("All skills must have a language!");
            setLoading(false);
            return;
        }

        try {
            // MOCK SAVE
            console.log("Saving to backend:", { githubUsername, skills });
            // await api.put('/profile', { githubUsername, skills }); // LATER
            setTimeout(() => {
                setLoading(false);
                onSave?.(); // Redirect to dashboard
            }, 1000);
        } catch (err) {
            alert("Save failed!");
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
                    <input
                        type="text"
                        className="form-control"
                        placeholder="e.g., prajwalMangaji"
                        value={githubUsername}
                        onChange={(e) => setGithubUsername(e.target.value)}
                        required
                    />
                    <div className="form-text">Used to verify your PRs later</div>
                </div>

                {/* SKILLS */}
                <div className="mb-4">
                    <div className="d-flex justify-content-between align-items-center mb-2">
                        <label className="form-label fw-bold">Your Skills</label>
                        <button
                            type="button"
                            className="btn btn-outline-primary btn-sm"
                            onClick={addSkill}
                        >
                            + Add Skill
                        </button>
                    </div>

                    {skills.map((skill, index) => (
                        <div key={index} className="border rounded p-3 mb-3 bg-light">
                            <div className="row g-2">
                                {/* LANGUAGE */}
                                <div className="col-md-4">
                                    <select
                                        className="form-select"
                                        value={skill.language}
                                        onChange={(e) =>
                                            updateSkill(index, "language", e.target.value)
                                        }
                                    >
                                        <option value="">Select Language</option>
                                        {LANGUAGES.map((lang) => (
                                            <option key={lang} value={lang}>
                                                {lang}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* FRAMEWORKS */}
                                <div className="col-md-4">
                                    <select
                                        multiple
                                        className="form-select"
                                        size="3"
                                        value={skill.frameworks}
                                        onChange={(e) => {
                                            const selected = Array.from(
                                                e.target.selectedOptions,
                                                (o) => o.value
                                            );
                                            updateSkill(index, "frameworks", selected);
                                        }}
                                        disabled={!skill.language}
                                    >
                                        {(FRAMEWORKS[skill.language] || []).map((fw) => (
                                            <option key={fw}>{fw}</option>
                                        ))}
                                    </select>
                                    <div className="form-text">
                                        Hold Ctrl/Cmd to select multiple
                                    </div>
                                </div>

                                {/* LEVEL */}
                                <div className="col-md-3">
                                    <select
                                        className="form-select"
                                        value={skill.level}
                                        onChange={(e) =>
                                            updateSkill(index, "level", e.target.value)
                                        }
                                    >
                                        <option value="beginner">Beginner</option>
                                        <option value="intermediate">Intermediate</option>
                                        <option value="advanced">Advanced</option>
                                    </select>
                                </div>

                                {/* REMOVE */}
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

                {/* SUBMIT */}
                <button
                    type="submit"
                    className="btn btn-success btn-lg w-100"
                    disabled={loading}
                >
                    {loading ? "Saving..." : "Save Profile & Explore Issues"}
                </button>
            </form>
        </div>
    );
};

export default ProfileForm;
