import { QuizQuestion } from "@/types";


export const quizLecture1: QuizQuestion[] = [
  {
    id: 1,
    question:
      "In the late 1980s case, what main problem triggered the need for a new system?",
    options: [
      "Managing employee salaries",
      "Improving customer service communications",
      "Tracking hardware inventory",
      "Automating manufacturing robots",
    ],
    correctAnswer: 1, // Improving customer service communications​
  },
  {
    id: 2,
    question: "Which belief defines the Technology Approach in the chapter?",
    options: [
      "Humans are more important than machines",
      "Right technology is the main answer",
      "Processes should be ignored",
      "Technology should always be avoided",
    ],
    correctAnswer: 1, // Right technology is the main answer​
  },
  {
    id: 3,
    question:
      "How is the Systems Development Life Cycle (SDLC) primarily characterized?",
    options: [
      "As an agile, non-structured method",
      "As a stagewise or waterfall method",
      "As a random trial-and-error method",
      "As a purely financial planning method",
    ],
    correctAnswer: 1, // Stagewise or waterfall​
  },
  {
    id: 4,
    question: "In SDLC, how are user requirements typically treated?",
    options: [
      "As evolving stories after deployment",
      "As informal notes with no structure",
      "As a specification defined upfront",
      "As optional suggestions during maintenance",
    ],
    correctAnswer: 2, // Specification defined upfront​
  },
  {
    id: 5,
    question: "Which case is presented as a success of the 'hard' approach?",
    options: [
      "Wessex Area Health",
      "British Gas downsizing project",
      "Litronix Europe order processing system",
      "A generic government project",
    ],
    correctAnswer: 2, // Litronix Europe​
  },
  {
    id: 6,
    question:
      "What key characteristic made the Litronix Europe problem suitable for a hard approach?",
    options: [
      "It had ambiguous goals and actors",
      "It was purely social with no data",
      "It was deterministic with clear inputs and outputs",
      "It required no computerization at all",
    ],
    correctAnswer: 2, // Deterministic with clear inputs/outputs​
  },
  {
    id: 7,
    question:
      "According to the OASIG study, up to what percentage of IT investments fail to meet performance goals?",
    options: ["10%", "40%", "60%", "90%"],
    correctAnswer: 3, // 90%​
  },
  {
    id: 8,
    question:
      "What is the main critique by Lyytinen and Hirschheim about traditional failure measures?",
    options: [
      "They focus only on security issues",
      "They are too narrow and purely technical",
      "They ignore hardware costs",
      "They only use financial ratios",
    ],
    correctAnswer: 1, // Too narrow and purely technical​
  },
  {
    id: 9,
    question: "What does the 'soft' human-centered approach emphasize first?",
    options: [
      "Immediate hardware purchase decisions",
      "Social media marketing strategy",
      "Understanding viewpoints of human participants",
      "Optimizing network bandwidth",
    ],
    correctAnswer: 2, // Viewpoints of human participants​
  },
  {
    id: 10,
    question:
      "What is the core idea of Ackoff's Idealised Design in Interactive Planning?",
    options: [
      "Design for minimum cost over 20 years",
      "Design the system you would like to have right now",
      "Design only for existing hardware constraints",
      "Design only by copying competitors",
    ],
    correctAnswer: 1, // System you'd like to have right now​
  },
];

export const quizLecture2: QuizQuestion[] = [
  {
    id: 1,
    question:
      "What was the main problem with Abbott Training’s £5,000 email machine project?",
    options: [
      "Hardware failure",
      "Lack of technical specifications",
      "It focused on technology but not on how it would be used",
      "Insufficient network speed",
    ],
    correctAnswer: 2, // Focused on tech, not use​
  },
  {
    id: 2,
    question:
      "By 1999, how was Abbott Training’s expensive network primarily used?",
    options: [
      "Video conferencing",
      "Enterprise resource planning",
      "Email only",
      "Customer relationship management",
    ],
    correctAnswer: 2, // Email only​
  },
  {
    id: 3,
    question:
      "According to Mintzberg, how do most people typically DEFINE strategy?",
    options: ["As a pattern", "As a plan", "As a culture", "As a structure"],
    correctAnswer: 1, // As a plan​
  },
  {
    id: 4,
    question:
      "In Mintzberg’s view, what do people often DESCRIBE when asked about a competitor’s strategy?",
    options: [
      "Its mission statement",
      "Its future goals",
      "A pattern in past behavior",
      "Its organizational chart",
    ],
    correctAnswer: 2, // Pattern in action over time​
  },
  {
    id: 5,
    question:
      "Which school views strategy as an objective, analytical process of deliberate design?",
    options: [
      "Learning School",
      "Cultural School",
      "Design School",
      "Political School",
    ],
    correctAnswer: 2, // Design School​
  },
  {
    id: 6,
    question:
      "Which of the following is NOT one of Ansoff’s reduction steps in deliberate strategy?",
    options: [
      "Identify objectives",
      "Diagnose current position",
      "Determine the gap",
      "Ignore external environment",
    ],
    correctAnswer: 3, // Ignore external environment​
  },
  {
    id: 7,
    question:
      "In the Johnson and Scholes framework, which phase focuses on scanning the environment and assessing capability?",
    options: [
      "Strategic Analysis",
      "Strategic Choice",
      "Strategy Implementation",
      "Post-implementation review",
    ],
    correctAnswer: 0, // Strategic Analysis​
  },
  {
    id: 8,
    question: "What is the core idea of emergent strategy?",
    options: [
      "Strategy is always written in a formal document",
      "Strategy must come only from top management",
      "Strategy can appear as a realized pattern without explicit intention",
      "Strategy never changes over time",
    ],
    correctAnswer: 2, // Realized pattern without explicit intention​
  },
  {
    id: 9,
    question:
      "In the IBM case, what blocked the organization from responding to the microcomputer threat?",
    options: [
      "Lack of engineers",
      "Too much cash",
      "A rigid, long-held mainframe strategy and structure",
      "Government regulations",
    ],
    correctAnswer: 2, // Rigid mainframe strategy/structure​
  },
  {
    id: 10,
    question:
      "What is the main goal of Logical Incrementalism according to Quinn?",
    options: [
      "Eliminate all uncertainty before acting",
      "Make one big, irreversible strategic bet",
      "Decrease risk of major failure and increase flexibility",
      "Rely only on formal annual plans",
    ],
    correctAnswer: 2, // Decrease risk, increase flexibility​
  },
];


export const quizzes: QuizQuestion[][] = [
    quizLecture1,
    quizLecture2,
    // quizLecture3,
];