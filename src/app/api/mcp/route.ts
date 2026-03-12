import { StreamableHTTPServerTransport } from "@modelcontextprotocol/sdk/server/streamableHttp.js";
import { createMcpServer } from "@/lib/mcp/server.js";
import { NextRequest, NextResponse } from "next/server";

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

    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined,
    });

    const server = createMcpServer();
    await server.connect(transport);

    const response = await new Promise<Response>((resolve) => {
      const mockRes = {
        statusCode: 200,
        headers: {} as Record<string, string>,
        body: "",
        setHeader(key: string, value: string) { this.headers[key] = value; },
        writeHead(code: number) { this.statusCode = code; },
        end(data?: string) {
          resolve(new Response(data || this.body, {
            status: this.statusCode,
            headers: this.headers,
          }));
        },
        write(chunk: string) { this.body += chunk; },
      };

      const mockReq = {
        method: "POST",
        headers: Object.fromEntries(request.headers.entries()),
        body,
        constructor: { name: "NextRequest" },
      };

      transport.handleRequest(mockReq as any, mockRes as any, body);
    });

    return response;
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
