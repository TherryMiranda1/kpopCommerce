import Footer from "./Footer";
import Navbar from "./Navbar";
import { footerAPI } from 'src/plantillas/data.js';
import AOS from "aos";
import "aos/dist/aos.css";
import { useEffect } from "react";

function Layout({ children }) {
  useEffect(() => {
    AOS.init();
  }, []);
  return (
    <div style={{overflow:'hidden'}}>
      <Navbar />
      {children}
      {/* <WannaSell/> */}
      <Footer footerAPI={footerAPI}/>
    </div >
  );
}

export default Layout;
