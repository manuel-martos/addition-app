import React, { Component } from 'react';

import { NavButtonState } from '../BottomNavigation/BottomNavigation';

export interface PageProps {
  initNavigationButtons?: (left?: NavButtonState, right?: NavButtonState) => void;
}

export default class Page<S = {}, P = PageProps> extends Component<P, S> {
  render() {
    return (
      <>
        {this.props.children}
      </>
    );
  }
}
