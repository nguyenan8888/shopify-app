import {
  AlphaCard,
  Page,
  Layout,
  Divider,
  Card,
  Text,
  Icon,
  Button,
} from "@shopify/polaris";
import { DetailedPopUpMajor } from "@shopify/polaris-icons";
import { useNavigate } from "@shopify/app-bridge-react";
import { useTranslation } from "react-i18next";
import { useEffect, useState } from "react";

import styles from "../styles/home.module.css";
import { useAuthenticatedFetch } from "../hooks";
import { LoadingPage } from "../components";

function Plugin({ icon, title, description, href }) {
  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(href);
  };

  return (
    <div className={styles.plugin} onClick={handleNavigate}>
      <div className={styles.plugin_icon}>
        <Icon source={icon} />
      </div>
      <div className={styles.plugin_info}>
        <div>
          <Text variant="headingSm">{title}</Text>
        </div>
        <div>
          <span style={{ fontSize: "0.75rem", opacity: ".8" }}>
            {description}
          </span>
        </div>
      </div>
    </div>
  );
}

function WarnBanner({ deeplink }) {
  
  const handleActive = () => {
    window.open(deeplink, "_blank");
  };

  return (
    <Card>
      <div
        style={{
          backgroundColor: "#ffb800",
          borderTopLeftRadius: "0.5rem",
          borderTopRightRadius: "0.5rem",
        }}
      >
        <div style={{ padding: 12 }}>
          <h3 style={{ fontWeight: 600 }}>
            <span style={{ marginRight: ".25rem" }}>&#9888;</span>
            <span>Action required: Activate Popup</span>
          </h3>
        </div>
      </div>
      <div style={{ padding: 12, marginBottom: "2rem" }}>
        <Button size="slim" onClick={handleActive}>
          Active
        </Button>
      </div>
    </Card>
  );
}

export default function HomePage() {
  const { t } = useTranslation();
  const fetch = useAuthenticatedFetch();

  const [loading, setLoading] = useState(false);
  const [warnBanner, setWarnBanner] = useState({
    show: false,
    link: null,
  });

  useEffect(() => {
    setLoading(true);
    fetch("/api/app-embeded")
      .then((res) => res.json())
      .then((data) => {
        if (data.isSuccess) {
          const [_, asset] = data.block;

          setWarnBanner({
            show: asset.disabled,
            link: asset.disabled ? data?.deeplink : null,
          });
        }
      })
      .catch((err) => {
        console.log(err);
      })
      .finally(() => setLoading(false));
  }, []);

  const plugins = [
    {
      title: "Pop-up",
      description: "Capture more leads and prevent cart abandonment.",
      icon: DetailedPopUpMajor,
      href: "/popup",
    },
  ];

  return (
    <Page narrowWidth>
      <Layout>
        <Layout.Section>
          {loading ? (
            <LoadingPage />
          ) : (
            <>
              {warnBanner.show && <WarnBanner deeplink={warnBanner.link} />}
              <Card>
                {plugins.map((plugin, i) => (
                  <Plugin
                    key={i}
                    title={plugin.title}
                    icon={plugin.icon}
                    description={plugin.description}
                    href={plugin.href}
                  />
                ))}
              </Card>
            </>
          )}
        </Layout.Section>
      </Layout>
    </Page>
  );
}
