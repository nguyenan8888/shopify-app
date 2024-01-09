export const activeLink = (shopDomain, activateAppId, appEmbeded) => {
  return `https://${shopDomain}/admin/themes/current/editor?context=apps&activateAppId=${activateAppId}/${appEmbeded}`;
};
