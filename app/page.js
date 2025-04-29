import FeaturedProperties from "@/components/FeaturedProperties";
import Hero from "@/components/Hero";
import HomeProperties from "@/components/HomeProperties";
import InfoBoxes from "@/components/InfoBoxes";
import Image from "next/image";

export default function HomePage() {
  return (
    <div>
      <Hero />
      <InfoBoxes />
      <FeaturedProperties />
      <HomeProperties />
    </div>
  );
}
