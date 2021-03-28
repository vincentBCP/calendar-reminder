import React, { useState } from 'react';
import moment, { Moment } from 'moment';
import IconButton from '@material-ui/core/IconButton';
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft';
import ArrowRightIcon from '@material-ui/icons/ArrowRight';

import './Navigator.css';

interface INavigatorProps {
    isLoading?: boolean,
    onDateChanged: (arg1: Moment) => void
}

const Navigator: React.FC<INavigatorProps> = props => {
    const [date, setDate] = useState<Moment>(moment());

    const navigateToMonth = (hop: -1 | 1) => {
        if (!date) return;
        if (props.isLoading) return;

        const newDate = date.clone().add(hop, 'month');

        setDate(newDate);

        props.onDateChanged(newDate);
    };

    return (
        <div className="Navigator">
            <IconButton onClick={() => navigateToMonth(-1)}>
                <ArrowLeftIcon fontSize="inherit" />
            </IconButton>
            
            <span>{date?.format("MMM YYYY")}</span>

            <IconButton onClick={() => navigateToMonth(1)}>
                <ArrowRightIcon fontSize="inherit" />
            </IconButton>
        </div>
    );
};

export default Navigator;