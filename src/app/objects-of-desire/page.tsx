import type { Metadata } from "next";
import { DiscoveryScene } from "@/components/discovery-scene";
export const metadata: Metadata = {
  title: "The collector’s room / Objects of Desire",
};
export default function Objects() {
  return (
    <main id="main" className="objects-room-page">
      <DiscoveryScene />
    </main>
  );
}
