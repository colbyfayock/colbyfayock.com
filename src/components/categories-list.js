import React from 'react';

const CategoriesList = ({categories}) => {

    if ( typeof categories !== 'string' ) return null;

    return (
        <>
            <div className="categories-list">
                { categories.split(',').map((category, index) => <span key={`CategoriesList-${index}`}>{ category.trim() }</span>) }
            </div>
        </>
    );

}

export default CategoriesList;