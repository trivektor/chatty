import React, {useState, useCallback} from 'react';
import {
  Dialog,
  Classes,
  InputGroup,
  FormGroup,
} from '@blueprintjs/core';

const NameDialog = ({onNameConfirm}) => {
  const [name, setName] = useState('');
  const [isOpen, setIsOpen] = useState(true);
  const onSubmit = useCallback((event) => {
    event.preventDefault();

    if (!name) return;

    sessionStorage.setItem('name', name);

    onNameConfirm(name);

    setIsOpen(false);
  }, [onNameConfirm, setIsOpen, name]);

  return (
    <Dialog
      usePortal={false}
      isOpen={isOpen}
      isCloseButtonShown={false}
      title="Name">
      <div className={Classes.DIALOG_BODY}>
        <form onSubmit={onSubmit}>
          <FormGroup label="What's your name, mate?">
            <InputGroup
              autoFocus
              onChange={(event) => setName(event.target.value)} />
          </FormGroup>
        </form>
      </div>
    </Dialog>
  );
};

export {NameDialog as default};
