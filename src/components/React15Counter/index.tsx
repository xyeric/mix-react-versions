import React, { Component } from 'react';

import styles from './style.scss';

export default class React15Counter extends Component {
  state = {
    count: 0,
  };

  componentDidMount() {
    setInterval(() => {
      this.setState({ count: this.state.count + 1 });
    }, 1000);
  }

  render() {
    const { count } = this.state;

    return (
      <div className={styles['react-15-counter']}> React 15: {count}</div>
    );
  }
};
