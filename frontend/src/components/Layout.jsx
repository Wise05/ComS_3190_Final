// Zevan Gustafson and Koushik Shaganti
import Navbar from "./Navbar";
import Footbar from "./Footbar";
import { Outlet } from "react-router-dom";

function Layout() {
  return (
    <>
      <Navbar />
      <main className="pt-8">
        <Outlet /> {/* Route content */}
      </main>
      <Footbar />
    </>
  );
}

export default Layout;
