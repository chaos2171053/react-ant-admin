import React from 'react';
import { Route, Switch } from 'react-router-dom';

interface TransitionMainProps {
  children: React.ReactNode;
}

function TransitionMain({ children }: TransitionMainProps) {
  return <Route render={({ location }) => <Switch location={location}>{children}</Switch>}></Route>;
}

export default TransitionMain;
