import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import LiveStream from "@/components/LiveStream";
import Tournaments from "@/components/Tournaments";
import Team from "@/components/Team";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <LiveStream />
        <Tournaments />
        <Team />
      </main>
      <Footer />
    </>
  );
}
