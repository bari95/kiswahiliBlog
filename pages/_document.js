import TwSizeIndicator from "@components/TwSizeIndicator";
import config from "@config/config.json";
import { Head, Html, Main, NextScript } from "next/document";
import {Analytics} from "@vercel/analytics/react";

const Document = () => {
  // Destructuring items from config object
  const { favicon } = config.site;

  return (
    <Html lang="en">
      <Head>
        {/* Favicon */}

        <style>{`
            /* Your global styles here */
           
            .goog-logo-link {
              display:none !important;
          } 

          .goog-te-combo {
            width: 80px; /* Adjust the minimum width as needed */
            color:blue;
            border-radius:10px;
            margin-left:40px
          }
          
          .goog-te-combo-arrow {
            width: 20px; /* Adjust the width as needed */
          }

          .skiptranslate {
            width:50px
          }

          #g{}
          .goog-te-banner-frame {
            width: 0; /* Set the desired width */
            /* Add other styling properties as needed */
          }
              
          .goog-te-gadget{
              color: transparent !important;
              width:15%
          }
          #google_translate_element {width:15%} 
          #google_translate_element a { display: none; }
          #google_translate_element span { display: none; }

          
         
          `}</style>
        <link rel="shortcut icon" href={favicon} />
        {/* Theme meta */}
        <meta name="theme-name" content="kiswahili-EastAfrica" />
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
        <meta 
          name="google" 
          content="notranslate" 
        />
        
        {/* Google Translate script */}
        <script async type="text/javascript" src="//translate.google.com/translate_a/element.js?cb=googleTranslateLoaded"></script>
      </Head>
      <body>
        <Main />
        <Analytics />
        <TwSizeIndicator />
        <NextScript />

        {/* Google Translate container */}
        <div id="google_translate_element" style={{display:'none'}} className="border p-4">
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
