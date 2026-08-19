import { headers } from "next/headers";
import { Landing } from "./components/Landing";

export default async function NotFound() {
  const host = (await headers()).get("host") ?? "";
  return <Landing host={host} />;
}
