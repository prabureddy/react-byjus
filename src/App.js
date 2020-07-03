import React from 'react';
import classes from './App.css';
import Layout from './components/Layout/Layout';

const App = () => {
  
  return (
    <div className={[...[classes.App]].join(' ')}>
      <Layout />
    </div>
  );
}

export default App;
