import Head from 'next/head'
import { AppProps } from 'next/app'
import { useRouter } from "next/router";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";

import { wrapper } from "../redux/store/store";
import { checkUserAuth, selectUserState } from "../redux/userSlice";
import SocketProvider from "../context"

import './index.css'


function App({ Component, pageProps }: AppProps) {
    const router = useRouter();
    const user = useSelector(selectUserState);
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(checkUserAuth());
        if (user.isAuth) router.push("/chat").catch(e => e)
    }, [user.isAuth, router.route])


    return (
    <>
      <Head>
        <title>Test Task SmartSeller</title>
        <meta name="viewport" content="initial-scale=1.0, width=device-width" />
      </Head>
        <SocketProvider>
            <Component {...pageProps} />
        </SocketProvider>
    </>
  )
}

export default wrapper.withRedux(App);