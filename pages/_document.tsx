import Document, { Html, Head, Main, NextScript } from 'next/document'

class MyDocument extends Document {
  render() {
    return <Html>
      <Head>
        <link rel="preconnect" href="https://app.snipcart.com" />
        <link rel="preconnect" href="https://cdn.snipcart.com" />
        <link rel="stylesheet" href="https://cdn.snipcart.com/themes/v3.0.25/default/snipcart.css" />
      </Head>
      <body>
        <Main />
        <NextScript />
        <script async src="https://cdn.snipcart.com/themes/v3.0.25/default/snipcart.js"></script>
        <div hidden id="snipcart" data-api-key={process.env.STORE_KEY}></div>
      </body>
    </Html>
  }
}

export default MyDocument
