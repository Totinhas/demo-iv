import React from "react";
import "./SettingsPage.css";

const SettingsPage = ({ settings, onChangeNumber, onChangeDifficulty }) => (
  <div className="settingsPage">
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
  </div>
);

export default SettingsPage;
