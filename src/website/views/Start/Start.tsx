import React, { Component } from 'react';

import Page from '../../components/Page/Page';
import PageHeader from '../../components/PageHeader/PageHeader';

export class Start extends Page {
  render() {
    let pageHeader = {
      title: `Bon dia Joel!`,
      lead: `Avui farem una mica de deures de forma diferent i divertida`,
      description: `Amb aquesta aplicació podràs practicar lectura, sumes, restes i altres matèries que normalment fas a l´escola`
    }
    return (
      <>
        <PageHeader info={pageHeader}/>
      </>
    );
  }

  componentDidMount() {
    let rightButton = {
      visible: true,
      text: 'Continuar',
      link: '/additions'
    };
    this.props.initNavigationButtons?.(undefined, rightButton);
  }
}