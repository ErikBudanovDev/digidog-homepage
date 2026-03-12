import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { NextRequest, NextResponse } from "next/server";

function createMcpServer() {
  const { registerTools } = require("@/lib/mcp/tools/index.js");
  const server = new McpServer({
    name: "digidog-mcp",
    version: "1.0.0",
  });
  registerTools(server);
  return server;
}

export async function POST(request: NextRequest) {
  try {
    const token = process.env.MCP_BEARER_TOKEN;
    if (token) {
      const auth = request.headers.get("authorization") || "";
      if (auth !== `Bearer ${token}`) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
      }
    }

    const body = await request.json();

    const server = createMcpServer();
    const transport = new StreamableHTTPServerTransport({ sessionIdGenerator: undefined });
    await server.connect(transport);

    const headers: Record<string, string> = {};
    let statusCode = 200;
    let responseBody = "";
    let resolved = false;

    const result = await new Promise<string>((resolve) => {
      const res = {
        writeHead(code: number, hdrs?: Record<string, string>) {
          statusCode = code;
          if (hdrs) Object.assign(headers, hdrs);
          return res;
        },
        setHeader(key: string, value: string) {
          headers[key] = value;
        },
        write(chunk: string | Buffer) {
          responseBody += typeof chunk === "string" ? chunk : chunk.toString();
          return true;
        },
        end(data?: string | Buffer) {
          if (data) responseBody += typeof data === "string" ? data : data.toString();
          if (!resolved) { resolved = true; resolve(responseBody); }
        },
        on() { return res; },
        once() { return res; },
        emit() { return false; },
        headersSent: false,
      };

      const req = {
        method: "POST",
        url: "/api/mcp",
        headers: Object.fromEntries(request.headers.entries()),
        body,
        on() { return req; },
        once() { return req; },
        emit() { return false; },
      };

      transport.handleRequest(req as any, res as any, body);
    });

    return new Response(result, {
      status: statusCode,
      headers: { "Content-Type": headers["content-type"] || "application/json", ...headers },
    });
  } catch (error) {
    console.error("MCP error:", error);
    return NextResponse.json(
      { error: "Internal Server Error", message: error instanceof Error ? error.message : String(error) },
      { status: 500 }
    );
  }
}

export async function GET() {
  return NextResponse.json({ status: "Digidog MCP Server", version: "1.0.0" });
}
