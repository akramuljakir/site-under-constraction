import { SITE_CONFIG } from "./config/siteConfig";

export default function Home() {
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
    </div>
  );
}
