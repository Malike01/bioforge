/**
 * BIOFORGE APPLICATION CONSTANTS
 * * Structure:
 * 1. CORE: Global settings (Colors, API, Config)
 * 2. MODULE_DESIGNER (Phase 1): Bio-CAD & Canvas constants
 * 3. MODULE_INTELLIGENCE (Phase 2): AI & RAG constants
 * 4. MODULE_LIMS (Phase 3): Lab Execution & IoT constants
 */

// =============================================================================
// 1. CORE SYSTEM (Global)
// =============================================================================

export const CORE_THEME = {
  COLORS: {
    BRAND: {
      PRIMARY: "#4f46e5", // Indigo 600
      SECONDARY: "#64748b", // Slate 500
      DARK: "#0f172a", // Slate 900
    },
    STATUS: {
      SUCCESS: "#22c55e",
      WARNING: "#f59e0b",
      ERROR: "#ef4444",
      INFO: "#3b82f6",
      IDLE: "#94a3b8",
    },
    UI: {
      BACKGROUND: "#f8fafc", // Slate 50
      BORDER: "#e2e8f0", // Slate 200
    },
  },
  LAYOUT: {
    SIDEBAR_WIDTH: 280,
    HEADER_HEIGHT: 64,
    Z_INDEX: {
      CANVAS: 0,
      TOOLBAR: 10,
      MODAL: 50,
      TOAST: 100,
    },
  },
};

export const CORE_CONFIG = {
  API: {
    TIMEOUT_MS: 15000,
    RETRY_COUNT: 1,
    BASE_PREFIX: "/api/v1",
  },
  TOAST_DURATION: {
    FAST: 2000,
    NORMAL: 4000,
    LONG: 8000,
  },
};

// =============================================================================
// 2. PHASE 1: DESIGNER MODULE (Bio-CAD)
// =============================================================================

export const MODULE_DESIGNER = {
  PART_TYPES: {
    PROMOTER: {
      ID: "SO:0000167",
      COLOR: "#3b82f6", // Blue (Promoter)
      LABEL: "Promoter",
      ICON: "arrow-right-circle",
    },
    RBS: {
      ID: "SO:0000139",
      COLOR: "#10b981", // Green
      LABEL: "RBS",
      ICON: "stop-circle",
    },
    CDS: {
      ID: "SO:0000316",
      COLOR: "#8b5cf6", // Purple
      LABEL: "CDS (Gene)",
      ICON: "box",
    },
    TERMINATOR: {
      ID: "SO:0000141",
      COLOR: "#ef4444", // Red
      LABEL: "Terminator",
      ICON: "x-octagon",
    },
  },
  CANVAS: {
    GRID_SNAP: 20,
    DEFAULT_ZOOM: 1,
    MIN_ZOOM: 0.5,
    MAX_ZOOM: 2,
  },
  VALIDATION_MSGS: {
    SUCCESS: "Genetic circuit logic is valid.",
    ERR_GRAMMAR: "Invalid genetic grammar detected.",
    ERR_SEQUENCE: "Invalid DNA characters found.",
    BTN_VALIDATE: "Validate Circuit",
    BTN_CHECKING: "Analyzing Bio-Logic...",
  },
};

// =============================================================================
// 3. PHASE 2: INTELLIGENCE MODULE (AI Agents)
// =============================================================================

export const MODULE_INTELLIGENCE = {
  AGENTS: {
    LITERATURE: "LiteratureSearchAgent",
    OPTIMIZER: "CodonOptimizationAgent",
  },
  THRESHOLDS: {
    SIMILARITY_SCORE: 0.85,
    CONFIDENCE_MIN: 0.7,
  },
  UI_LABELS: {
    ASK_AI: "Ask Bio-Assistant",
    ANALYZING: "Scanning PubMed...",
    SUMMARIZING: "Generating insights...",
  },
};

// =============================================================================
// 4. PHASE 3: EXECUTION MODULE (LIMS & Workflow)
// =============================================================================

export const MODULE_LIMS = {
  STATUS: {
    PENDING: "pending",
    RUNNING: "running",
    COMPLETED: "completed",
    FAILED: "failed",
    ABORTED: "aborted",
  },
  DEVICE_TYPES: {
    PCR: "thermocycler",
    CENTRIFUGE: "centrifuge",
    ROBOT: "liquid_handler",
  },
  UNITS: {
    VOLUME: "µL",
    TEMP: "°C",
    TIME: "min",
  },
};

// --- Content Strategy ---
export const APP_CONTENT = {
  global: {
    APP_NAME: "BioForge",
    SYSTEM_STATUS: "System Operational",
  },
  menu: {
    dashboard: "Overview",
    design: "Bio-CAD Designer",
    simulation: "Simulation Engine",
    lims: "Lab Management",
    settings: "Settings",
    help: "Documentation",
    userProfile: "Dr. Sen",
  },
  auth: {
    login: {
      TITLE: "Welcome to BioForge",
      SUBTITLE: "Sign in to access your laboratory",
      INPUT_EMAIL: "Email",
      PLACEHOLDER_EMAIL: "researcher@bioforge.com",
      INPUT_PASSWORD: "Password",
      FORGOT_PASS: "Forgot?",
      BTN_LOGIN: "Access Lab",
      BTN_LOADING: "Authenticating...",
      FOOTER_TEXT: "Don't have an account?",
      FOOTER_LINK: "Request Access",
      TOAST_SUCCESS: "Welcome back",
      TOAST_ERROR: "Access Denied",
    },
  },
  loader: {
    TITLE: "BioForge System",
    SUBTITLE: "Initializing Biological Engine...",
    ALT_TEXT: "Loading application components",
  },
  errors: {
    notFound: {
      TITLE: "404",
      SUBTITLE: "Genetic Sequence Not Found",
      DESCRIPTION:
        "The biological component you are looking for seems to have mutated or does not exist in our database.",
      HINT_CODE: "ERR_CODE: SEQUENCE_DELETION_DETECTED",
      BTN_HOME: "Return to Lab",
      BTN_BACK: "Go Back",
    },
    generic: {
      TITLE: "System Error",
      DESCRIPTION: "An unexpected error occurred in the lab.",
      BTN_RETRY: "Retry Protocol",
    },
  },
  landing: {
    hero: {
      BADGE: "New: AI-Powered Sequence Validation",
      TITLE_PREFIX: "Engineering Biology,",
      TITLE_SUFFIX: "Democratized.",
      DESCRIPTION:
        "BioForge is the first cloud-native CAD tool designed for the modern synthetic biologist. Design, simulate, and validate genetic circuits with the speed of software development.",
      BTN_PRIMARY: "Start Designing Free",
      BTN_SECONDARY: "View Documentation",
    },
    features: {
      title: "Built for the Wet Lab, Designed for the Cloud",
      list: [
        {
          title: "Drag & Drop Design",
          desc: "Intuitive canvas interface with SBOL standard compliance.",
          icon: "Layout",
        },
        {
          title: "Real-time Logic Validation",
          desc: "Catch biological syntax errors before ordering DNA synthesis.",
          icon: "Activity",
        },
        {
          title: "Team Collaboration",
          desc: "Share designs and simulations with your lab members instantly.",
          icon: "Users",
        },
      ],
    },
    stats: [
      { value: "10k+", label: "Genetic Parts" },
      { value: "0ms", label: "Latency" },
      { value: "100%", label: "SBOL Compliant" },
    ],
    cta: {
      title: "Ready to engineer life?",
      desc: "Join thousands of researchers building the future of biotech.",
      btn: "Launch BioForge Console",
    },
    footer: {
      copyright: "© 2024 BioForge Inc. All rights reserved.",
      links: [
        { label: "Privacy Policy", href: "#" },
        { label: "Terms of Service", href: "#" },
        { label: "Contact Support", href: "#" },
      ],
    },
  },
  invite: {
    TRIGGER_BTN: "Invite Team",
    MODAL_TITLE: "Invite Team Member",
    MODAL_DESC: "Send an invitation link to collaborate on BioForge.",
    LABEL_EMAIL: "Email Address",
    PLACEHOLDER_EMAIL: "colleague@university.edu",
    BTN_CANCEL: "Cancel",
    BTN_SEND: "Send Invite",
    BTN_SENDING: "Sending...",
    TOAST_SUCCESS_TITLE: "Invitation Sent",
    TOAST_SUCCESS_DESC: "Invited successfully: ",
    TOAST_ERROR: "Failed to send invite",
  },
  admin: {
    users: {
      PAGE_TITLE: "User Management",
      PAGE_SUBTITLE: "Manage team members and permissions.",
      ERROR_LOAD: "Failed to load users.",
      CONFIRM_DELETE:
        "Are you sure you want to delete this user? This action cannot be undone.",
      TOAST_DELETE_SUCCESS: "User deleted successfully",
      TOAST_DELETE_ERROR: "Failed to delete user",
    },
    table: {
      HEADER_USER: "User",
      HEADER_ROLE: "Role",
      HEADER_STATUS: "Status",
      ROLE_ADMIN: "Admin",
      ROLE_USER: "User",
      STATUS_ACTIVE: "Active",
      STATUS_INACTIVE: "Inactive",
      FALLBACK_NAME: "Unknown",
      LABEL_ACTIONS: "Actions",
      ACTION_DELETE: "Delete User",
      EMPTY_STATE: "No results found.",
      BTN_PREV: "Previous",
      BTN_NEXT: "Next",
    },
  },
};
