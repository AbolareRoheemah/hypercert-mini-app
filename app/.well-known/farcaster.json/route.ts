export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL;

  return Response.json({
    frame: {
      version: "1",
      name: "Hypercerts Mini App",
      subtitle: "Hypercerts Marketplace",
      description: "Discover and manage your hypercerts seamlessly with our intuitive platform.",
      iconUrl: `${URL}/icon.png`,
      splashImageUrl: `${URL}/base-logo-in-blue.jpg`,
      splashBackgroundColor: "#0000FF",
      homeUrl: URL,
      webhookUrl: `${URL}/api/webhook`,
      heroImageUrl: `${URL}/base-logo-in-blue.jpg`
    },
  });
}
