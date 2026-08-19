import { SITE_CONFIG } from "../config/siteConfig";

export function getAlternateLinks(host: string): string[] {
  const sub = host.split(".")[0].toLowerCase();

  const matched = Object.keys(SITE_CONFIG.subdomainSeries).find((key) =>
    sub.startsWith(key)
  );
  const base = matched ?? SITE_CONFIG.defaultSeries;

  const count = SITE_CONFIG.subdomainSeries[base];
  return [base, ...Array.from({ length: count }, (_, i) => `${base}${i + 1}`)]
    .filter((s) => s !== sub)
    .map((s) => `${s}.${SITE_CONFIG.rootDomain}`);
}

export function Landing({ host }: { host: string }) {
  const alternateLinks = getAlternateLinks(host);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center text-center px-6">
      <h1 className="text-2xl sm:text-3xl font-semibold tracking-tight">
        {SITE_CONFIG.companyName}
      </h1>
      <p className="text-sm text-slate-400 mt-3 max-w-md">
        This site is under construction. Check back soon.
      </p>
      <a
        href={`mailto:${SITE_CONFIG.supportEmail}`}
        className="text-sm text-slate-400 hover:text-white mt-6 underline underline-offset-4"
      >
        {SITE_CONFIG.supportEmail}
      </a>

      {alternateLinks.length > 0 && (
        <div className="mt-8 flex flex-wrap items-center justify-center gap-x-4 gap-y-2 text-xs text-slate-500">
          <span>Alternate links:</span>
          {alternateLinks.map((link) => (
            <a
              key={link}
              href={`https://${link}`}
              className="text-slate-400 hover:text-white underline underline-offset-4"
            >
              {link}
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
