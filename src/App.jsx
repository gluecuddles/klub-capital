import Navbar from "./components/Navbar";
import Hero from "./components/Hero";
import QuietStatement from "./components/QuietStatement";
import Problem from "./components/Problem";
import Solution from "./components/Solution";
import Audience from "./components/Audience";
import HowItWorks from "./components/HowItWorks";
import Differentiation from "./components/Differentiation";
import TrustAccess from "./components/TrustAccess";
import ApplicationSection from "./components/ApplicationSection";
import FinalCTA from "./components/FinalCTA";
import Footer from "./components/Footer";

export default function App() {
  return (
    <>
      <Navbar />
      <main>
        <Hero />
        <QuietStatement />
        <Problem />
        <Solution />
        <Audience />
        <HowItWorks />
        <Differentiation />
        <TrustAccess />
        <ApplicationSection />
        <FinalCTA />
      </main>
      <Footer />
    </>
  );
}
