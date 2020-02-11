import React from 'react';
import Hidden from 'components/Hidden';

function dateToDateTime(date_string) {
    if ( typeof date_string !== 'string' ) return null;
    return new Date(date_string).toISOString();
}

const Time = ({date}) => {

    if ( !date ) return null;

    const dateTime = dateToDateTime(date);

    return (
        <>
            <time dateTime={dateTime} pubdate={dateTime}>
                { date }
            </time>
            <Hidden className="dt-published">
                { dateTime }
            </Hidden>
        </>
    );

};

export default Time;