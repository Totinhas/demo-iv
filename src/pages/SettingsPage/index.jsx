import React from "react";

const SettingsPage = ({ settings, onChangeNumber, onChangeDifficulty }) => (
  <div>
    <label>Players Number</label>
    <input
      onChange={onChangeNumber}
      type="text"
      value={settings.numberOfPlayers}
    ></input>
    <br />
    <label>Difficulty</label>
    <input
      onChange={onChangeDifficulty}
      type="text"
      value={settings.symbols}
    ></input>
    <button>Start</button>
  </div>
);

export default SettingsPage;
