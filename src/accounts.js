const users = [
  // Teachers
  { user_id: 1, username: "teacher1", password: "123", role: "teacher", name: "Mr. Kuldeep Singh Parihar" },
  { user_id: 2, username: "teacher2", password: "123", role: "teacher", name: "Dr. Kavita Singh" },

  // Class Rep
  { user_id: 3, username: "classrep", password: "123", role: "classrep", name: "Kavya" },

  // Students
  { user_id: 4, username: "student1", password: "123", role: "student", name: "Devesh",
    attendance: 92,
    mockTests: [
      { date: "2025-01-10", attended: true, score: 75 },
      { date: "2025-01-20", attended: false, score: 0 },
      { date: "2025-02-01", attended: true, score: 88 },
    ],
    posts: [],
  },
  { user_id: 5, username: "student2", password: "123", role: "student", name: "Pushker",
    attendance: 87,
    mockTests: [
      { date: "2025-01-10", attended: true, score: 65 },
      { date: "2025-01-20", attended: true, score: 70 },
      { date: "2025-02-01", attended: false, score: 0 },
    ],
    posts: [],
  },
  { user_id: 6, username: "student3", password: "123", role: "student", name: "Aryan",
    attendance: 95,
    mockTests: [
      { date: "2025-01-10", attended: true, score: 80 },
      { date: "2025-01-20", attended: true, score: 85 },
      { date: "2025-02-01", attended: true, score: 90 },
    ],
    posts: [],
  },
  { user_id: 7, username: "student4", password: "123", role: "student", name: "Mahi",
    attendance: 89,
    mockTests: [
      { date: "2025-01-10", attended: true, score: 78 },
      { date: "2025-01-20", attended: false, score: 0 },
      { date: "2025-02-01", attended: true, score: 82 },
    ],
    posts: [],
  },
];

// Initialize localStorage for students
const initStudentData = () => {
  if (!localStorage.getItem("studentData")) {
    const studentData = {};
    users.filter(u => u.role === "student").forEach(s => {
      studentData[s.username] = {
        user_id: s.user_id,
        name: s.name,
        attendance: s.attendance || 0,
        mockTests: s.mockTests || [],
        posts: s.posts || [],
      };
    });
    localStorage.setItem("studentData", JSON.stringify(studentData));
  }
};

initStudentData();

export default users;
