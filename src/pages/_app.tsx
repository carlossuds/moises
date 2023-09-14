import { AppBar } from "@/components";
import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { ReactNode } from "react";

const Layout = ({ children }: { children: ReactNode }) => (
  <>
    <AppBar />
    {children}
  </>
);

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Layout>
      <Component {...pageProps} />
    </Layout>
  );
}
