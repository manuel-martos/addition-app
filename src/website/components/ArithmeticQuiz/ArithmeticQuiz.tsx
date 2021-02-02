import React, { Component } from 'react';

import Col from 'react-bootstrap/Col';
import FormControl from 'react-bootstrap/FormControl';
import Row from 'react-bootstrap/Row';

export enum Operator {Add, Substract}

export interface ArithmeticQuizInfo {
  value1: number;
  value2: number;
  operator: Operator;
};

export interface ArithmeticQuizState {
  quizInfo: ArithmeticQuizInfo; 
  result?: boolean;
}

export class ArithmeticQuiz extends Component<any, ArithmeticQuizState> {
  private answer = React.createRef<typeof FormControl & HTMLInputElement>();

  constructor(props: any) {
    super(props);
    this.state = {result: undefined, quizInfo: this.createRandomQuiz()};
  }

  updateQuiz() {
    this.setState({result: undefined, quizInfo: this.createRandomQuiz()});
    if (this.answer.current) {
      this.answer.current.value = '';
    }
  }

  private createRandomQuiz() {
    let value1, value2;
    do {
      value1 = 1 + Math.floor(Math.random() * 8);
      value2 = 1 + Math.floor(Math.random() * 8);
    } while (value1 < value2);
    return { value1: value1, value2: value2, operator: Operator.Add };
  }

  render() {
    let op = this.state.quizInfo.operator === Operator.Add ? '+' : '-'; 
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
    if (this.state.quizInfo.operator == Operator.Add) {
      return this.state.quizInfo.value1 + this.state.quizInfo.value2;
    } else {
      return this.state.quizInfo.value1 - this.state.quizInfo.value2;
    }
  }
}