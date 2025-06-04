import { config } from 'dotenv';
import axios from 'axios';
import { McpServer } from '@modelcontextprotocol/sdk/server/mcp';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio';
import { z } from 'zod';

config();

const OURA_API_BASE_URL = 'https://api.ouraring.com/v2';
const OURA_API_TOKEN = process.env.OURA_API_TOKEN;

if (!OURA_API_TOKEN) {
  throw new Error('OURA_API_TOKEN environment variable is required');
}

const ouraClient = axios.create({
  baseURL: OURA_API_BASE_URL,
  headers: {
    Authorization: `Bearer ${OURA_API_TOKEN}`,
  },
});

// Create an MCP server
const server = new McpServer({
  name: "Oura API",
  version: "1.0.0"
});

// Add resources for each Oura API endpoint
server.resource(
  "personal-info",
  "oura://personal_info",
  async () => {
    try {
      const response = await ouraClient.get('/usercollection/personal_info');
      return {
        contents: [{
          uri: "oura://personal_info",
          text: JSON.stringify(response.data, null, 2)
        }]
      };
    } catch (error) {
      console.error('Error fetching personal info:', error);
      throw error;
    }
  }
);

server.resource(
  "daily-sleep",
  "oura://daily_sleep",
  async () => {
    try {
      const response = await ouraClient.get('/usercollection/daily_sleep');
      return {
        contents: [{
          uri: "oura://daily_sleep",
          text: JSON.stringify(response.data, null, 2)
        }]
      };
    } catch (error) {
      console.error('Error fetching daily sleep:', error);
      throw error;
    }
  }
);

server.resource(
  "daily-activity",
  "oura://daily_activity",
  async () => {
    try {
      const response = await ouraClient.get('/usercollection/daily_activity');
      return {
        contents: [{
          uri: "oura://daily_activity",
          text: JSON.stringify(response.data, null, 2)
        }]
      };
    } catch (error) {
      console.error('Error fetching daily activity:', error);
      throw error;
    }
  }
);

server.resource(
  "daily-readiness",
  "oura://daily_readiness",
  async () => {
    try {
      const response = await ouraClient.get('/usercollection/daily_readiness');
      return {
        contents: [{
          uri: "oura://daily_readiness",
          text: JSON.stringify(response.data, null, 2)
        }]
      };
    } catch (error) {
      console.error('Error fetching daily readiness:', error);
      throw error;
    }
  }
);

server.resource(
  "heart-rate",
  "oura://heart_rate",
  async () => {
    try {
      const response = await ouraClient.get('/usercollection/heartrate');
      return {
        contents: [{
          uri: "oura://heart_rate",
          text: JSON.stringify(response.data, null, 2)
        }]
      };
    } catch (error) {
      console.error('Error fetching heart rate:', error);
      throw error;
    }
  }
);

// Add a tool to search through Oura data
server.tool(
  "search-oura-data",
  { query: z.string() },
  async ({ query }: { query: string }) => {
    const endpoints = [
      { path: '/usercollection/personal_info', name: 'Personal Info' },
      { path: '/usercollection/daily_sleep', name: 'Daily Sleep' },
      { path: '/usercollection/daily_activity', name: 'Daily Activity' },
      { path: '/usercollection/daily_readiness', name: 'Daily Readiness' },
      { path: '/usercollection/heartrate', name: 'Heart Rate' },
    ];

    const results = [];
    const queryLower = query.toLowerCase();

    for (const endpoint of endpoints) {
      if (endpoint.name.toLowerCase().includes(queryLower)) {
        try {
          const response = await ouraClient.get(endpoint.path);
          results.push({
            name: endpoint.name,
            data: response.data
          });
        } catch (error: unknown) {
          console.error(`Error fetching ${endpoint.name}:`, error);
        }
      }
    }

    return {
      content: [{
        type: "text",
        text: JSON.stringify(results, null, 2)
      }]
    };
  }
);

// Start the server with stdio transport
const transport = new StdioServerTransport();
server.connect(transport).catch((error: unknown) => {
  console.error('Failed to start server:', error);
  process.exit(1);
}); 