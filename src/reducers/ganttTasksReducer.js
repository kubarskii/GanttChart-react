import {FetchGanttTasksActionTypes} from "../actions/ganttTasks/ganttTasksAT";

const {
    FETCH_GANTT_TASKS_REQUEST,
    FETCH_GANTT_TASKS_SUCCESS,
    FETCH_GANTT_TASKS_FAILURE
} = FetchGanttTasksActionTypes;

const initialState = {
    isLoading: true,
    isError: false
};

const ganttTasksReducer = (
    state = initialState,
    {
        type,
        ganttTasks,
        isLoading,
        isError
    }
) => {

    switch (type) {

        case FETCH_GANTT_TASKS_REQUEST :
            return {
                ...state,
                isLoading,
                isError,
            };
        case FETCH_GANTT_TASKS_SUCCESS :
            return {
                ...state,
                ganttTasks,
                isLoading,
                isError
            };
        case FETCH_GANTT_TASKS_FAILURE:
            return {
                ...state,
                isLoading,
                isError
            };

        default:
            return state;

    }

};

export default ganttTasksReducer;