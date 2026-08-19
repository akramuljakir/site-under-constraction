import { headers } from "next/headers";
import { Landing } from "../components/Landing";

export default async function CatchAll() {
  const host = (await headers()).get("host") ?? "";
  return <Landing host={host} />;
}
