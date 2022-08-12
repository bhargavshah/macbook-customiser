import React from "react";

export const SelectProcessor = ({
  variants,
  onSelectVariant,
}) => {
  if (!variants) {
    return null;
  }
  const onSelect = (serialNo) => () => {
    onSelectVariant( serialNo);
  };

  return (
    <div className="component">
      <h3 className="component__name">Processor</h3>
      <ul>
        {variants.map((v) => (
          <li
            key={`Processor_${v.serialNo}`}
            className={`variant ${v.selected ? "variant--selected" : ""}`}
            data-testid={`Processor_${v.serialNo}`}
            onClick={onSelect(v.serialNo)}
          >
            <p className="variant__name">
              <strong>{v.variant}</strong>
            </p>
            {v.addOnPrice > 0 && <p>+ ₹{v.addOnPrice}</p>}
          </li>
        ))}
      </ul>
    </div>
  );
};