import { fromUnixTime } from 'date-fns/fp';
import React from 'react';
import {createAppContainer, createSwitchNavigator} from 'react-navigation';

import Home from './src/views/Home';
import Task from './src/views/Task';

const Routes = createAppContainer(
  createSwitchNavigator({
    // definir a sequencia de ecras
    Home,
    Task
  })
);

export default function App() {
  return <Routes/>
    
}
