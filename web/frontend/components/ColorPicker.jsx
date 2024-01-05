import { useState } from "react";
import { SketchPicker } from "react-color";
import { Text, TextField } from "@shopify/polaris";

export function ColorPicker({ label, color, onChange }) {
  const [open, setOpen] = useState(false);

  const handleClose = () => {
    setOpen((prev) => !prev);
  };

  return (
    <div>
      <div style={{ marginBottom: 4 }}>{label}</div>
      <div style={{ display: "flex", gap: 4 }}>
        <TextField value={color} />
        <div
          style={{
            outline: "1px solid rgba(171, 177, 186, 1)",
            borderRadius: ".25rem",
            width: "80px",
            backgroundColor: color,
          }}
          onClick={handleClose}
        ></div>
      </div>
      {open && (
        <div
          style={{
            position: "absolute",
            zIndex: "100",
          }}
        >
          <div
            style={{
              position: "fixed",
              top: "0px",
              right: "0px",
              bottom: "0px",
              left: "0px",
            }}
            onClick={handleClose}
          />
          <SketchPicker color={color} onChange={onChange} />
        </div>
      )}
    </div>
  );
}
