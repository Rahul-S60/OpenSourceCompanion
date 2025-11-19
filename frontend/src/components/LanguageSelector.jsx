// frontend/src/components/LanguageSelector.jsx
import React from 'react';

const LanguageSelector = ({ languages, selected, onChange }) => {
    return (
        <div className="d-flex align-items-center gap-3">
            <label className="fw-bold mb-0">Filter by Language:</label>
            <select
                className="form-select w-auto"
                value={selected}
                onChange={(e) => onChange(e.target.value)}
            >
                <option value="">All Languages</option>
                {languages.map(lang => (
                    <option key={lang} value={lang}>{lang}</option>
                ))}
            </select>
        </div>
    );
};

export default LanguageSelector;