# TaskFlow – Modern Task Management System

![TaskFlow Version](https://img.shields.io/badge/version-1.0.0-blue.svg)
![React](https://img.shields.io/badge/React-18.3.1-61dafb.svg?logo=react)
![Vite](https://img.shields.io/badge/Vite-5.4.11-646cff.svg?logo=vite)
![Docker](https://img.shields.io/badge/Docker-Multi--stage-2496ed.svg?logo=docker)
![Nginx](https://img.shields.io/badge/Nginx-Alpine-009639.svg?logo=nginx)
![Jenkins](https://img.shields.io/badge/Jenkins-CI%2FCD-d33833.svg?logo=jenkins)
![Tests](https://img.shields.io/badge/Vitest-11%2F11%20Passed-4ade80.svg)

**TaskFlow** is a modern, responsive SaaS task management application designed for high-performing engineering, design, and product teams. It combines an intuitive Kanban workflow, insightful dashboard analytics, and persistent browser storage with production-grade DevOps containerization and declarative Jenkins CI/CD automation.

---

## 📋 Table of Contents
1. [Key Features](#-key-features)
2. [Tech Stack](#-tech-stack)
3. [Architecture & Project Structure](#-architecture--project-structure)
4. [Getting Started (Local Development)](#-getting-started-local-development)
5. [Docker Containerization](#-docker-containerization)
6. [Jenkins CI/CD Pipeline](#-jenkins-cicd-pipeline)
7. [Unit Testing & Code Quality](#-unit-testing--code-quality)
8. [Accessing the Deployed Application](#-accessing-the-deployed-application)

---

## ✨ Key Features

### 1. Executive Dashboard
- **Comprehensive KPIs**: Real-time counters for **Total Tasks**, **Completed**, **In Progress**, and **Pending / Overdue** tasks.
- **Dynamic Completion Rate**: Visual progress indicator calculating live sprint delivery percentage.
- **Priority Distribution Chart**: Interactive bar breakdown tracking **High**, **Medium**, and **Low** urgency distribution.
- **Department Breakdown**: Instant categorizations across Engineering, Design, DevOps, Marketing, and Product.
- **Live Team Activity Log**: Real-time event tracking inspired by modern SaaS command centers.
- **Recent Tasks Overview**: Quick status updater, direct editing, and deletion controls.

### 2. Kanban Board & Task Organization
- **Three Core Workflow Columns**:
  - `To Do` (Slate / Sky indicator)
  - `In Progress` (Amber indicator)
  - `Completed` (Emerald green indicator)
- **Drag-and-Drop & Quick Cycling**: Native HTML5 drag-and-drop card movements, plus one-click left/right cycle buttons for touch and tablet devices.
- **Live Multi-faceted Filtering**:
  - Real-time search query matching title, description, category, and tags.
  - Filter by Category (*Engineering, Design, DevOps, Marketing, Product*).
  - Filter by Priority (*High, Medium, Low*).
  - Filter by Status (*To Do, In Progress, Completed*).
- **Flexible Sorting**: Sort by Due Date (Earliest / Latest), Creation Date (Newest / Oldest), Priority, or Title.
- **Dual View Modes**: Seamless toggle between **Kanban Board** and **List / Table View**.

### 3. Complete Task CRUD Operations
- **Task Creation**: Add rich tasks with title, description, category, priority, due date, and team member assignment.
- **Inline & Modal Editing**: Edit any task detail on the fly with live updates.
- **Safe Deletion**: Two-step confirmation modal preventing accidental data loss.
- **Form Validation**: Strict client-side validation ensuring title length and due dates are specified.

### 4. Zero-Backend Local Persistence
- **Browser `localStorage`**: 100% persistent without requiring external databases or server APIs.
- **Non-destructive Seeding**: Pre-loads realistic sample tasks on first launch without overwriting customized user state on return visits.
- **Demo Data Reset**: Instant one-click restoration to default sample datasets via the sidebar.

---

## 🛠️ Tech Stack

| Layer | Technology | Description |
| :--- | :--- | :--- |
| **Frontend Framework** | React 18.3.1 | Component-based UI with modern hooks (`useState`, `useEffect`, `useRef`) |
| **Build Tool & Bundler** | Vite 5.4.11 | Ultra-fast Hot Module Replacement (HMR) and optimized rollup production bundling |
| **Icons** | Lucide React | Modern, clean feather-style SVG iconography |
| **Styling** | Vanilla CSS3 | Custom SaaS design tokens, dark navy sidebar, responsive grid & flexbox |
| **Testing** | Vitest + Testing Library | Blazing fast unit testing with jsdom mock environment |
| **Linting** | ESLint 8.57.1 | Strict ECMAScript and React Hooks linting |
| **Web Server** | Nginx Alpine | Lightweight production container web server with gzip & SPA fallback |
| **Containerization** | Docker Multi-Stage | Node 20 builder stage & Nginx Alpine runtime stage |
| **CI/CD Pipeline** | Jenkins Declarative | Automated pipeline for checkout, lint, test, build, dockerize, and deploy |

---

## 📂 Architecture & Project Structure

```text
TaskFlow/
├── public/
│   └── vite.svg                      # Application logo asset
├── src/
│   ├── components/
│   │   ├── DeleteConfirmModal.jsx    # Modal dialog for safe task deletion
│   │   ├── FilterBar.jsx             # Search, category/priority filters, and view toggles
│   │   ├── Navbar.jsx                # Top bar with Ctrl+K search, tabs, & "+ New Task"
│   │   ├── PriorityBadge.jsx         # Color-coded badge for High, Medium, Low priority
│   │   ├── Sidebar.jsx               # Dark navy navigation sidebar with workspace pill
│   │   ├── StatCard.jsx              # Reusable metric statistic card with progress bars
│   │   ├── TaskCard.jsx              # Kanban card with drag-and-drop & status cycle
│   │   └── TaskModal.jsx             # Create / Edit modal dialog with form validation
│   ├── pages/
│   │   ├── Board.jsx                 # 3-column Kanban board & List view
│   │   └── Dashboard.jsx             # Executive metrics, priority charts, & recent tasks
│   ├── test/
│   │   ├── setup.js                  # Vitest environment & localStorage mocking
│   │   ├── storage.test.js           # Unit tests for localStorage persistence & seeding
│   │   └── TaskFlow.test.jsx         # Unit tests for PriorityBadge, StatCard, & TaskCard
│   ├── utils/
│   │   ├── sampleData.js             # Realistic sample tasks and category constants
│   │   └── storage.js                # localStorage wrapper with persistence helpers
│   ├── App.css                       # Application layout, SaaS themes, and animations
│   ├── App.jsx                       # Root application coordinator & state manager
│   ├── index.css                     # Design tokens, CSS variables, & typography reset
│   └── main.jsx                      # React 18 DOM mount point
├── .dockerignore                     # Excludes node_modules, dist, git from build context
├── .eslintrc.cjs                     # ESLint rules and React JSX runtime configuration
├── .gitignore                        # Git ignore patterns
├── Dockerfile                        # Multi-stage production Docker build
├── index.html                        # HTML5 template with Google Fonts (Plus Jakarta Sans)
├── Jenkinsfile                       # Declarative CI/CD pipeline definition
├── nginx.conf                        # Nginx web server SPA routing and gzip compression
├── package.json                      # NPM dependencies and script definitions
├── package-lock.json                 # Locked dependency tree
├── README.md                         # Detailed system documentation
└── vite.config.js                    # Vite plugins & Vitest configuration
```

---

## 🚀 Getting Started (Local Development)

### Prerequisites
- **Node.js** >= 18.0.0 (Node 20+ recommended)
- **npm** >= 9.0.0

### Step-by-Step Installation

1. **Clone or navigate to the workspace directory**:
   ```bash
   cd c:\My_Files\Devops_project
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start the local development server**:
   ```bash
   npm run dev
   ```
   Open your browser and navigate to `http://localhost:3000`.

4. **Available NPM Scripts**:
   - `npm run dev` – Launch Vite development server with hot-reloading.
   - `npm run build` – Compile optimized production bundle to `/dist`.
   - `npm run preview` – Locally preview the production build.
   - `npm run lint` – Run ESLint across all JavaScript/JSX source files.
   - `npm test` – Execute the complete Vitest unit test suite.

---

## 🐳 Docker Containerization

TaskFlow uses a **multi-stage Docker build** to produce an ultra-lean, secure production image:
- **Stage 1 (Builder)**: Uses `node:20-alpine` to cleanly install dependencies (`npm ci`) and build the static assets.
- **Stage 2 (Runtime)**: Uses `nginx:alpine` to serve static assets with gzip compression and client-side SPA fallback routing (`try_files $uri $uri/ /index.html;`).

### 1. Build the Docker Image
```bash
docker build -t taskflow-app:latest .
```

### 2. Run the Docker Container
```bash
docker run -d \
  --name taskflow-container \
  -p 8080:80 \
  --restart unless-stopped \
  taskflow-app:latest
```

### 3. Verify Container Status
```bash
docker ps -f name=taskflow-container
```

### 4. Stop and Remove the Container
```bash
docker stop taskflow-container
docker rm taskflow-container
```

---

## 🔄 Jenkins CI/CD Pipeline

TaskFlow includes an enterprise-grade declarative `Jenkinsfile` ready for automated continuous integration and continuous deployment.

### Pipeline Workflow Stages

```text
+----------+   +--------------+   +--------+   +--------+   +----------+   +--------------+   +--------+
| Checkout |-->| Dependencies |-->|  Lint  |-->|  Test  |-->|  Build   |-->| Docker Build |-->| Deploy |
+----------+   +--------------+   +--------+   +--------+   +----------+   +--------------+   +--------+
```

1. **Checkout**: Automatically retrieves source code from the connected Git repository.
2. **Install Dependencies**: Executes `npm ci` for deterministic, clean package installation.
3. **Lint**: Runs `npm run lint` to enforce code quality and zero ESLint errors.
4. **Test**: Executes `npm test` running the 11 Vitest unit test suites.
5. **Build**: Compiles production assets via `npm run build`.
6. **Docker Build**: Packages the multi-stage Docker image tagged as `taskflow-app:${BUILD_NUMBER}` and `taskflow-app:latest`.
7. **Deploy**: Gracefully terminates any previous `taskflow-container` instance and launches the newly built image on host port `8080`.

### Jenkins Agent Requirements
- Linux agent with Docker CLI installed and access to `/var/run/docker.sock`.
- Node.js (version 18 or 20) and `npm` installed in system path or provisioned via Jenkins NodeJS plugin.
- Standard Jenkins plugins: *Pipeline*, *Git*, *Timestamper*, *Workspace Cleanup*.

### Setting Up the Pipeline in Jenkins
1. Create a new Jenkins item and select **Pipeline**.
2. Under **Pipeline Definition**, select **Pipeline script from SCM**.
3. Set SCM to **Git** and provide your repository URL.
4. Set Script Path to `Jenkinsfile`.
5. Click **Save** and trigger **Build Now**.

---

## 🧪 Unit Testing & Code Quality

TaskFlow is verified with automated tests and zero-warning linting:

```bash
# Run unit tests
npm test

# Output:
# ✓ src/test/storage.test.js (4 tests)
# ✓ src/test/TaskFlow.test.jsx (7 tests)
# Test Files  2 passed (2)
# Tests       11 passed (11)
```

```bash
# Run linter
npm run lint

# Output:
# 0 errors, 0 warnings
```

---

## 🌐 Accessing the Deployed Application

Once deployed (locally, via Docker, or through Jenkins):

| Deployment Target | URL | Description |
| :--- | :--- | :--- |
| **Vite Dev Server** | `http://localhost:3000` | Local development environment with HMR |
| **Vite Preview** | `http://localhost:4173` | Local preview of production build |
| **Docker / Jenkins** | `http://localhost:8080` | Production container served via Nginx Alpine |

---

## 💡 Keyboard Shortcuts & Pro-Tips
- **`Ctrl + K` (or `Cmd + K`)**: Instantly focuses the global search bar from anywhere in the application.
- **Drag-and-Drop**: Click and hold any task card on the Kanban board to drag it between *To Do*, *In Progress*, and *Completed*.
- **Quick Status Arrows**: Use the left (`<`) and right (`>`) arrow buttons on cards to transition tasks quickly without dragging.
- **Reset Demo Data**: Click **Reset Demo Data** in the bottom left sidebar anytime to reload the initial sample tasks.
