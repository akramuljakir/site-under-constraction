export const SITE_CONFIG = {
  companyName: "Network Service",
  supportEmail: "contact@networkservice.in",
  rootDomain: "networkservice.in",
  // Subdomain series: base name -> how many numbered copies exist (1..count)
  subdomainSeries: {
    office: 5,
    shop: 3,
  } as Record<string, number>,
  // Series shown when the visited host doesn't match a known series
  defaultSeries: "office",
};
