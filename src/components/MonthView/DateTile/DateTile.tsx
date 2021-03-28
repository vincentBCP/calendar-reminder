import React, { useState } from 'react';
import Reminder from '../../../models/reminder';
import _ from 'lodash';
import moment from 'moment';
import Popover from '@material-ui/core/Popover';

import './DateTile.css';

interface IDateTileProps {
    label?: string,
    isToday?: boolean,
    isEnd?: boolean,
    reminders?: Reminder[],
    onReminderClicked?: (arg1: Reminder) => void
};

const MAX_VIEWABLE_REMINDERS = 3;

const DateTile: React.FC<IDateTileProps> = props => {
    const [showMore, setShowMore] = useState<boolean>(false);
    const [popoverAnchorEl, setPopoverAnchorEl] = useState<any>();

    return (
        <div className={["DateTile", props.isToday ? "today" : "", !props.label ? "empty" : "", props.isEnd ? "end" : ""].join(" ")}>
            {
                props.label
                ? <span className="DateLabel">{ props.label }</span>
                : null
            }
            {
                props.reminders && props.reminders.length > 0
                ? <div className="Reminders">
                    {
                        _.orderBy(props.reminders, ["time"])
                        .map((rec: Reminder, index: number) => {
                            if ((index + 1) > MAX_VIEWABLE_REMINDERS) return null;

                            return (
                                <div
                                    key={index}
                                    className="Reminder"
                                    onClick={() => {
                                        if (!props.onReminderClicked) return;

                                        props.onReminderClicked(rec);
                                    }}
                                    style={{
                                        backgroundColor: rec.color
                                    }}
                                >
                                    <span>{moment(rec.time, "HH:mm").format("h:mm a")} {rec.description}</span>
                                </div>
                            );
                        })
                    }
                    {
                        props.reminders.length > MAX_VIEWABLE_REMINDERS
                        ? <span
                            className="More"
                            onClick={(event: React.MouseEvent<HTMLButtonElement>) => {
                                setPopoverAnchorEl(event.currentTarget);
                                setShowMore(true);
                            }}
                        >
                            {(props.reminders.length - MAX_VIEWABLE_REMINDERS)} more...
                        </span>
                        : null
                    }
                    {
                        props.reminders.length > MAX_VIEWABLE_REMINDERS
                        ? <Popover
                            id="more-reminders-popover"
                            open={showMore}
                            anchorEl={popoverAnchorEl}
                            onClose={() => setShowMore(false)}
                            anchorOrigin={{
                                vertical: 'top',
                                horizontal: 'right',
                            }}
                            transformOrigin={{
                                vertical: 'top',
                                horizontal: 'left',
                            }}
                        >
                            <div className="Reminders all">
                                {
                                    _.orderBy(props.reminders, ["time"])
                                    .map((rec: Reminder, index: number) => {
                                        return (
                                            <div
                                                key={index}
                                                className="Reminder"
                                                onClick={() => {
                                                    if (!props.onReminderClicked) return;
            
                                                    props.onReminderClicked(rec);
                                                }}
                                                style={{
                                                    backgroundColor: rec.color
                                                }}
                                            >
                                                <span>{moment(rec.time, "HH:mm").format("h:mm a")} {rec.description}</span>
                                            </div>
                                        );
                                    })
                                }
                            </div>
                        </Popover>
                        : null
                    }
                </div>
                : null
            }
        </div>
    );
};

export default DateTile;