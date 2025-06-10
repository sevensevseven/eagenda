import Background from "@/components/background";
import Hero from "@/components/hero";
import Navbar from "@/components/navbar";
import { getFeatures } from "@/util";
import Card from "@/components/card";
import Carousel from "@/components/carousel";
import Dropdown from "@/components/dropdown";
import FAQ from "@/components/faq";

export default function Home() {
  return (
    <main className="container mx-auto px-4 lg:px-8">
      <Background />
      <Navbar />
      <Hero />
      <div className="hidden lg:flex lg:flex-row items-center justify-center">
        <div className="w-[120rem] ml-16 overflow-visible">
          <img src="/laptop.png" className="scale-150 object-contain pointer-events-none" />
        </div>
        <Carousel />
      </div>
      <div className="flex lg:hidden flex-row flex-wrap justify-center gap-4 mb-8">
        {getFeatures().map((feature, index) => (
          <Card
            key={index}
            title={feature.title}
            description={feature.description}
            imageSrc={feature.img || null}
          />
        ))}
      </div>
      <FAQ />
    </main>
  );
}
