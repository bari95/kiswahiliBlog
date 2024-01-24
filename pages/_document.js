import TwSizeIndicator from "@components/TwSizeIndicator";
import config from "@config/config.json";
import { Head, Html, Main, NextScript } from "next/document";

const Document = () => {
  // Destructuring items from config object
  const { favicon } = config.site;

  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}
        <link rel="shortcut icon" href={favicon} />
        {/* Theme meta */}
        <meta name="theme-name" content="geeky-nextjs" />
        <meta name="msapplication-TileColor" content="#000000" />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: light)"
          content="#fff"
        />
        <meta
          name="theme-color"
          media="(prefers-color-scheme: dark)"
          content="#000"
        />
        {/* Google Translate script */}
        <script async type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateLoaded"></script>
      </Head>
      <body>
        <Main />
        <TwSizeIndicator />
        <NextScript />

        {/* Google Translate container */}
        <div id="google_translate_element" className="border p-4">
          {/* Your content goes here */}
          <p>Hello, this is a sample content for Google Translate.</p>
        </div>

        {/* Google Translate initialization script */}
        <script dangerouslySetInnerHTML={{ __html: `
          function loadGoogleTranslate() {
            new google.translate.TranslateElement({ pageLanguage: 'en' }, 'google_translate_element');
          }

          // Callback when Google Translate API is loaded
          function googleTranslateLoaded() {
            loadGoogleTranslate(); // Call the function when the API is loaded
          }

          // Add event listener for the API loaded event
          googleTranslateElementInit = googleTranslateLoaded;
        `}} />
      </body>
    </Html>
  );
};

export default Document;
