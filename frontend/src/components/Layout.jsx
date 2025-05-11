// Zevan Gustafson and Koushik Shaganti
import { useState } from "react";
import Navbar from "./Navbar";
import Footbar from "./Footbar";
import { Outlet } from "react-router-dom";

function Layout() {
  const [openSearchBar, setOpenSearchBar] = useState(false);
  const [isSignedIn, setIsSignedIn] = useState(
    localStorage.getItem("userEmail") || ""
  );

  return (
    <>
      <Navbar
        openSearchBar={openSearchBar}
        setOpenSearchBar={setOpenSearchBar}
        isSignedIn={isSignedIn}
      />
      <main className="pt-8 pb-8 min-h-[95vh]">
        <Outlet context={{ setOpenSearchBar, setIsSignedIn }} />{" "}
        {/* Route content */}
      </main>
      <Footbar />
    </>
  );
}

export default Layout;
