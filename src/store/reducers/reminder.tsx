import { ADD_REMINDER, UPDATE_REMINDER, DELETE_REMINDER } from '../actions/reminder';
import { v4 as uuidv4 } from 'uuid';

import Reminder from '../../models/reminder';

interface IReduxAction {
    type: string,
    payload: Reminder | string
};

const initialState = {
    records: [
        /*{
            id: uuidv4(),
            description: "Lorem ipsum dolor sit amet adispiscing consectutar",
            date: "2021-03-01",
            time: "13:01",
            color: "#0000FF"
        },
        {
            id: uuidv4(),
            description: "Lorem ipsum dolor sit amet adispiscing",
            date: "2021-03-01",
            time: "13:02",
            color: "#0000FF"
        },
        {
            id: uuidv4(),
            description: "Lorem ipsum dolor sit amet adispiscing",
            date: "2021-03-01",
            time: "13:03",
            color: "#0000FF"
        },
        {
            id: uuidv4(),
            description: "Lorem ipsum dolor sit amet adispiscing",
            date: "2021-03-01",
            time: "13:04",
            color: "#0000FF"
        }*/
    ]
}

const addReminder = (state: any, record: Reminder) => {
    if (!record) return state;

    const updatedRecords = [...state.records];
    updatedRecords.push({
        id: uuidv4(),
        ...record
    });

    return {
        ...state,
        records: [...updatedRecords]
    }
};

const updateReminder = (state: any, record: Reminder) => {
    if (!record) return state;

    const updatedRecords = [...state.records];
    const index = updatedRecords.findIndex((rec: Reminder) => record.id === rec.id);

    if (index === -1) return;

    updatedRecords[index] = {...record};

    return {
        ...state,
        records: [...updatedRecords]
    };
};

const deleteReminder = (state: any, id: string) => {
    if (!id) return state;

    const updatedRecords = [...state.records];
    const index = updatedRecords.findIndex((rec: Reminder) => rec.id === id);

    if (index === -1) return;

    updatedRecords.splice(index, 1);

    return {
        ...state,
        records: [...updatedRecords]
    };
};

const actions: any = {};

actions[ADD_REMINDER] = addReminder;
actions[UPDATE_REMINDER] = updateReminder;
actions[DELETE_REMINDER] = deleteReminder;

const reducer = (state = initialState, action: IReduxAction) => {
    if (!actions[action.type])
        return state;

    return actions[action.type](state, action.payload);
};

export default reducer;