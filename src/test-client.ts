import { config } from 'dotenv';
import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

// Load access token from .env file
config();

async function main() {
  // Get Oura token from environment variable
  const ouraToken = process.env.OURA_API_TOKEN;
  if (!ouraToken) {
    throw new Error("OURA_API_TOKEN environment variable is required");
  }

  let transport: StreamableHTTPClientTransport | undefined;

  try {
    // Create client
    const client = new Client({
      name: "oura-client",
      version: "1.0.0"
    });

    // Create transport
    const baseUrl = new URL("http://localhost:3000/mcp");
    transport = new StreamableHTTPClientTransport(baseUrl);
    
    console.log("Connecting to MCP server...");
    await client.connect(transport);
    console.log("Connected successfully!");

    // List available resources
    const response = await client.listResources()
    console.log('\nAvailable Resources:');
    response.resources.forEach((r) => console.log(`- ${r.name}: ${r.template || r.uri}`));

    // List available resource templates
    const response2 = await client.listResourceTemplates()
    console.log('\nAvailable Resource Templates:');
    response2.resourceTemplates.forEach((r) => console.log(`- ${r.name}: ${r.uriTemplate}`));

    // Test personal info resource
    console.log('\nFetching personal info...');
    const personalInfo = await client.readResource({
      uri: `oura://personal_info/${ouraToken}`
    });
    console.log('Personal Info:', personalInfo);

    // Test daily sleep with date range
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    console.log('\nFetching daily sleep data...');
    const dailySleep = await client.readResource({
      uri: `oura://daily_sleep/${ouraToken}/${yesterday}/${today}`
    });
    console.log('Daily Sleep:', dailySleep);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    if (transport) {
      await transport.close();
    }
  }
}

main().catch(console.error); 