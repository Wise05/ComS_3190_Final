// Zevan Gustafson and Koushik Shaganti
import { useState } from "react";
import Navbar from "./Navbar";
import Footbar from "./Footbar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [openSearchBar, setOpenSearchBar] = useState(false);

  return (
    <>
      <Navbar
        openSearchBar={openSearchBar}
        setOpenSearchBar={setOpenSearchBar}
      />
      <main className="pt-8 pb-8 min-h-[95vh]">
        <Outlet context={{ setOpenSearchBar }} /> {/* Route content */}
      </main>
      <Footbar />
    </>
  );
}

export default Layout;
