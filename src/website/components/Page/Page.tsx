import React, { Component, ReactElement } from 'react';

import { NavButtonState } from '../BottomNavigation/BottomNavigation';

export interface PageProps {
  initNavigationButtons?: (left?: NavButtonState, right?: NavButtonState) => void;
}

export default class Page<S = {}> extends Component<PageProps, S> {
  render() {
    return (
      <>
        {this.props.children}
      </>
    );
  }
}
