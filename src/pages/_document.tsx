import * as React from 'react';
import Document, { Html, Head, Main, NextScript } from 'next/document';
import theme from '../settings/theme';

export default class MyDocument extends Document {
  render() {
    return (
        <Html lang="en">
          <Head>
            <meta property="og:title" content="Daily Reading Bible" />
            <meta property="og:type" content="book.bible" />
            <meta property="og:image" content="/bible.png" />
            <meta name="theme-color" content={theme.palette.primary.main}/>
            <meta name="description" content="Bible Reading Plans for you." />

            <link rel="shortcut icon" href="/favicon.ico"/>
            <link
                rel="stylesheet"
                href="https://fonts.googleapis.com/css?family=Roboto:300,400,500,700&display=swap"
            />
          </Head>
          <body>
          <Main/>
          <NextScript/>
          </body>
        </Html>
    );
  }
}
