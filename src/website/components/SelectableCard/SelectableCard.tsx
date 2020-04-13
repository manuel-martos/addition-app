import React, { Component, MouseEvent } from 'react';

import Card from 'react-bootstrap/Card';

export interface SelectableCardProps {
    title: string;
    text: string;
    selected: Boolean;
    onSelectionChanged?: (card: SelectableCard, selected: Boolean) => void;
}

export interface SelectableCardState {
    selected: Boolean;
}

export class SelectableCard extends Component<SelectableCardProps, SelectableCardState> {
  constructor(props: SelectableCardProps) {
    super(props);
    this.state = { selected: props.selected };
    this.toggleSelection = this.toggleSelection.bind(this);
  }

  toggleSelection(event: MouseEvent) {
    event.preventDefault();
    let selected = !this.state.selected;
    this.setState({ selected: selected });
    if (this.props.onSelectionChanged) {
      this.props.onSelectionChanged(this, selected);
    }
  }

  setSelected(selected: Boolean) {
    this.setState({ selected: selected });
  }

  render() {
    return (
      <a onClick={this.toggleSelection}>
        <Card>
          <Card className={this.state.selected ? 'selected' : 'unselected'}>
            <Card.Body>
              <Card.Title>{this.props.title}</Card.Title>
              <Card.Text>{this.props.text}</Card.Text>
            </Card.Body>
          </Card>
        </Card>
      </a>
    );
  }
}