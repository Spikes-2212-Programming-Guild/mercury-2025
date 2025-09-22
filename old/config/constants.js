export const COLORS = {
    VALID: 'green',
    INVALID: 'red',
    NEUTRAL: 'white',
    WARNING: 'yellow',
    ACTIVE: 'white',
    INACTIVE: 'gray',
};

export const RETRY_SENDING_SUBMISSIONS_INTERVAL_MS = 1000 * 60 * 4; // 4 minutes

export const APP_ID = "qualification_practice_"

export const TELEOP_START_TIME_MS = 1000 * 15; // 15 seconds

export const API_URL = "https://mercury-2025-server.onrender.com/submit";

export const TITLE_OFFSET = 255;

export const RESET_TYPES = {
    CLEAR: 'clear',
    KEEP: 'keep',
    INCREASE: 'increase',
};

export const ALL_TEAMS = [
    1690, 3339, 5951, 2231, 1574, 1577, 5614, 3075, 5990, 5715, 6740, 1937, 5987, 1657, 4590,
    5654, 7039, 2630, 9739, 2096, 3065, 1942, 6104, 7845, 3316, 5554, 6738, 4320, 9738, 7067,
    5928, 3835, 4338, 3211, 5635, 1576, 9740, 6168, 4416, 3083, 10139, 10695, 2679, 7112, 8223,
    5135, 7177, 4744, 5291, 4586, 2230, 6230, 2212, 3388, 9304, 8175, 1580, 9303, 1943, 6741,
    4319, 1954, 4661
].sort((a, b) => a - b);
