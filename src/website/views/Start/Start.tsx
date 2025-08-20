import { useEffect, useMemo, useRef, useState, useCallback } from 'react';

import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';

import PageHeader from '../../components/PageHeader/PageHeader';
import type { PageProps } from '../../components/Page/Page';

// Access electron-settings via window.require (works in Electron renderer)
const settings: any = (window as any).require?.('electron-settings');

export function Start(props: PageProps) {
  // Lazy init from electron-settings (may be undefined on first run)
  const [name, setName] = useState<string | undefined>(() => settings?.get?.('name'));
  const nameInputRef = useRef<HTMLInputElement | null>(null);

  const onNameModalOk = useCallback(() => {
    const value = nameInputRef.current?.value?.trim();
    if (value) {
      setName(value);
      settings?.set?.('name', value);
    }
  }, []);

  // Set up bottom navigation (componentDidMount equivalent)
  useEffect(() => {
    const rightButton = {
      visible: true,
      text: 'Continuar',
      link: '/additions',
    };
    props.initNavigationButtons?.(undefined, rightButton);
  }, [props.initNavigationButtons]);

  const pageHeader = useMemo(
    () =>
      name
        ? {
            title: `Bon dia ${name}!`,
            lead: `Avui farem una mica de deures de forma diferent i divertida`,
            description: `Amb aquesta aplicació podràs practicar lectura, sumes, restes i altres matèries que normalment fas a l´escola`,
          }
        : null,
    [name]
  );

  if (pageHeader) {
    return <PageHeader info={pageHeader} />;
  }

  return (
    <Modal show>
      <Modal.Body>
        <p>Benvingut a aquesta aplicació. Necesito saber el teu nom.</p>
        <Form
          onSubmit={(e) => {
            e.preventDefault();
            onNameModalOk();
          }}
        >
          <Form.Label>Introdueix el teu nom</Form.Label>
          <Form.Control ref={nameInputRef} type="text" autoFocus />
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="primary" onClick={onNameModalOk}>
          Acceptar
        </Button>
      </Modal.Footer>
    </Modal>
  );
}

export default Start;
