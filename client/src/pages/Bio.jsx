import React, { Component } from 'react';
import EasyEdit from 'react-easy-edit';

function Bio() {

  const save = (value) => {console.log(value)}
  const cancel = () => {console.log("Cancelled")}

  return (
    <EasyEdit
      type="text"
      onSave={save}
      onCancel={cancel}
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      attributes={{ name: "awesome-input", id: 1}}
    />
  );
} 

export default Bio