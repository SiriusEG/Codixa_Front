import StoreProvider from "./StoreProvider";

export const metadata = {
  title: "E-learningSiriusEg",
  description: "Full E-learning website built by Sirius team ",
  icons: { icon: "./2.png" },
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="overflow-x-hidden font-primary">
        <StoreProvider>{children}</StoreProvider>
      </body>
    </html>
  );
}
