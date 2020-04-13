import React, { Component, ReactElement } from 'react';

import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

import { SelectableCard } from '../SelectableCard/SelectableCard';

export interface SelectableCardGroupProps {
  children: (ReactElement | ReactElement[]);
}

export class SelectableCardGroup extends Component<SelectableCardGroupProps> {
  private cards: SelectableCard[] = [];

  constructor(props: SelectableCardGroupProps) {
    super(props);
    this.onSelectionChanged = this.onSelectionChanged.bind(this);
  }

  onSelectionChanged(selectedCard: SelectableCard, selected: Boolean) {
    this.cards.forEach(card => {
      if (selected && card !== selectedCard) {
        card.setSelected(false);
      }
    });
  }

  render() {
    let children: ReactElement[] = Array.isArray(this.props.children) 
      ? this.props.children as ReactElement[]
      : [this.props.children];
    return (
      <Container>
        <Row className="justify-content-md-center">
          {children.map((child, key) => {
            return ( 
              <Col className='col-md-4' key={key}>
                <SelectableCard 
                  ref={ ref => { this.cards.push(ref!); } }
                  onSelectionChanged={this.onSelectionChanged} 
                  {...child.props} />
              </Col>
            );
          })}
        </Row>
      </Container>
    );
  }
}