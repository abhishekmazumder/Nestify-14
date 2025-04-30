import { Inter, Poppins } from "next/font/google";
import "@/assets/styles/globals.css";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "photoswipe/dist/photoswipe.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import AuthProvider from "@/components/AuthProvider";
import { GlobalProvider } from "@/context/GlobalContext";

// const inter = Inter({ subsets: ["latin"] });
const poppins = Poppins({ weight: ["400", "500", "600", "700", "800", "900"], subsets: ["latin"] });

export const metadata = {
  title: "Nestify",
  keywords: "rental, property, listings, real estate",
  description: "Find your perfect home",
};

export default function RootLayout({ children }) {
  return (
    <AuthProvider>
      <GlobalProvider>
        <html lang="en">
          <body className={poppins.className}>
            <Navbar />
            <main>{children}</main>
            <Footer />
            <ToastContainer />
          </body>
        </html>
      </GlobalProvider>
    </AuthProvider>
  );
}
