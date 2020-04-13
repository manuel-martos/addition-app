import React, { Component } from 'react';

export interface PageHeaderInfo {
    title: String;
    lead: String;
    description: String;
};

export interface PageHeaderProps {
    info: PageHeaderInfo; 
}

export default class PageHeader extends Component<PageHeaderProps> {
  render() {
    return (
      <>
        <h1 className='display-4'>{this.props.info.title}</h1>
        <p className="lead">{this.props.info.lead}</p>
        <hr className="my-4"/>
        <p>{this.props.info.description}</p>
      </>
    );
  }
}