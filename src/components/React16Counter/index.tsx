import React from 'react-16';
import { useState, useEffect } from 'react-16';

import styles from './style.scss';

export default () => {
  const [ count, setCount ] = useState(0);

  useEffect(() => {
    setTimeout(() => {
      setCount(count + 1);
    }, 1000);
  }, [ count ]);

  return (
    <div className={styles['react-16-counter']}> React 16: {count}</div>
  )
};
