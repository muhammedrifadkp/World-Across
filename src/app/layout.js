import { Inter, Roboto_Mono } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import { AuthProvider } from "@/contexts/AuthContext";
import DemoModeWrapper from "@/components/DemoModeWrapper";
import ClientOnly from "@/components/ClientOnly";
import LoadingScreen from "@/components/LoadingScreen";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
});

const roboto_mono = Roboto_Mono({
  variable: "--font-roboto-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "World Across",
  description: "Discover amazing destinations with World Across. Membership-based travel portal offering exclusive packages, hotels, and unforgettable experiences worldwide.",
  keywords: "travel, holidays, membership, packages, hotels, destinations, booking",
  // Next.js will automatically use src/app/icon.png as favicon
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body
        className={`${inter.variable} ${roboto_mono.variable} font-sans antialiased bg-white text-gray-900`}
        suppressHydrationWarning
      >
        <ClientOnly fallback={<LoadingScreen />}>
          <DemoModeWrapper>
            <AuthProvider>
              <Navbar />
              <main className="min-h-screen">
                {children}
              </main>
              <Footer />
            </AuthProvider>
          </DemoModeWrapper>
        </ClientOnly>
      </body>
    </html>
  );
}