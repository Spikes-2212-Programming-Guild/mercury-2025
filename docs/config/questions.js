import {SingleNumberQuestion} from "../questions/SingleNumberQuestion";
import {TextLineQuestion} from "../questions/TextLineQuestion";
import {CounterQuestion} from "../questions/CounterQuestion";
import {NumberFromChoicesQuestion} from "../questions/NumberFromChoicesQuestion";
import {SelectQuestion} from "../questions/SelectQuestion";
import {TextboxQuestion} from "../questions/TextboxQuestion";
import {ALL_TEAMS, RESET_TYPES} from "./constants";

export const pageConfig = [
    {
        "name": "Pre",
        "questions": [
            "General Info",
            {"id": "scouter_name", "title": "Scouter name", "resetType": RESET_TYPES.KEEP, "type": TextLineQuestion},
            {"id": "game_type", "title": "Game Type", "resetType": RESET_TYPES.KEEP, "choices": ["Practice", "Qualifications"], "type": SelectQuestion},
            {"id": "game_number", "title": "Game Number", "resetType": RESET_TYPES.INCREASE, "type": SingleNumberQuestion},
            "Team Info",
            {"id": "team_number", "title": "Team Number", "choices": ALL_TEAMS, "type": NumberFromChoicesQuestion},
            {"id": "alliance_color", "title": "Alliance", "resetType": RESET_TYPES.KEEP, "choices": ["Red", "Blue"], "type": SelectQuestion}
        ]
    },
    {
        "name": "Auto",
        "questions": [
            {"id": "left_starting_line", "title": "Left the Starting Line", "choices": ["Yes", "No"], "type": SelectQuestion},
            "Amount of Corals Scored:",
            {"id": "auto_coral_l4", "title": "L4", "type": CounterQuestion},
            {"id": "auto_coral_l3", "title": "L3", "type": CounterQuestion},
            {"id": "auto_coral_l2", "title": "L2", "type": CounterQuestion},
            {"id": "auto_coral_l1", "title": "L1", "type": CounterQuestion},
            "Amount of Algae removed:",
            {"id": "auto_high_algae", "title": "High", "type": CounterQuestion},
            {"id": "auto_low_algae", "title": "Low", "type": CounterQuestion},
            "Algae:",
            {"id": "auto_robot_algae_throws", "title": "Robot Throws to Net", "type": CounterQuestion},
            {"id": "auto_algae_inserts", "title": "Algae Processor Inserts", "type": CounterQuestion},
            "Human Player:",
            {"id": "auto_human_player_algae_successful_throws", "title": "Successful Net Throws", "type": CounterQuestion},
            {"id": "auto_human_player_algae_failed_throws", "title": "Failed Net Throws", "type": CounterQuestion},
        ]
    },
    {
        "name": "Teleop",
        "questions": [
            "Amount of Corals Scored:",
            {"id": "teleop_coral_l4", "title": "L4", "type": CounterQuestion},
            {"id": "teleop_coral_l3", "title": "L3", "type": CounterQuestion},
            {"id": "teleop_coral_l2", "title": "L2", "type": CounterQuestion},
            {"id": "teleop_coral_l1", "title": "L1", "type": CounterQuestion},
            "Amount of Algae removed:",
            {"id": "teleop_high_algae", "title": "High", "type": CounterQuestion},
            {"id": "teleop_low_algae", "title": "Low", "type": CounterQuestion},
            "Algae:",
            {"id": "teleop_robot_algae_throws", "title": "Robot Throws/Places in Net", "type": CounterQuestion},
            {"id": "teleop_algae_inserts", "title": "Algae Processor Inserts", "type": CounterQuestion},
            "Human Player:",
            {"id": "teleop_human_player_algae_successful_throws", "title": "Successful Net Throws", "type": CounterQuestion},
            {"id": "teleop_human_player_algae_failed_throws", "title": "Failed Net Throws", "type": CounterQuestion},
        ]
    },
    {
        "name": "End",
        "questions": [
            {"id": "climb_time", "title": "Climb Start Time", "choices": ["Didn't Climb","0-5", "5-15", "15-20", "20+"], "type": SelectQuestion},
            {"id": "end_state", "title": "Climbed", "choices": ["High", "Low", "Failed and Parked", "Only Parked", "On Field"], "type": SelectQuestion},
        ]
    },
    {
        "name": "Post",
        "questions": [
            "Defense:",
            {"id": "played_defense", "title": "Played Defense", "choices": ["Yes", "No"], "type": SelectQuestion},
            {"id": "was_defended", "title": "Was Defended Against", "choices": ["Yes", "No"], "type": SelectQuestion},
            "Robot:",
            {"id": "robot_status", "title": "Robot Status", "choices": ["Operating Properly", "Operating Poorly" ,"Non-Functional"], "type": SelectQuestion},
            {"id": "penalty_amount", "title": "Penalty Amount", "type": CounterQuestion},
            {"id": "penalty_description", "title": "Penalty Description", "type": TextboxQuestion},
            "Notes:",
            {"id": "notes", "title": "Notes:", "type": TextboxQuestion},
        ]
    },
]
