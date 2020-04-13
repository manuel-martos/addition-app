import React from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import FormControl from 'react-bootstrap/FormControl';
import Modal  from 'react-bootstrap/Modal';

import Page from '../../components/Page/Page';
import PageHeader from '../../components/PageHeader/PageHeader';

const settings = window.require('electron-settings');

interface StartState {
  name: string;
}

export class Start extends Page<StartState> {
  private nameInput = React.createRef<FormControl & HTMLInputElement>();

  constructor(props: any) {
    super(props);
    this.state = { name: settings.get('name') };
    this.onNameModalOk = this.onNameModalOk.bind(this);
    console.log(window);
  }

  onNameModalOk() {
    let name = this.nameInput.current?.value;
    if (name) {
      this.setState({ name: name });
      settings.set('name', name);
    }
  }

  render() {
    if (this.state.name) {
      let pageHeader = {
        title: `Bon dia ${this.state.name}!`,
        lead: `Avui farem una mica de deures de forma diferent i divertida`,
        description: `Amb aquesta aplicació podràs practicar lectura, sumes, restes i altres matèries que normalment fas a l´escola`
      }
      return (
        <>
          <PageHeader info={pageHeader}/>
        </>
      );
    } else {
      return (
        <Modal show={true}>
          <Modal.Body>
            <p>Benvingut a aquesta aplicació. Necesito saber el teu nom.</p>
            <Form>
              <Form.Label>Introdueix el teu nom</Form.Label>
                <Form.Control  ref={this.nameInput} type="text"/>
            </Form>
          </Modal.Body>

          <Modal.Footer>
            <Button variant="primary" onClick={this.onNameModalOk}>Acceptar</Button>
          </Modal.Footer>
        </Modal>
      )
    }
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