// frontend/src/components/IssuesList.jsx
import React from 'react';

const IssuesList = ({ issues }) => {
    if (!issues || issues.length === 0) {
        return (
            <div className="text-center py-5">
                <p className="text-muted">No issues found for this language.</p>
                <p>Try selecting another language!</p>
            </div>
        );
    }

    return (
        <div className="row g-4">
            {issues.map(issue => (
                <div key={issue.id} className="col-md-6 col-lg-4">
                    <div className="card h-100 shadow-sm hover-shadow transition">
                        <div className="card-body d-flex flex-column">
                            <h5 className="card-title">
                                <a
                                    href={issue.url}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                    className="text-primary text-decoration-none"
                                >
                                    {issue.title}
                                </a>
                            </h5>
                            <p className="card-text text-muted small mb-2">
                                <strong>Repo:</strong> {issue.repo}
                            </p>
                            <p className="card-text flex-grow-1">{issue.description}</p>
                            <div className="mt-auto">
                                <span className={`badge bg-${getDifficultyColor(issue.difficulty)} me-2`}>
                                    {issue.difficulty.toUpperCase()}
                                </span>
                                <span className="badge bg-secondary">{issue.language}</span>
                            </div>
                        </div>
                        <div className="card-footer bg-transparent">
                            <small className="text-muted">Click to open on GitHub</small>
                        </div>
                    </div>
                </div>
            ))}
        </div>
    );
};

// Helper: Color based on difficulty
const getDifficultyColor = (difficulty) => {
    switch (difficulty) {
        case 'easy': return 'success';
        case 'medium': return 'warning';
        case 'hard': return 'danger';
        default: return 'secondary';
    }
};

export default IssuesList;