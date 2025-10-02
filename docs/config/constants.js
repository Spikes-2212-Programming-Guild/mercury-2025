const COLORS = {
    VALID: 'green',
    INVALID: 'red',
    NEUTRAL: 'white',
    WARNING: 'yellow',
    ACTIVE: 'white',
    INACTIVE: 'gray',
};

export const SCOREBOX_MIN_VALUE = 0;
export const SCOREBOX_MAX_VALUE = 100;
export const SCOREBOX_DEFAULT_VALUE = 0;

const RETRY_SENDING_SUBMISSIONS_INTERVAL_MS = 1000 * 60 * 4; // 4 minutes

export const APP_ID = "qp"

const TELEOP_START_TIME_MS = 1000 * 15; // 15 seconds

const API_URL = "https://mercury-2025-server.onrender.com/submit";

const RESET_TYPES = {
    CLEAR: 'clear',
    KEEP: 'keep',
    INCREASE: 'increase',
};