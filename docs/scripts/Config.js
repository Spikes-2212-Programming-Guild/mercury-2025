import {SingleNumberQuestion} from "../questions/SingleNumberQuestion";
import {TextLineQuestion} from "../questions/TextLineQuestion";

export const COLORS = {
    VALID: 'green',
    INVALID: 'red',
    NEUTRAL: 'white',
    WARNING: 'yellow',
    ACTIVE: 'white',
    INACTIVE: 'gray',
};

export const apiUrl = "https://mercury-2025-server.onrender.com/submit";

export const ALL_TEAMS = [1690, 3339, 5951, 2231, 1574, 1577, 5614, 3075, 5990, 5715, 6740, 1937, 5987, 1657, 4590,
    5654, 7039, 2630, 9739, 2096, 3065, 1942, 6104, 7845, 3316, 5554, 6738, 4320, 9738, 7067, 5928, 3835, 4338,
    3211, 5635, 1576, 9740, 6168, 4416, 3083, 10139, 10695, 2679, 7112, 8223, 5135, 7177, 4744, 5291, 4586, 2230, 6230, 2212,
    3388, 9304, 8175, 1580, 9303, 1943, 6741, 4319, 1954, 4661].sort();

export const RESET_TYPES = {
    CLEAR: 'clear',
    KEEP: 'keep',
    INCREASE: 'increase',
}

export const HTML_GLOBALS = {
    pagesContainer: document.getElementById('pages_container'),
    titleLabel: document.getElementById('title'),
    absoluteNavContainer: document.getElementById('absolute_navigation_container'),
    loadingOverlay: document.getElementById("loadingOverlay"),
    relativeNavigationButtons: {
        prev: document.getElementById('prev_button'),
        next: document.getElementById('next_button'),
    },
    titleNavigationButtons: {
        up: document.getElementById('title_navigation_up'),
        down: document.getElementById('title_navigation_down'),
    },
    submit_button: document.getElementById('submit_button'),
};

export function setToLocalStorage(key, value) {
    localStorage.setItem(appId + key, value);
}

export function getFromLocalStorage(key) {
    return localStorage.getItem(appId + key);
}

export function removeFromLocalStorage(key) {
    return localStorage.removeItem(appId + key);
}

export const QUESTION_TYPES = {
    COUNTER_QUESTION: CounterQuestion,
    NUMBER_FROM_CHOICES_QUESTION: NumberFromChoicesQuestion,
    SELECT_QUESTION: SelectQuestion,
    SINGLE_NUMBER_QUESTION: SingleNumberQuestion,
    TEXTBOX_QUESTION: TextBoxQuestion,
    TEXT_LINE_QUESTION: TextLineQuestion,
}

export const config = [
    {
        "name": "Pre",
        "questions": [
            "General Info",
            {"id": "scouter_name", "title": "Scouter name", "resetType": RESET_TYPES.KEEP, "type": LineQuestion.type},
            {"id": "game_type", "title": "Game Type", "resetType": RESET_TYPES.KEEP, "choices": ["Practice", "Qualifications"], "type": SelectQuestion.type},
            {"id": "game_number", "title": "Game Number", "resetType": RESET_TYPES.INCREASE, "type": NumberQuestion.type}, "Team Info",
            {"id": "team_number", "title": "Team Number", "choices": ALL_TEAMS, "type": NumberFromChoicesQuestion.type},
            {"id": "alliance_color", "title": "Alliance", "resetType": RESET_TYPES.KEEP, "choices": ["Red", "Blue"], "type": SelectQuestion.type}
        ]
    },
    {
        "name": "Auto",
        "questions": [
            {"id": "left_starting_line", "title": "Left the Starting Line", "choices": ["Yes", "No"], "type": SelectQuestion.type},
            "Amount of Corals Scored:",
            {"id": "auto_coral_l4", "title": "L4", "type": CounterQuestion.type},
            {"id": "auto_coral_l3", "title": "L3", "type": CounterQuestion.type},
            {"id": "auto_coral_l2", "title": "L2", "type": CounterQuestion.type},
            {"id": "auto_coral_l1", "title": "L1", "type": CounterQuestion.type},
            "Amount of Algae removed:",
            {"id": "auto_high_algae", "title": "High", "type": CounterQuestion.type},
            {"id": "auto_low_algae", "title": "Low", "type": CounterQuestion.type},
            "Algae:",
            {"id": "auto_robot_algae_throws", "title": "Robot Throws to Net", "type": CounterQuestion.type},
            {"id": "auto_algae_inserts", "title": "Algae Processor Inserts", "type": CounterQuestion.type},
            "Human Player:",
            {"id": "auto_human_player_algae_successful_throws", "title": "Successful Net Throws", "type": CounterQuestion.type},
            {"id": "auto_human_player_algae_failed_throws", "title": "Failed Net Throws", "type": CounterQuestion.type},
        ]
    },
    {
        "name": "Teleop",
        "questions": [
            "Amount of Corals Scored:",
            {"id": "teleop_coral_l4", "title": "L4", "type": CounterQuestion.type},
            {"id": "teleop_coral_l3", "title": "L3", "type": CounterQuestion.type},
            {"id": "teleop_coral_l2", "title": "L2", "type": CounterQuestion.type},
            {"id": "teleop_coral_l1", "title": "L1", "type": CounterQuestion.type},
            "Amount of Algae removed:",
            {"id": "teleop_high_algae", "title": "High", "type": CounterQuestion.type},
            {"id": "teleop_low_algae", "title": "Low", "type": CounterQuestion.type},
            "Algae:",
            {"id": "teleop_robot_algae_throws", "title": "Robot Throws/Places in Net", "type": CounterQuestion.type},
            {"id": "teleop_algae_inserts", "title": "Algae Processor Inserts", "type": CounterQuestion.type},
            "Human Player:",
            {"id": "teleop_human_player_algae_successful_throws", "title": "Successful Net Throws", "type": CounterQuestion.type},
            {"id": "teleop_human_player_algae_failed_throws", "title": "Failed Net Throws", "type": CounterQuestion.type},
        ]
    },
    {
        "name": "End",
        "questions": [
            {"id": "climb_time", "title": "Climb Start Time", "choices": ["Didn't Climb","0-5", "5-15", "15-20", "20+"], "type": SelectQuestion.type},
            {"id": "end_state", "title": "Climbed", "choices": ["High", "Low", "Failed and Parked", "Only Parked", "On Field"], "type": SelectQuestion.type},
        ]
    },
    {
        "name": "Post",
        "questions": [
            "Defense:",
            {"id": "played_defense", "title": "Played Defense", "choices": ["Yes", "No"], "type": SelectQuestion.type},
            {"id": "was_defended", "title": "Was Defended Against", "choices": ["Yes", "No"], "type": SelectQuestion.type},
            "Robot:",
            {"id": "robot_status", "title": "Robot Status", "choices": ["Operating Properly", "Operating Poorly" ,"Non-Functional"], "type": SelectQuestion.type},
            {"id": "penalty_amount", "title": "Penalty Amount", "type": CounterQuestion.type},
            {"id": "penalty_description", "title": "Penalty Description", "type": TextBoxQuestion.type},
            "Notes:",
            {"id": "notes", "title": "Notes:", "type": TextBoxQuestion.type},
        ]
    },
]
