import React, { RefObject } from 'react';
import { Link } from 'react-router-dom';

import Page, { PageProps } from '../../components/Page/Page';
import PageHeader from '../../components/PageHeader/PageHeader';
import PageBody from '../../components/PageBody/PageBody';
import Container from 'react-bootstrap/Container';
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal  from 'react-bootstrap/Modal';
import { ArithmeticQuiz, ArithmeticQuizInfo, Operator } from '../../components/ArithmeticQuiz/ArithmeticQuiz';
const remote = window.require('electron').remote;

const MAX_ARITHMETIC_QUIZS = 4;

interface AdditionsState {
  showResult: boolean
}

export class Additions extends Page<AdditionsState> {
  private arithmeticQuizs: ArithmeticQuiz[] = [];

  constructor(props: PageProps) {
    super(props);
    this.state = { showResult: false };
    this.onResultModalRefresh = this.onResultModalRefresh.bind(this);
    this.onResultModalFinish = this.onResultModalFinish.bind(this);
  }

  onResultModalRefresh() {
    this.setState({ showResult: false });
    for (var arithmeticQuiz of this.arithmeticQuizs) {
      arithmeticQuiz.updateQuiz();
    }
  }

  onResultModalFinish() {
    var window = remote.getCurrentWindow();
    window.close();
  }

  createArithmeticQuizs() {
    let quizs = [];
    this.arithmeticQuizs = []; 
    for (let idx = 0; idx < MAX_ARITHMETIC_QUIZS; idx++) {
      quizs.push(<ArithmeticQuiz 
        key={idx} 
        ref={ref => { this.arithmeticQuizs.splice(idx, 1, ref!) }} />);
    }
    return quizs;
  }

  createResultModal() {
    return (
      <Modal show={this.state.showResult}>
        <Modal.Body>
          <p>Has donat totes les respostes correctes. Molt ben fet!</p>
          <p>Ara pots decidir si vols acabarà o si vols tornar a fer mes sumes.</p>
        </Modal.Body>

        <Modal.Footer>
          <Button variant="secondary" onClick={this.onResultModalFinish}>Acabar</Button>
          <Button variant="primary" onClick={this.onResultModalRefresh}>Tornar a fer sumes</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  render() {
    let pageHeader = {
      title: `Fem sumes!`,
      lead: `Les sumes son molt divertides.`,
      description: `Escriu el resultat de les sumes:`
    };
    return (
      <>
        <PageHeader info={pageHeader}/>
        <PageBody>
          <Form>
            <Container>
              {this.createArithmeticQuizs()}
            </Container>
          </Form>
        </PageBody>
        { this.createResultModal() }
      </>
    );
  }

  componentDidMount() {
    let rightButton = {
      visible: true,
      text: 'Corretgir',
      onClick: this.onValidateAnswers.bind(this)
    };
    this.props.initNavigationButtons?.(undefined, rightButton);
  }

  onValidateAnswers() {
    let result = true;
    for (var idx = 0; idx < MAX_ARITHMETIC_QUIZS; idx++) {
      result = this.arithmeticQuizs[idx].validateAnswer() && result;
    }
    if (result) {
      this.setState({showResult: true});
    }
  }
}