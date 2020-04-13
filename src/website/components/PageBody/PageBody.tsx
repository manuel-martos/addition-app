import React, { Component, ReactElement } from 'react';

export default class PageBody extends Component<any> {
  constructor(props: any) {
    super(props);
  }
    
  render() {
    return (
      <>
        {this.props.children}
      </>
    );
  }
}