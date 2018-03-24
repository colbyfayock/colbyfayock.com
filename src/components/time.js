import React from 'react';

function dateToDateTime(date_string) {
    if ( typeof date_string !== 'string' ) return null;
    return new Date(date_string).toISOString();
}

const Time = ({date}) => {

    if ( !date ) return null;

    return (
        <time dateTime={dateToDateTime(date)} pubdate={dateToDateTime(date)}>
            { date }
        </time>
    );

};

export default Time;