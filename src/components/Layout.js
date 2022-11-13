import Footer from "./Footer";
import Navbar from "./Navbar";
import WannaSell from "./Sticky/WannaSell";
import { heroapi, popularsales, toprateslaes, highlight, sneaker, story, footerAPI } from 'src/plantillas/data.js';

function Layout({ children }) {
  return (
    <>
      <Navbar />
      {children}
      <WannaSell/>
      <Footer footerAPI={footerAPI}/>
    </>
  );
}

export default Layout;
