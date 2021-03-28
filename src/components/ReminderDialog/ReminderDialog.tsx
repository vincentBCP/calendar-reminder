import React, { useEffect, useState } from 'react';
import moment from 'moment';
import { createStyles, Theme, withStyles, WithStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import MuiDialogTitle from '@material-ui/core/DialogTitle';
import MuiDialogContent from '@material-ui/core/DialogContent';
import MuiDialogActions from '@material-ui/core/DialogActions';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import { TextField } from '@material-ui/core';
import { KeyboardTimePicker, KeyboardDatePicker } from '@material-ui/pickers';
import TimeIcon from '@material-ui/icons/AccessTime';

import './ReminderDialog.css';

import Reminder from '../../models/reminder';

interface IReminderDialogProps {
    reminder?: Reminder | null
    open: boolean,
    onClose: () => void,
    onSave: (arg1: Reminder) => void,
    onDelete: () => void
};

const styles = (theme: Theme) =>
    createStyles({
    root: {
        margin: 0,
        padding: theme.spacing(2),
    },
    closeButton: {
        position: 'absolute',
        right: theme.spacing(1),
        top: theme.spacing(1),
        color: theme.palette.grey[500],
    },
});

export interface DialogTitleProps extends WithStyles<typeof styles> {
    id: string;
    children: React.ReactNode;
    onClose: () => void;
}

const DialogTitle = withStyles(styles)((props: DialogTitleProps) => {
    const { children, classes, onClose, ...other } = props;

    return (
        <MuiDialogTitle disableTypography className={classes.root} {...other}>
            <span className="ReminderTitle">{children}</span>
            {onClose ? (
                <IconButton aria-label="close" className={classes.closeButton} onClick={onClose}>
                    <CloseIcon />
                </IconButton>
            ) : null}
        </MuiDialogTitle>
    );
});
  
const DialogContent = withStyles((theme: Theme) => ({
    root: {
        padding: theme.spacing(2),
    },
}))(MuiDialogContent);
  
const DialogActions = withStyles((theme: Theme) => ({
    root: {
        margin: 0,
        padding: theme.spacing(1),
    },
}))(MuiDialogActions);

const DEFAULT_COLOR = '#0000FF';
const MAX_DESCRIPTION_LENGTH = 30;

const ReminderDialog: React.FC<IReminderDialogProps> = props => {
    const [description, setDescription] = useState<string>('');
    const [date, setDate] = useState<Date | null>(null);
    const [time, setTime] = useState<Date | null>(null);
    const [color, setColor] = useState<string>(DEFAULT_COLOR);

    useEffect(() => {
        if (!props.reminder) return;

        setDescription(props.reminder.description);
        setDate(new Date(props.reminder.date));
        setTime(new Date(props.reminder.date + " " + props.reminder.time));
        setColor(props.reminder.color);
    }, [ props.reminder ]);

    const close = () => {
        setDescription('');
        setDate(null);
        setTime(null);
        setColor(DEFAULT_COLOR);

        props.onClose();
    }

    const isFormValid = () => {
        return description && date && time;
    }

    const onSave = () => {
        const reminder: Reminder = {
            ...(props.reminder || {}),
            description: description,
            date: moment(date).format("YYYY-MM-DD"),
            time: moment(time).format("HH:mm"),
            color: color
        };

        props.onSave(reminder);
        close();
    }

    return (
        <Dialog onClose={close} aria-labelledby="customized-dialog-title" open={props.open}>
            <DialogTitle id="customized-dialog-title" onClose={close}>
                { props.reminder ? props.reminder.description : 'Add New Reminder' }
            </DialogTitle>

            <DialogContent dividers>
                <div className="ReminderForm">
                    <TextField
                        label="Description"
                        value={description}
                        onChange={(ev: any) => {
                            const value = ev.target.value;

                            if (value.length > MAX_DESCRIPTION_LENGTH) {
                                setDescription(description);
                                return;
                            }

                            setDescription(value);
                        }}
                    />
                    {/*<TextField
                        type="date"
                        label="Date"
                        value={date}
                        onChange={(ev: any) => setDate(ev.target.value)}
                    />*/}
                    <KeyboardDatePicker
                        variant="inline"
                        format="MM/dd/yyyy"
                        label="Date"
                        value={date}
                        onChange={(date: Date | null) => setDate(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change date',
                        }}
                        autoOk
                    />
                    {/*<TextField
                        type="time"
                        label="Time"
                        value={time}
                        onChange={(ev: any) => setTime(ev.target.value)}
                    />*/}
                    <KeyboardTimePicker
                        label="Time"
                        value={time}
                        onChange={(date: Date | null) => setTime(date)}
                        KeyboardButtonProps={{
                            'aria-label': 'change time',
                        }}
                        keyboardIcon={<TimeIcon />}
                    />
                    <TextField
                        type="color"
                        label="Color"
                        value={color}
                        onChange={(ev: any) => setColor(ev.target.value)}
                    />
                </div>
            </DialogContent>

            <DialogActions>
                {
                    props.reminder
                    ? <Button
                        onClick={props.onDelete}
                        color="secondary"
                    >
                        Delete
                    </Button>
                    : null
                }

                <Button
                    onClick={onSave}
                    color="primary"
                    disabled={!isFormValid()}
                >
                    Save
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ReminderDialog;