const N8N_URL = "https://n8n.lbtawreed.online/webhook/tawreed-KSA-curriculum-intake";

export default async function handler(req, res) {
  if (req.method !== "POST") {
    res.status(405).json({ error: "Method not allowed" });
    return;
  }

  try {
    const contentType = req.headers["content-type"] || "application/json";
    const body =
      contentType.includes("application/json")
        ? JSON.stringify(req.body)
        : new URLSearchParams(req.body).toString();

    const response = await fetch(N8N_URL, {
      method: "POST",
      headers: { "Content-Type": contentType },
      body
    });

    const text = await response.text();
    res.status(response.status);
    res.setHeader("Content-Type", response.headers.get("content-type") || "application/json");
    res.send(text);
  } catch (error) {
    res.status(502).json({ error: "Upstream n8n request failed", message: error.message });
  }
}
