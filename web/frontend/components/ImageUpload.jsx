import { Button, Icon, Thumbnail } from "@shopify/polaris";
import { DeleteMajor, UploadMajor } from "@shopify/polaris-icons";
import { useRef } from "react";

import { getBase64 } from "../utils/core";

export function ImageUpload({ label, image, toggleActive, setData }) {
  const uploadRef = useRef();

  const handleUpload = () => {
    uploadRef.current.click();
  };

  const handleFile = async (e) => {
    const file = e.target.files[0];

    if (file.size > 5 * 10 ** 6) {
      e.target.value = null;
      toggleActive();
      return;
    }

    getBase64(file).then((res) => {
      setData((prev) => ({ ...prev, image: res }));
    });
  };

  const handleDeleteImage = () => {
    setData((prev) => ({ ...prev, image: null }));
    uploadRef.current.value = null;
  };

  return (
    <div>
      <div style={{ marginBottom: 4 }}>{label}</div>
      <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
        {image && (
          <Thumbnail source={image} size="large" alt="Black choker necklace" />
        )}
        <div style={{ display: "flex", gap: 8 }}>
          {image && (
            <Button
              variant="primary"
              tone="critical"
              onClick={handleDeleteImage}
            >
              <Icon source={DeleteMajor} />
            </Button>
          )}
          <Button variant="primary" tone="critical" onClick={handleUpload}>
            <Icon source={UploadMajor} />
          </Button>
        </div>
      </div>

      <input
        type="file"
        hidden
        ref={uploadRef}
        accept="image/*"
        onChange={handleFile}
      />
    </div>
  );
}
