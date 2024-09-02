// import { ScrollViewStyleReset } from 'expo-router/html';
import { type PropsWithChildren } from 'react';

/**
 * This file is web-only and used to configure the root HTML for every web page during static rendering.
 * The contents of this function only run in Node.js environments and do not have access to the DOM or browser APIs.
 */
export default function Root({ children }: PropsWithChildren) {
  return (
    <html lang="en">
      <head>
        <meta charSet="utf-8" />
        <meta httpEquiv="X-UA-Compatible" content="IE=edge" />
        <meta
          name="viewport"
          content="width=device-width, initial-scale=1, shrink-to-fit=no"
        />
        <meta property="og:site_name" content="Lahelu" />
        <meta property="og:type" content="website" />
        <meta property="og:local" content="id" />
        <meta name="twitter:site" content="@lahelucom" />
        <meta name="twitter:creator" content="@lahelucom" />
        <meta name="twitter:card" content="summary_large_image" />

        <title>Lahelu - Komunitas Meme Indonesia</title>
        <meta property="og:title" content="Lahelu - Komunitas Meme Indonesia" />
        <meta
          property="og:description"
          content="Lahelu adalah komunitas meme Indonesia terbesar, penuh dengan koleksi gambar dan video lucu setiap harinya. Kami menerima segala macam humor dimanapun dan kapanpun."
        />
        <meta property="og:url" content="https://lahelu.com/" />
        <meta
          property="og:image"
          content="https://lahelu.com/media/icons/banner.png"
        />
        <meta
          name="twitter:title"
          content="Lahelu - Komunitas Meme Indonesia"
        />
        <meta
          name="twitter:description"
          content="Lahelu adalah komunitas meme Indonesia terbesar, penuh dengan koleksi gambar dan video lucu setiap harinya. Kami menerima segala macam humor dimanapun dan kapanpun."
        />
        <meta
          name="twitter:image"
          content="https://lahelu.com/media/icons/banner.png"
        />
        <meta
          name="description"
          content="Lahelu adalah komunitas meme Indonesia terbesar, penuh dengan koleksi gambar dan video lucu setiap harinya. Kami menerima segala macam humor dimanapun dan kapanpun."
        />
        {/* Using raw CSS styles as an escape-hatch to ensure the background color never flickers in dark-mode. */}
        <style dangerouslySetInnerHTML={{ __html: responsiveBackground }} />
        {/* Add any additional <head> elements that you want globally available on web... */}
      </head>
      <body>{children}</body>
    </html>
  );
}

const responsiveBackground = `
  
  /* These styles make the body full-height */
  html, body, #root { 
    /* To smooth any scrolling behavior */
    -webkit-overflow-scrolling: touch;
    margin: 0px;
    padding: 0px;
    height: 100%;
    overflow-y: hidden;
  }
  #root {
    flex-shrink: 0;
    flex-basis: auto;
    flex-grow: 1;
    display: flex;
    flex: 1;
  }

  /* Color theming */
  /* Default will always be white */
  :root {
    --text: black;
    --background: white;
    --backgroundLight: #ffffff;
  }
  /* This gives us a black background when system is dark and we have not loaded the theme/color scheme values in JS */
  @media (prefers-color-scheme: dark) {
    :root {
      --text: white;
      --background: black;
      --backgroundLight: #333333;
      color-scheme: dark;
    }
  }
`;
