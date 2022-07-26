const i18next = require("i18next");
const i18nextMiddleware = require("i18next-http-middleware");
const i18nextBackend = require("i18next-node-fs-backend");


i18next
  .use(i18nextBackend)
  .use(i18nextMiddleware.LanguageDetector)
  .init(
    {
      lng: "en",
      fallbackLng: ["en", "fr", "ar"],
      preload: ["en", "fr", "ar"],
      queryParameter: "lang",
      cookie: "lang",
      ns: ["translation"],
      defaultNS: "translation",
      backend: {
        loadPath: "./locales/{{lng}}/translation.json",
      },
    },
    (err, t) => {
      if (err) return console.error(err);
    }
  );
module.exports = i18next;
