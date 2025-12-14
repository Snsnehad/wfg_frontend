import Navbar from "../components/Navbar";
import Header from "../components/Header";
import AnalyticsChart from "../components/AnalyticsChart";
import SadPathChart from "../components/SadPathChart";

export default function MainPage() {
  return (
    <>
      <Navbar />
      <Header />
      <AnalyticsChart />
      <SadPathChart/>
    </>
  );
}
