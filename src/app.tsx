import React, { Component } from 'react';
import ReactDOM from 'react-dom-16';
import React15Counter from './components/React15Counter';
import React16Counter from './components/React16Counter';

import styles from './app.scss';

export default class App extends Component {
  mountNode: HTMLDivElement | null;

  componentDidMount() {
    if (this.mountNode) {
      ReactDOM.render(<React16Counter />, this.mountNode);
    }
  }

  render() {
    return (
      <div className={styles['app-container']}>
        <div className={styles['app-title']}>Mix React 15 and React 16</div>
        <div className={styles['app-layout']}>
          <div className={styles['app-left-side']}>
            <React15Counter />
          </div>
          <div className={styles['app-right-side']}>
            <div ref={(e) => this.mountNode = e }></div>
          </div>
        </div>
      </div>
    );
  }
}
