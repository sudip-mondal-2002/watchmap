import type {AppProps} from 'next/app'
import {Navbar} from "../components/Navbar";
import "../styles/globals.css"
import {EndpointServiceProvider} from "../providers/EndpointServiceProvider";

export default function App({Component, pageProps}: AppProps) {
    return <EndpointServiceProvider>
        <Navbar/>
        <Component {...pageProps} />
    </EndpointServiceProvider>
}
