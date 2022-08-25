import React from "react";

const Summary = ({ processorList }) => {
  return (
    <ul className="summary-list">
      <li>{processorList.find(c => c.selected)?.variant}</li>
      <li>16-inch Retina display with True Tone</li>
      <li>Four Thunderbolt 3 ports</li>
      <li>Touch Bar and Touch ID</li>
      <li>Backlit Magic Keyboard - US English</li>
    </ul>
  )
}

export default Summary;
