import React, { Component } from 'react';

import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';

export enum Operator {Add, Substract, Multiply}

export interface ArithmeticQuizInfo {
  value1: number;
  value2: number;
};

export interface ArithmeticQuizProps {
  operator: Operator;
  operandsGenerator: () => ArithmeticQuizInfo;
};

export interface ArithmeticQuizState {
  quizInfo: ArithmeticQuizInfo; 
  result?: boolean;
}

export class ArithmeticQuiz extends Component<ArithmeticQuizProps, ArithmeticQuizState> {
  private answer = React.createRef<typeof FormControl & HTMLInputElement>();

  constructor(props: ArithmeticQuizProps) {
    super(props);
    this.state = {result: undefined, quizInfo: this.props.operandsGenerator()};
  }

  updateQuiz() {
    this.setState({result: undefined, quizInfo: this.props.operandsGenerator()});
    if (this.answer.current) {
      this.answer.current.value = '';
    }
  }

  render() {
    let op = this.resolveOperatorChar()
    let style = this.state.result !== undefined 
      ? { borderColor: this.state.result ? 'green' : 'red' }
      : {}
    return (
      <Row className="justify-content-md-center center-vertical">
        <Col className='col-md-1'>{this.state.quizInfo.value1}</Col>
        <Col className='col-md-1'>{op}</Col>
        <Col className='col-md-1'>{this.state.quizInfo.value2}</Col>
        <Col className='col-md-1'>=</Col>
        <Col className='col-md-2'><FormControl ref={this.answer} id='addition' type="text" style={style}/></Col>
        {this.state.result === undefined && 
          <Col className='col-md-3'>&nbsp;</Col>}
        {this.state.result !== undefined && this.state.result === true && 
          <Col className='col-md-3'>Correcte!</Col>}
        {this.state.result !== undefined && this.state.result === false && 
          <Col className='col-md-3'>Incorrecte!</Col>}
      </Row>
    );
  }

  resolveOperatorChar() {
    switch (this.props.operator) {
      case Operator.Add: return '+';
      case Operator.Substract: return '-';
      case Operator.Multiply: return '×';
    }
  }

  validateAnswer() {
    const result = this.getCurrentAnswer() === this.getValidAnswer();
    this.setState({ result: result });
    return result;
  }

  private getCurrentAnswer() {
    if (typeof this.answer.current?.value === 'string') {
      return parseInt(this.answer.current?.value);
    } else {
      return undefined;
    }
  }

  private getValidAnswer() {
    switch (this.props.operator) {
      case Operator.Add: return this.state.quizInfo.value1 + this.state.quizInfo.value2;
      case Operator.Substract: return this.state.quizInfo.value1 - this.state.quizInfo.value2;
      case Operator.Multiply: return this.state.quizInfo.value1 * this.state.quizInfo.value2;
    }
  }
}