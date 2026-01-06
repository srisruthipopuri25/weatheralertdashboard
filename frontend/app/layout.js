import "./globals.css";

export const metadata = {
  title: "Environmental Monitoring Dashboard",
  description: "Real-time environmental monitoring and alerts",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
