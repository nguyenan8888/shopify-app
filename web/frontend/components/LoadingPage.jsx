import { Spinner } from "@shopify/polaris";

export function LoadingPage() {
  return (
    <div style={{ width: "100%", display: "flex", justifyContent: "center" }}>
      <Spinner accessibilityLabel="Spinner example" size="large" />
    </div>
  );
}
