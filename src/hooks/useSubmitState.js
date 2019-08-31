import React, { useState } from 'react';

export const useSubmitState = (cbPromise, initialText, Spinner, finalText = 'Gracias!') => {
  const [child, setChild] = useState(initialText);
  const [disabled, setDisabled] = useState(false);

  async function submitHandler(event) {
    setDisabled(true);
    setChild(<Spinner />);
    try {
      await cbPromise(event);
      setChild(finalText);
    } catch (error) {
      throw new Error(error);
    }
  }
  return [disabled, child, submitHandler];
};
