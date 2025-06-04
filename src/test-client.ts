import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StreamableHTTPClientTransport } from "@modelcontextprotocol/sdk/client/streamableHttp.js";

async function main() {
  // Create client and transport
  const client = new Client({
    name: "Oura API Test Client",
    version: "1.0.0"
  });
  const baseUrl = new URL("http://localhost:3000/mcp");
  const transport = new StreamableHTTPClientTransport(baseUrl);

  try {
    // Connect to server
    await client.connect(transport);
    console.log('Connected to server');

    // List available resources
    const response = await client.listResources()
    console.log('\nAvailable Resources:');
    response.resources.forEach((r) => console.log(`- ${r.name}: ${r.template || r.uri}`));

    // List available tools
    const toolsResponse = await client.listTools();
    console.log('\nAvailable Tools:');
    toolsResponse.tools.forEach((t) => console.log(`- ${t.name}`));

    // Test personal info resource
    console.log('\nFetching personal info...');
    const personalInfo = await client.readResource({
      uri: 'oura://personal_info'
    });
    console.log('Personal Info:', personalInfo);

    // Test daily sleep with date range
    const today = new Date().toISOString().split('T')[0];
    const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
    
    console.log('\nFetching daily sleep data...');
    const dailySleep = await client.readResource({
      uri: `oura://daily_sleep/${yesterday}/${today}`
    });
    console.log('Daily Sleep:', dailySleep);

    // Test search tool
    console.log('\nTesting search tool...');
    const searchResult = await client.callTool({
      name: 'search-oura-data',
      arguments: {
        query: 'sleep',
        start_date: yesterday,
        end_date: today
      }
    });
    console.log('Search Result:', searchResult);

  } catch (error) {
    console.error('Error:', error);
  } finally {
    await transport.close();
  }
}

main().catch(console.error); 