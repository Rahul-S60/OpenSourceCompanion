// frontend/src/mockData.js
// This is FAKE data
// We use it to build UI before backend is ready

export const mockUser = {
    email: "prajwal@example.com",
    githubUsername: "prajwalMangaji",
    skills: [
        {
            language: "Python",
            frameworks: ["Flask", "NumPy"],
            level: "beginner"
        },
        {
            language: "JavaScript",
            frameworks: ["React"],
            level: "intermediate"
        }
    ],
    points: 120,
    badges: ["First Contributor", "Python Rookie"]
};

export const mockIssues = [
    {
        id: 1,
        repo: "numpy/numpy",
        title: "Fix typo in installation guide",
        description: "There's a small typo in the pip install command...",
        language: "Python",
        difficulty: "easy",
        url: "https://github.com/numpy/numpy/issues/12345"
    },
    {
        id: 2,
        repo: "facebook/react",
        title: "Update deprecated lifecycle method",
        description: "Replace componentWillMount with useEffect in docs...",
        language: "JavaScript",
        difficulty: "medium",
        url: "https://github.com/facebook/react/issues/67890"
    },
    {
        id: 3,
        repo: "django/django",
        title: "Add example for new filter",
        description: "The new template filter needs a code example...",
        language: "Python",
        difficulty: "easy",
        url: "https://github.com/django/django/issues/11111"
    }
];