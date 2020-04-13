import React, { Component } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Button from 'react-bootstrap/Button';
import { Link } from 'react-router-dom';

export interface NavButtonState {
    visible: Boolean;
    text: string;
    link?: string;
    onClick?: () => void;
}

export interface BottomNavigationState {
    left?: NavButtonState;
    right?: NavButtonState;
}

export default class BottomNavigation extends Component<any, BottomNavigationState> {
  constructor(props: any) {
    super(props);
    this.state = { left: undefined, right: undefined };
  }

  updateButtons(left?: NavButtonState, right?: NavButtonState) {
    this.setState({left: left, right: right});
  }

  render() {
    return (
      <Container className='align-bottom'>
        <Row>
          <Col md={3}> 
            {
              this.state.left && 
              this.state.left.visible && 
              this.createButton(this.state.left, 'float-left', 'warning') 
            }
          </Col>
          <Col md={{ span: 3, offset: 6 }}>
            {
              this.state.right && 
              this.state.right.visible && 
              this.createButton(this.state.right, 'float-right', 'primary') 
            }
          </Col>
        </Row>
      </Container>
    );
  }

  createButton(btnState: NavButtonState, className: string, variant: any) {
    if (btnState.link) {
      return (
        <Link key={btnState.link} to={btnState.link}>
          <Button className={className} block variant={variant}>{btnState.text}</Button>
        </Link>
      )
    } else if (btnState.onClick) {
      return (
        <Button className={className} block variant={variant} onClick={btnState.onClick}>{btnState.text}</Button>
      )
    } else {
      return (
        <Button className={className} block variant={variant}>{btnState.text}</Button>
      )
    }
  }
}