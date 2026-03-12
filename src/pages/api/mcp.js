import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createMcpServer } from "@/lib/mcp/server.js";

export const config = {
  api: {
    bodyParser: true,
  },
};

export default async function handler(req, res) {
  if (req.method === "GET") {
    return res.json({ status: "Digidog MCP Server", version: "1.0.0" });
  }

  try {
    const token = process.env.MCP_BEARER_TOKEN;
    if (token) {
      const auth = req.headers.authorization || "";
      if (auth !== `Bearer ${token}`) {
        return res.status(401).json({ error: "Unauthorized" });
      }
    }

    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    const server = createMcpServer();
    await server.connect(transport);

    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error("MCP error:", error);

    if (!res.headersSent) {
      res.status(500).json({
        error: "Internal Server Error",
        message: error instanceof Error ? error.message : String(error),
      });
    }
  }
}
