import React, { Component, useState } from 'react';
import EasyEdit from 'react-easy-edit';

function Bio({ isOwnProfile = false, save, initial = "Click to edit" }) {
  let bioText = isOwnProfile && initial === null ? "Click to edit" : initial
  const [bio, setBio] = useState(bioText)
  const cancel = () => { console.log("Cancelled") }

  return (
    isOwnProfile ? <EasyEdit
      value={bio}
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
      : <div>{bio}</div>
  );
}

export default Bio