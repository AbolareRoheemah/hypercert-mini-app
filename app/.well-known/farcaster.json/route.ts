export async function GET() {
  const URL = process.env.NEXT_PUBLIC_URL;

  return Response.json({
    "accountAssociation": {
      "header": "eyJmaWQiOjEwMjQ1MjMsInR5cGUiOiJjdXN0b2R5Iiwia2V5IjoiMHhjMTkwMjRCQzREQmI4Mjk3RjA2NzRhMmZBNTlkMEI0NDZBY0FCMTNhIn0",
      "payload": "eyJkb21haW4iOiJoeXBlcmNlcnQtbWluaS1hcHAudmVyY2VsLmFwcCJ9",
      "signature": "MHgxODQxMzAyYjY4ZDQyODFmODAwMmRjZWZlZWFkMGJmNjRmMjE0MGQxYjAyY2ZhMDM5MWJiZGY5MDUyODFjOTBkMTAzYzA1MmE2MDQ2NDE1ZGIwNzk4YmNhMjIxYjY5ZDBhYWRkZDRkNzcyMDQwMDY3MGU0Nzc0ZGQwM2JlMjQyNjFj"
    },
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
