import React, { useState, useImperativeHandle, forwardRef } from 'react';
import { Container, Row, Col } from 'react-bootstrap';
import { LinkContainer } from "react-router-bootstrap";
import { Button, type ButtonProps } from "react-bootstrap";

export interface NavButtonState {
  visible: boolean;
  text: string;
  link?: string;
  onClick?: () => void;
}

export interface BottomNavigationState {
  left?: NavButtonState;
  right?: NavButtonState;
}

export interface BottomNavigationHandle {
  updateButtons: (left?: NavButtonState, right?: NavButtonState) => void;
}

// ✅ give it a real props shape (extend later if needed)
export type BottomNavigationProps = {
  className?: string;
};

const BottomNavigation = forwardRef<BottomNavigationHandle, BottomNavigationProps>(
  (_props, ref) => {
    const [state, setState] = useState<BottomNavigationState>({});

    useImperativeHandle(ref, () => ({
      updateButtons: (left?: NavButtonState, right?: NavButtonState) => setState({ left, right }),
    }), []);

    const createButton = (
      btn: NavButtonState,
      className: string,
      variant: ButtonProps["variant"]
    ) => {
      if (btn.link) {
        return (
          <LinkContainer to={btn.link}>
            <Button className={`${className} w-100`} variant={variant}>
              {btn.text}
            </Button>
          </LinkContainer>
        );
      }
      return (
        <Button
          className={`${className} w-100`}
          variant={variant}
          onClick={btn.onClick}
        >
          {btn.text}
        </Button>
      );
    };

    return (
      <Container className="align-bottom">
        <Row>
          <Col md={3}>
            {state.left?.visible && createButton(state.left, 'float-start', 'warning')}
          </Col>
          <Col md={{ span: 3, offset: 6 }}>
            {state.right?.visible && createButton(state.right, 'float-end', 'primary')}
          </Col>
        </Row>
      </Container>
    );
  }
);

BottomNavigation.displayName = 'BottomNavigation';
export default BottomNavigation;
