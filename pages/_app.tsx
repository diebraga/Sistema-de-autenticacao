import "../styles/global.css"
import { ChakraProvider, ColorModeProvider } from '@chakra-ui/react'
import Router from 'next/router'
import { parseCookies } from 'nookies'

function MyApp({ Component, pageProps }) {
  return (
    <ChakraProvider resetCSS>
      <ColorModeProvider
        options={{
          useSystemColorMode: true,
        }}
      >
        <Component {...pageProps} />
      </ColorModeProvider>
    </ChakraProvider>
  )
}

function redirectUser(ctx, location) {
  if (ctx.req) {
    ctx.res.writeHead(302, { Location: location });
    ctx.res.end();
  } else {
    Router.push(location);
  }
}

MyApp.getInitialProps = async ({Component, ctx}) => {
  let pageProps = {}
  const jwt = parseCookies(ctx).jwt

  if (Component.getInitialProps) {
    pageProps = await Component.getInitialProps(ctx)
  }

  if (!jwt) {
    if (ctx.pathname === "/") {
      redirectUser(ctx, "/login");
    } 
  }

  return {
    pageProps,
  }
}

export default MyApp
