import React, { Component, useState } from 'react';
import EasyEdit from 'react-easy-edit';

function Bio({ isOwnProfile = false, save, initial }) {
  let bioText = (isOwnProfile && initial === null) ? "Click to edit" : initial

  let text = initial || isOwnProfile ? 'Click to edit' : 'No bio'
  const [bio, setBio] = useState(bioText)
  const cancel = () => { console.log("Cancelled") }

  return (
    isOwnProfile ? <EasyEdit
      value={bioText}
      type="text"
      onSave={(value) => {
        setBio(value)
        save(value)
      }}
      onCancel={cancel}
      saveButtonLabel="Save"
      cancelButtonLabel="Cancel"
      attributes={{ name: "awesome-input", id: 1 }}
    />
      : <div>{text}</div>
  );
}

export default Bio