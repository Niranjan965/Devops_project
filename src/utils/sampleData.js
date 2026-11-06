export const SAMPLE_TASKS = [
  {
    id: "task-101",
    title: "Design new design system & dashboard layout",
    description: "Create cohesive UI tokens, navigation wireframes, and dark navy sidebar specifications in Figma for the v2 launch.",
    category: "Design",
    priority: "High",
    status: "To Do",
    dueDate: "2026-11-15",
    createdAt: "2026-11-01T09:30:00.000Z",
    tags: ["UI/UX", "Figma", "Design System"],
    assignee: {
      name: "Sophia Chen",
      initials: "SC",
      color: "#8b5cf6"
    }
  },
  {
    id: "task-102",
    title: "Develop user authentication & OAuth provider flow",
    description: "Implement JWT validation, role-based session middleware, and persistent storage token refresh cycles.",
    category: "Engineering",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-11-12",
    createdAt: "2026-11-02T11:15:00.000Z",
    tags: ["Security", "OAuth", "API"],
    assignee: {
      name: "Marcus Miller",
      initials: "MM",
      color: "#3b82f6"
    }
  },
  {
    id: "task-103",
    title: "Configure multi-stage Docker build & Nginx SPA routing",
    description: "Setup optimized Alpine production image, write caching policies for assets, and verify container port mapping.",
    category: "DevOps",
    priority: "Medium",
    status: "Completed",
    dueDate: "2026-11-08",
    createdAt: "2026-11-03T14:00:00.000Z",
    tags: ["Docker", "Nginx", "Infrastructure"],
    assignee: {
      name: "Elena Rostova",
      initials: "ER",
      color: "#10b981"
    }
  },
  {
    id: "task-104",
    title: "Write automated declarative Jenkins CI/CD pipeline",
    description: "Define Jenkinsfile with checkout, linting, Vitest suite, Docker build, and automated zero-downtime deployment stages.",
    category: "DevOps",
    priority: "High",
    status: "In Progress",
    dueDate: "2026-11-14",
    createdAt: "2026-11-04T16:20:00.000Z",
    tags: ["Jenkins", "Automation", "CI/CD"],
    assignee: {
      name: "Devon Reed",
      initials: "DR",
      color: "#f59e0b"
    }
  },
  {
    id: "task-105",
    title: "Prepare Q4 Product Roadmap & Sprint Presentation",
    description: "Synthesize customer feedback surveys, backlog items, and engineering capacity metrics for executive review.",
    category: "Product",
    priority: "Medium",
    status: "To Do",
    dueDate: "2026-11-18",
    createdAt: "2026-11-05T10:00:00.000Z",
    tags: ["Roadmap", "Strategy", "Sprint"],
    assignee: {
      name: "Sarah Jenkins",
      initials: "SJ",
      color: "#ec4899"
    }
  },
  {
    id: "task-106",
    title: "Optimize Core Web Vitals and asset compression",
    description: "Achieve 98+ Lighthouse score by minifying CSS, deferring non-critical scripts, and optimizing SVG icons.",
    category: "Engineering",
    priority: "Low",
    status: "Completed",
    dueDate: "2026-11-06",
    createdAt: "2026-11-03T08:45:00.000Z",
    tags: ["Performance", "Lighthouse", "Frontend"],
    assignee: {
      name: "Alex Rivera",
      initials: "AR",
      color: "#06b6d4"
    }
  },
  {
    id: "task-107",
    title: "Launch beta marketing campaign & landing page A/B test",
    description: "Deploy multivariate experiment on hero CTA copy, track sign-up conversion funnel, and analyze drop-offs.",
    category: "Marketing",
    priority: "Medium",
    status: "To Do",
    dueDate: "2026-11-20",
    createdAt: "2026-11-05T15:30:00.000Z",
    tags: ["Growth", "Analytics", "Marketing"],
    assignee: {
      name: "Liam O'Connor",
      initials: "LO",
      color: "#6366f1"
    }
  },
  {
    id: "task-108",
    title: "Implement responsive Kanban drag-and-drop & status filtering",
    description: "Provide fluid card reordering, status updates across 3 columns, and local persistent state synchronization.",
    category: "Engineering",
    priority: "High",
    status: "Completed",
    dueDate: "2026-11-09",
    createdAt: "2026-11-04T12:00:00.000Z",
    tags: ["React", "State", "Kanban"],
    assignee: {
      name: "Herry Vance",
      initials: "HV",
      color: "#8b5cf6"
    }
  }
];

export const CATEGORIES = [
  "All Categories",
  "Engineering",
  "Design",
  "Marketing",
  "Product",
  "DevOps"
];

export const PRIORITIES = ["All Priorities", "High", "Medium", "Low"];

export const STATUSES = ["To Do", "In Progress", "Completed"];
