import "../styles/globals.css";
import "bootstrap/dist/css/bootstrap.min.css";
import { SSRProvider } from "react-bootstrap";
import { SessionProvider } from "next-auth/react";

export default function App({ Component, pageProps: { session, ...pageProps } }) {
    return (
        <SessionProvider session={session}>
            <SSRProvider>
                <Component {...pageProps} />
            </SSRProvider>
        </SessionProvider>
    );
}
