import React from 'react';

const Hidden = ({ children, className }) => {
  const styles = {
    display: 'none',
    visibility: 'hidden'
  }
  return <div className={className} style={styles}>{ children }</div>;
}

export default Hidden;