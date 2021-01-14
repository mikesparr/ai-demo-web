module.exports = {
  serverRuntimeConfig: {
    // Will only be available on the server side
  },
  publicRuntimeConfig: {
    // Will be available on both server and client
    predictUrl: process.env.NEXT_PUBLIC_PREDICT_URL,
    ingestUrl: process.env.NEXT_PUBLIC_INGEST_URL,
    predictKey: process.env.NEXT_PUBLIC_PREDICT_KEY,
    ingestKey: process.env.NEXT_PUBLIC_INGEST_KEY,
  },
};
