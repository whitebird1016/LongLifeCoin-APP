import Head from 'next/head'
import Image from 'next/image'
import Crypto from './crypto'


export default function Home() {
  return (
    <>
      <Head>
        <title>LongLifeCoin for Longevity</title>
        <meta name="description" content="LongLifeCoin was created to reflect the longevity wishes of people all over the world. The great Inventor of  LongLifeCoin is Johnny Chiang, Chinese American." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content="LongLifeCoin longevity wish" />
        <meta property="og:description" content="LongLifeCoin was created to reflect the longevity wishes of people all over the world." />
        <meta property="og:image" content="https://longlifcoin/og-image.png" />
        <meta property="og:url" content="https://longlifecoin.com" />

        <meta name="twitter:title" content="LongLifeCoin longevity wish" />
        <meta name="twitter:description" content="LongLifeCoin was created to reflect the longevity wishes of people all over the world." />
        <meta name="twitter:url" content="https://longlifecoin.com/twitter-image.png" />
        <meta name="twitter:card" content="summary" />

        <link rel="icon" href="/assets/img/svg/longlifecoin.svg" />
      </Head>
      <main>
        <Crypto />
      </main>
    </>
  )
}
