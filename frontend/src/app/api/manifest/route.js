export async function GET(req) {
    const manifest = {
      name: "Živić-Elektro",
      short_name: "Zivić-Elektro",
      description: "Prodaja elektromaterijala, Metalka Majur, Nopallux, Elid, Tehnoelektro",
      start_url: "/",
      display: "standalone",
      background_color: "#ffffff",
      theme_color: "#000000",
      icons: [
        {
          src: "/icons/android-chrome-192x192.png",
          sizes: "192x192",
          type: "image/png"
        },
        {
          src: "/icons/android-chrome-512x512.png",
          sizes: "512x512",
          type: "image/png"
        },
        {
            src: "/icons/favicon-32x32.png",
            sizes: "32x32",
            type: "image/png"
          },
        {
            src: "/icons/favicon-16x16.png",
            sizes: "16x16",
            type: "image/png"
          }
      ]
    };
  
    return new Response(JSON.stringify(manifest), {
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }
  