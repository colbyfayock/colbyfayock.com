import React from 'react';

const Time = ({date}) => {

    if ( !date ) return null;

    return (
        <time dateTime="2016-03-11" pubdate="">
            { date }
        </time>
    );

};

export default Time;