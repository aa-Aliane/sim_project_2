import React, { useState } from "react";
import { api } from "../services/api";
import { useLayout } from "../store/LayoutState";

// components
import Nav from "../components/Nav";
import Filters from "../Layouts/Filters";
import Interface from "../Layouts/Interface";
import Results from "../Layouts/Results";
import About from "../Layouts/About";

const Home = () => {
  const current_layout = useLayout((state) => state.current_layout);
  return (
    <div>
      <Nav />
      <main>
        {(current_layout === "interface" || current_layout === "results") && (
          <Filters />
        )}
        {current_layout === "interface" && <Interface />}
        {current_layout === "results" && <Results />}
        {current_layout === "about" && <About />}
      </main>
    </div>
  );
};

export default Home;
