import React, { useEffect, useState } from 'react';
import moment, { Moment } from 'moment';
import AddIcon from '@material-ui/icons/Add';
import Button from '@material-ui/core/Button';
import { useDispatch } from 'react-redux';
import { ADD_REMINDER, UPDATE_REMINDER, DELETE_REMINDER } from './store/actions/reminder';

import './App.css';

import Navigator from './components/Navigator';
import MonthView from './components/MonthView';
import ReminderDialog from './components/ReminderDialog';
import Reminder from './models/reminder';

function App() {
    const [date, setDate] = useState<Moment>(moment());
    const [openReminderDialog, setOpenReminderDialog] = useState<boolean>(false);
    const [selectedReminder, setSelectedReminder] = useState<Reminder | null>(null);
    
    const dispatch = useDispatch();

    useEffect(() => {
        if (!selectedReminder) return;

        setOpenReminderDialog(true);
    }, [ selectedReminder ]);

    const saveReminder = (reminder: Reminder) => {
        setOpenReminderDialog(false);

        dispatch({
            type: reminder.id ? UPDATE_REMINDER : ADD_REMINDER,
            payload: reminder
        });

        setSelectedReminder(null);
    };

    const deleteReminder = () => {
        if (!selectedReminder) return;

        setOpenReminderDialog(false);

        dispatch({
            type: DELETE_REMINDER,
            payload: selectedReminder.id
        });

        setSelectedReminder(null);
    }

    const onReminderClicked = (reminder: Reminder) => {
        setSelectedReminder(reminder);
    };

    return (
        <div className="App">
            <div className="Header">
                <Button
                    variant="contained"
                    color="primary"
                    startIcon={<AddIcon />}
                    onClick={() => setOpenReminderDialog(true)}
                >
                    REMINDER
                </Button>

                <Navigator
                    onDateChanged={(date: Moment) => {
                        setDate(date);
                    }}
                />
            </div>
            
            {
                date
                ? <MonthView
                    month={date.get('month')}
                    year={date.get('year')}
                    onReminderClicked={onReminderClicked}
                />
                : null
            }

            <ReminderDialog
                reminder={selectedReminder}
                open={openReminderDialog}
                onClose={() => {
                    setSelectedReminder(null);
                    setOpenReminderDialog(false);
                }}
                onSave={saveReminder}
                onDelete={deleteReminder}
            />
        </div>
    );
}

export default App;
