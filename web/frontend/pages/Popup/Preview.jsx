import { Button, Icon, Text, TextField } from "@shopify/polaris";
import { CancelMajor } from "@shopify/polaris-icons";

export default function Preview({ data }) {
  return (
    <div>
      <div style={{ padding: "1rem" }}>
        <Text variant="headingMd" as="h6">
          Preview
        </Text>
        <div
          style={{
            width: "100%",
            minHeight: "500px",
            backgroundColor: "rgba(0,0,0,0.3)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            padding: "0 1rem"
          }}
        >
          <div
            style={{
              width: "100%",
              maxWidth: "700px",
              height: "100%",
              backgroundColor: "#fff",
              borderRadius: "5px",
              position: "relative",
            }}
          >
            <div
              style={{
                width: "fit-content",
                borderRadius: "50%",
                backgroundColor: "#fff",
                position: "absolute",
                right: "-8px",
                top: "-8px",
                padding: "4px",
              }}
            >
              <Icon source={CancelMajor} />
            </div>
            <div style={{ display: "flex" }}>
              <div style={{ flex: 1 }}>
                <img
                  src={
                    data?.image ||
                    "https://via.placeholder.com/820x400.png?text=Your+image"
                  }
                  alt="image"
                  style={{
                    width: "100%",
                    height: "100%",
                    objectFit: "cover",
                    display: "block",
                    borderTopLeftRadius: "5px",
                    borderBottomLeftRadius: "5px",
                  }}
                />
              </div>
              <div style={{ flex: 1, padding: "2rem 1.5rem",backgroundColor: data?.bg_color }}>
                {data?.title?.trim() && (
                  <h3
                    style={{
                      fontSize: "1.5rem",
                      fontWeight: 700,
                      marginBottom: ".75rem",
                      color: data?.text_color
                    }}
                  >
                    {data?.title}
                  </h3>
                )}
                {data?.description?.trim() && (
                  <p style={{ marginBottom: ".75rem", color: data?.text_color }}>{data?.description}</p>
                )}
                <div style={{ marginBottom: ".75rem" }}>
                  <TextField placeholder="Enter your email" />
                  <button
                    style={{
                      marginTop: ".5rem",
                      width: "100%",
                      padding: "0.75rem 0",
                      backgroundColor: data.button_color,
                      color: "#fff",
                      border: "none",
                      borderRadius: "4px",
                    }}
                  >
                    {data?.button_text}
                  </button>
                </div>
                <div>
                  <a target="_blank" href={data?.button_link || "#"}>Contact us</a>
                  {"  to remove brandmark"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
