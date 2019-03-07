import {FetchGanttTasksActionTypes} from "./ganttTasksAT";

const {
    FETCH_GANTT_TASKS_REQUEST,
    FETCH_GANTT_TASKS_SUCCESS,
    FETCH_GANTT_TASKS_FAILURE
} = FetchGanttTasksActionTypes;

const fetchGanttTasksRequest = () => ({
    type: FETCH_GANTT_TASKS_REQUEST,
    isLoading: true,
    isError: false
});

const fetchGanttTasksSuccess = (ganttTasks) => ({
    type: FETCH_GANTT_TASKS_SUCCESS,
    isLoading: false,
    isError: false,
    ganttTasks: ganttTasks
});

const fetchGanttTasksFailure = () => ({
    type: FETCH_GANTT_TASKS_FAILURE,
    isLoading: false,
    isError: true,
});

export const fetchGanttTasks = params => dispatch => {

    const ganttTasks = [
        {
            id: '1',
            type: 'task',
            name: 'Tasks levels',
            begin: new Date(2019, 1, 26),
            end: new Date(2019, 2, 10),
            progress: 50,
            links: [],
            level: 1,
        },
        {
            id: '2',
            type: 'task',
            name: 'Task progress',
            begin: new Date(2019, 2, 11),
            end: new Date(2019, 2, 30),
            progress: 80,
            links: [],
            level: 1,
        },
        {
            id: '3',
            type: 'task',
            name: 'Redux CRUD for tasks',
            begin: new Date(2019, 3, 1),
            end: new Date(2019, 3, 20),
            progress: 10,
            links: [],
            level: 1,
        },
        {
            id: '4',
            type: 'task',
            name: 'Create tasks with modals',
            begin: new Date(2019, 3, 21),
            end: new Date(2019, 3, 30),
            progress: 76,
            links: [],
            level: 1,
        },
        {
            id: '5',
            type: 'task',
            name: 'Links creation',
            begin: new Date(2019, 4, 1),
            end: new Date(2019, 5, 1),
            progress: 23,
            links: [],
            level: 1,
        },
        {
            id: '6',
            type: 'task',
            name: 'Test task',
            begin: new Date(2019, 4, 1),
            end: new Date(2021, 5, 1),
            progress: 100,
            links: [],
            level: 1,
        }];

    dispatch(fetchGanttTasksRequest());
    dispatch(fetchGanttTasksSuccess(ganttTasks));

};

export const ganttTasksChange = ganttTasks => dispatch => {
    dispatch(fetchGanttTasksSuccess(ganttTasks));
};