import {
  Card,
  Checkbox,
  Divider,
  FormLayout,
  Frame,
  Grid,
  Page,
  Tabs,
  Text,
  TextField,
  Toast,
} from "@shopify/polaris";
import { useCallback, useEffect, useState } from "react";
import { isEqual } from "lodash";

import { useAuthenticatedFetch } from "../../hooks";
import { ImageUpload, LoadingPage, ColorPicker } from "../../components";
import Preview from "./Preview";

export default function Popup() {
  const fetch = useAuthenticatedFetch();
  const [selected, setSelected] = useState(0);
  const [defaultData, setDefaultData] = useState(null);
  const [data, setData] = useState(null);
  const [loadingSave, setLoadingSave] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [activeToast, setActiveToast] = useState(false);
  const [activeToastSuccess, setActiveToastSuccess] = useState(false);

  useEffect(() => {
    fetchPopup();
  }, []);

  const tabs = [
    {
      id: 0,
      content: "General",
    },
    {
      id: 1,
      content: "Design",
    },
  ];

  const fetchPopup = async () => {
    setIsLoading(true);
    const response = await fetch("/api/popup", { method: "GET" });
    const popup = await response.json();

    setData(() => popup);
    setDefaultData(() => popup);
    setIsLoading(false);
  };

  const handleSelectTab = useCallback((tabIndex) => {
    setSelected(tabIndex);
  }, []);

  const toggleActive = useCallback(() => setActiveToast((prev) => !prev), []);
  const toggleActiveSuccess = useCallback(
    () => setActiveToastSuccess((prev) => !prev),
    []
  );

  const toastUploadWarn = activeToast ? (
    <Toast
      duration={2000}
      content="Image size <= 5mb"
      onDismiss={toggleActive}
    />
  ) : null;

  const toastUpdateSuccess = activeToastSuccess ? (
    <Toast
      duration={2000}
      content="Updated toast successfully"
      onDismiss={toggleActiveSuccess}
    />
  ) : null;

  const handleSaveData = async () => {
    setLoadingSave(true);

    const response = await fetch("/api/popup", {
      method: "PUT",
      body: JSON.stringify(data),
    });
    const json = await response.json();

    if (json.isSuccess) {
      setDefaultData(() => data);
      setActiveToastSuccess((prev) => !prev);
    }

    setLoadingSave(false);
  };

  return (
    <Frame>
      <Page
        fullWidth
        title="Pop-up"
        backAction={{ content: "Products", url: "/" }}
        compactTitle
        primaryAction={{
          content: "Save",
          disabled: isLoading || data === null || isEqual(data, defaultData),
          onClick: handleSaveData,
          loading: loadingSave,
        }}
      >
        {toastUploadWarn}
        {toastUpdateSuccess}
        {isLoading || data === null ? (
          <LoadingPage />
        ) : (
          <>
            <Grid>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 4, lg: 4, xl: 4 }}>
                <Card>
                  <Tabs
                    tabs={tabs}
                    selected={selected}
                    onSelect={handleSelectTab}
                  />
                  {selected === 0 && (
                    <div>
                      <div style={{ padding: "1rem" }}>
                        <Text variant="headingMd" as="h6">
                          Status
                        </Text>
                        <div style={{ paddingTop: "1rem" }}>
                          <div>
                            <Checkbox
                              label={"Active"}
                              checked={data?.active}
                              onChange={(e) =>
                                setData((prev) => ({ ...prev, active: e }))
                              }
                            />
                          </div>
                        </div>
                      </div>
                      <Divider />
                      <div style={{ padding: "1rem" }}>
                        <Text variant="headingMd" as="h6">
                          Content settings
                        </Text>
                        <div style={{ paddingTop: "1rem" }}>
                          <FormLayout>
                            <TextField
                              label={"Title"}
                              value={data?.title}
                              spellCheck={false}
                              onChange={(value) =>
                                setData((prev) => ({ ...prev, title: value }))
                              }
                            />
                            <TextField
                              label={"Description"}
                              multiline={4}
                              value={data?.description}
                              spellCheck={false}
                              onChange={(value) =>
                                setData((prev) => ({
                                  ...prev,
                                  description: value,
                                }))
                              }
                            />
                            <TextField
                              label={"Button"}
                              value={data?.button_text}
                              spellCheck={false}
                              onChange={(value) =>
                                setData((prev) => ({
                                  ...prev,
                                  button_text: value,
                                }))
                              }
                            />
                            <TextField
                              label={"Button Link"}
                              value={data?.button_link}
                              spellCheck={false}
                              onChange={(value) =>
                                setData((prev) => ({
                                  ...prev,
                                  button_link: value,
                                }))
                              }
                            />
                          </FormLayout>
                        </div>
                      </div>
                    </div>
                  )}
                  {selected === 1 && (
                    <div>
                      <div style={{ padding: "1rem" }}>
                        <Text variant="headingMd" as="h6">
                          Colors & Image
                        </Text>
                        <div style={{ paddingTop: "1rem" }}>
                          <FormLayout>
                            <ColorPicker
                              label={"Background color"}
                              color={data?.bg_color}
                              onChange={(value) =>
                                setData((prev) => ({
                                  ...prev,
                                  bg_color: value.hex,
                                }))
                              }
                            />
                            <ColorPicker
                              label={"Text color"}
                              color={data?.text_color}
                              onChange={(value) =>
                                setData((prev) => ({
                                  ...prev,
                                  text_color: value.hex,
                                }))
                              }
                            />
                            <ColorPicker
                              label={"Button color"}
                              color={data?.button_color}
                              onChange={(value) =>
                                setData((prev) => ({
                                  ...prev,
                                  button_color: value.hex,
                                }))
                              }
                            />
                            <ImageUpload
                              label={"Image"}
                              toggleActive={toggleActive}
                              image={data?.image}
                              setData={setData}
                            />
                          </FormLayout>
                        </div>
                      </div>
                    </div>
                  )}
                </Card>
              </Grid.Cell>
              <Grid.Cell columnSpan={{ xs: 6, sm: 6, md: 8, lg: 8, xl: 8 }}>
                <div style={{ position: "sticky", top: ".5rem", bottom: ".5rem" }}>
                  <Card>
                    <Preview data={data} />
                  </Card>
                </div>
              </Grid.Cell>
            </Grid>
            <div style={{ padding: "2rem" }}></div>
          </>
        )}
      </Page>
    </Frame>
  );
}
