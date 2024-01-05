import {
  AlphaCard,
  Page,
  Layout,
  Divider,
  Card,
  Text,
  Icon,
} from "@shopify/polaris";
import { DetailedPopUpMajor } from "@shopify/polaris-icons";
import { TitleBar, useNavigate } from "@shopify/app-bridge-react";
import { useTranslation, Trans } from "react-i18next";

import styles from "../styles/home.module.css";

function Plugin({ icon, title, description, href }) {

  const navigate = useNavigate();

  const handleNavigate = () => {
    navigate(href)
  }

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

export default function HomePage() {
  const { t } = useTranslation();

  const plugins = [
    {
      title: "Pop-up",
      description: "Capture more leads and prevent cart abandonment.",
      icon: DetailedPopUpMajor,
      href: "/popup"
    },
  ];
  return (
    <Page fullWidth>
      <Layout>
        <Layout.Section>
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
        </Layout.Section>
      </Layout>
    </Page>
  );
}
