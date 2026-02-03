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
};
