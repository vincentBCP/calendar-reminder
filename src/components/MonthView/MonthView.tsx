import React, { useState, useEffect } from 'react';
import moment, { Moment } from 'moment';
import { useSelector } from 'react-redux';

import './MonthView.css';

import DateTile from './DateTile';
import Reminder from '../../models/reminder';

interface IMonthViewProps {
    month: number,//0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11, // 0 = Jan - 11 = Dec
    year: number,
    onReminderClicked: (arg1: Reminder) => void
};

const SAT_DAY_OF_WEEK_NUMBER = 6;

const MonthView: React.FC<IMonthViewProps> = props => {
    const [startDate, setStartDate] = useState<Moment>();
    const [endDate, setEndDate] = useState<Moment>();

    const reminders: Reminder[] = useSelector((state: any) => state.reminder.records);

    useEffect(() => {
        const startDate = moment();
        startDate.year(props.year);
        startDate.month(props.month);
        startDate.date(1);

        const endDate = moment();
        endDate.year(props.year);
        endDate.month(props.month + 1);
        endDate.date(1);
        endDate.subtract(1, 'day');

        setStartDate(startDate);
        setEndDate(endDate);
    }, [ props.month, props.year ]);

    if (!startDate || !endDate) return null;

    const renderDatesMatrix = () => {
        const datesMatrix: any = [
        //   SUN   MON   TUE   WED   THU   FRI   SAT
            [<DateTile key="filler1" />, <DateTile key="filler2" />, <DateTile key="filler3" />, <DateTile key="filler4" />, <DateTile key="filler5" />, <DateTile key="filler6" />, <DateTile key="filler7" />], // row 1
            [], // row 2
            [], // row 3
            [], // row 4
            [], // row 5
            [], // row 6
        ];

        const currentDate = startDate.clone();
        let currentRow = 0;

        while(currentDate.isSameOrBefore(endDate)) {
            const dayOfWeek = currentDate.get('day');

            const label = currentDate.format("D");
            const component = <DateTile
                                key={label}
                                label={label}
                                isToday={currentDate.format("YYYY-MM-DD") === moment().format("YYYY-MM-DD")}
                                isEnd={dayOfWeek === SAT_DAY_OF_WEEK_NUMBER}
                                reminders={reminders.filter((rec: Reminder) => rec.date === currentDate.format("YYYY-MM-DD"))}
                                onReminderClicked={props.onReminderClicked}
                            />
            datesMatrix[currentRow].splice(dayOfWeek, 1, component);

            if (currentDate.format("YYYY-MM-DD") === endDate.format("YYYY-MM-DD") && dayOfWeek !== SAT_DAY_OF_WEEK_NUMBER) {
                datesMatrix[currentRow].splice((dayOfWeek + 1), 1, <DateTile key="filler-end" isEnd />);
            }

            if (dayOfWeek === SAT_DAY_OF_WEEK_NUMBER) { // SAT
                currentRow++;
            }

            currentDate.add(1, 'day');
        }

        return (
            <div className="DatesMatrix">
                {
                    datesMatrix
                    .map((row: any, index: number) => {
                        if (!row[0]) return null;
                        return <div key={index} className="Dates">{ row }</div>
                    })
                }
            </div>
        );
    }

    return (
        <div className="MonthView">
            <div className="DaysHeader">
                <span>SUN</span>
                <span>MON</span>
                <span>TUE</span>
                <span>WED</span>
                <span>THU</span>
                <span>FRI</span>
                <span>SAT</span>
            </div>
            { renderDatesMatrix() }
        </div>
    );
};

export default MonthView;