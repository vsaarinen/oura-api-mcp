import axios from 'axios';
import { McpServer, ResourceTemplate } from '@modelcontextprotocol/sdk/server/mcp.js';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import express, { Request, Response } from 'express';
import { z } from 'zod';

const OURA_API_BASE_URL = 'https://api.ouraring.com/v2';

// Create Express app
const app = express();
app.use(express.json());

// Create an MCP server
const server = new McpServer({
  name: "Oura API",
  version: "1.0.0"
});

// Helper function to get Oura client with token
function getOuraClient(token: string | string[] /* should only be a string */) {
  return axios.create({
    baseURL: OURA_API_BASE_URL,
    headers: {
      Authorization: `Bearer ${token}`,
    },
  });
}

// TODO: It would be much better to get the token from the auth header (third param of the callback in resources)
// but it seems the MCP client SDK doesn't support setting an auth header, only OAuth2.

// Personal Info
server.resource(
  "personal-info",
  new ResourceTemplate("oura://personal_info/{token}", {
    list: undefined
  }),
  {
    description: "User's personal information including age, weight, height, and biological sex from their Oura profile"
  },
  async (_uri: URL, variables) => {
    try {
      const { token } = variables;
      if (!token) {
        throw new Error('Token parameter required');
      }

      const ouraClient = getOuraClient(token);
      const response = await ouraClient.get('/usercollection/personal_info');
      return {
        contents: [{
          uri: _uri.href,
          text: JSON.stringify(response.data)
        }]
      };
    } catch (error) {
      console.error('Error fetching personal info:', error);
      throw error;
    }
  }
);

// Daily Sleep
server.resource(
  "daily-sleep",
  new ResourceTemplate("oura://daily_sleep/{token}/{start_date}/{end_date}", {
    list: undefined
  }),
  {
    description: "Daily sleep metrics including total sleep time, sleep score, and sleep efficiency. Dates should be in YYYY-MM-DD format."
  },
  async (uri: URL, variables) => {
    try {
      const { token, start_date, end_date } = variables;
      if (!token) {
        throw new Error('Token parameter required');
      }

      const ouraClient = getOuraClient(token);
      const response = await ouraClient.get('/usercollection/daily_sleep', {
        params: { start_date, end_date }
      });
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(response.data)
        }]
      };
    } catch (error) {
      console.error('Error fetching daily sleep:', error);
      throw error;
    }
  }
);

// Sleep Documents
server.resource(
  "sleep",
  new ResourceTemplate("oura://sleep/{start_date}/{end_date}", {
    list: undefined
  }),
  {
    description: "Detailed sleep analysis including sleep stages, heart rate, HRV, and temperature variations for individual sleep sessions. Dates in YYYY-MM-DD format."
  },
  async (uri: URL, variables, extra) => {
    try {
      const { token, start_date, end_date } = variables;
      
      if (!token) {
        throw new Error('Authorization token required');
      }

      const ouraClient = getOuraClient(token);
      const response = await ouraClient.get('/usercollection/sleep', {
        params: { start_date, end_date }
      });
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(response.data)
        }]
      };
    } catch (error) {
      console.error('Error fetching sleep:', error);
      throw error;
    }
  }
);

// Daily Activity
server.resource(
  "daily-activity",
  new ResourceTemplate("oura://daily_activity/{start_date}/{end_date}", {
    list: undefined
  }),
  {
    description: "Daily activity metrics including steps, calories burned, activity score, and movement throughout the day. Dates in YYYY-MM-DD format."
  },
  async (uri: URL, variables, extra) => {
    try {
      const { token, start_date, end_date } = variables;
      
      if (!token) {
        throw new Error('Authorization token required');
      }

      const ouraClient = getOuraClient(token);
      const response = await ouraClient.get('/usercollection/daily_activity', {
        params: { start_date, end_date }
      });
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(response.data)
        }]
      };
    } catch (error) {
      console.error('Error fetching daily activity:', error);
      throw error;
    }
  }
);

// Daily Readiness
server.resource(
  "daily-readiness",
  new ResourceTemplate("oura://daily_readiness/{start_date}/{end_date}", {
    list: undefined
  }),
  {
    description: "Daily readiness score and contributing factors like sleep balance, activity balance, and body temperature. Dates in YYYY-MM-DD format."
  },
  async (uri: URL, variables, extra) => {
    try {
      const { token, start_date, end_date } = variables;
      
      if (!token) {
        throw new Error('Authorization token required');
      }

      const ouraClient = getOuraClient(token);
      const response = await ouraClient.get('/usercollection/daily_readiness', {
        params: { start_date, end_date }
      });
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(response.data)
        }]
      };
    } catch (error) {
      console.error('Error fetching daily readiness:', error);
      throw error;
    }
  }
);

// Heart Rate
server.resource(
  "heart-rate",
  new ResourceTemplate("oura://heart_rate/{start_date}/{end_date}", {
    list: undefined
  }),
  {
    description: "Continuous heart rate measurements throughout the day and night, providing insights into cardiovascular health. Dates in YYYY-MM-DD format."
  },
  async (uri: URL, variables, extra) => {
    try {
      const { token, start_date, end_date } = variables;
      
      if (!token) {
        throw new Error('Authorization token required');
      }

      const ouraClient = getOuraClient(token);
      const response = await ouraClient.get('/usercollection/heartrate', {
        params: { start_date, end_date }
      });
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(response.data)
        }]
      };
    } catch (error) {
      console.error('Error fetching heart rate:', error);
      throw error;
    }
  }
);

// Sessions
server.resource(
  "sessions",
  new ResourceTemplate("oura://sessions/{start_date}/{end_date}", {
    list: undefined
  }),
  {
    description: "Meditation, relaxation, and other focused sessions recorded by the user. Includes session type, duration, and biometric data. Dates in YYYY-MM-DD format."
  },
  async (uri: URL, variables, extra) => {
    try {
      const { token, start_date, end_date } = variables;
      
      if (!token) {
        throw new Error('Authorization token required');
      }

      const ouraClient = getOuraClient(token);
      const response = await ouraClient.get('/usercollection/session', {
        params: { start_date, end_date }
      });
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(response.data)
        }]
      };
    } catch (error) {
      console.error('Error fetching sessions:', error);
      throw error;
    }
  }
);

// Tags
server.resource(
  "tags",
  new ResourceTemplate("oura://tags/{start_date}/{end_date}", {
    list: undefined
  }),
  {
    description: "User-created tags and annotations for tracking lifestyle factors, symptoms, or other personal markers. Dates in YYYY-MM-DD format."
  },
  async (uri: URL, variables, extra) => {
    try {
      const { token, start_date, end_date } = variables;
      
      if (!token) {
        throw new Error('Authorization token required');
      }

      const ouraClient = getOuraClient(token);
      const response = await ouraClient.get('/usercollection/tag', {
        params: { start_date, end_date }
      });
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(response.data)
        }]
      };
    } catch (error) {
      console.error('Error fetching tags:', error);
      throw error;
    }
  }
);

// Workouts
server.resource(
  "workouts",
  new ResourceTemplate("oura://workouts/{start_date}/{end_date}", {
    list: undefined
  }),
  {
    description: "Workout sessions including type, duration, intensity, and associated biometric data. Dates in YYYY-MM-DD format."
  },
  async (uri: URL, variables, extra) => {
    try {
      const { token, start_date, end_date } = variables;
      
      if (!token) {
        throw new Error('Authorization token required');
      }

      const ouraClient = getOuraClient(token);
      const response = await ouraClient.get('/usercollection/workout', {
        params: { start_date, end_date }
      });
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(response.data)
        }]
      };
    } catch (error) {
      console.error('Error fetching workouts:', error);
      throw error;
    }
  }
);

// Daily Stress
server.resource(
  "daily-stress",
  new ResourceTemplate("oura://daily_stress/{start_date}/{end_date}", {
    list: undefined
  }),
  {
    description: "Daily stress levels and recovery metrics based on heart rate variability and other biometric data. Dates in YYYY-MM-DD format."
  },
  async (uri: URL, variables, extra) => {
    try {
      const { token, start_date, end_date } = variables;
      
      if (!token) {
        throw new Error('Authorization token required');
      }

      const ouraClient = getOuraClient(token);
      const response = await ouraClient.get('/usercollection/daily_stress', {
        params: { start_date, end_date }
      });
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(response.data)
        }]
      };
    } catch (error) {
      console.error('Error fetching daily stress:', error);
      throw error;
    }
  }
);

// Rest Mode Period
server.resource(
  "rest-mode",
  new ResourceTemplate("oura://rest_mode/{start_date}/{end_date}", {
    list: undefined
  }),
  {
    description: "Periods when the user has enabled Rest Mode, indicating times of illness, recovery, or reduced activity. Dates in YYYY-MM-DD format."
  },
  async (uri: URL, variables, extra) => {
    try {
      const { token, start_date, end_date } = variables;
      
      if (!token) {
        throw new Error('Authorization token required');
      }

      const ouraClient = getOuraClient(token);
      const response = await ouraClient.get('/usercollection/rest_mode_period', {
        params: { start_date, end_date }
      });
      return {
        contents: [{
          uri: uri.href,
          text: JSON.stringify(response.data)
        }]
      };
    } catch (error) {
      console.error('Error fetching rest mode periods:', error);
      throw error;
    }
  }
);

// Ring Configuration
server.resource(
  "ring-configuration",
  new ResourceTemplate("oura://ring_configuration/{token}", {
    list: undefined
  }),
  {
    description: "Technical details about the user's Oura ring including hardware version, firmware version, and sizing information"
  },
  async (_uri: URL, variables) => {
    try {
      const { token } = variables;
      if (!token) {
        throw new Error('Authorization token required');
      }

      const ouraClient = getOuraClient(token);
      const response = await ouraClient.get('/usercollection/ring_configuration');
      return {
        contents: [{
          uri: "oura://ring_configuration",
          text: JSON.stringify(response.data)
        }]
      };
    } catch (error) {
      console.error('Error fetching ring configuration:', error);
      throw error;
    }
  }
);

// Add a tool to search through Oura data
server.tool(
  "search-oura-data",
  {
    token: z.string(),
    query: z.string(),
    start_date: z.string().optional(),
    end_date: z.string().optional()
  },
  async (args, extra) => {
    const { query, start_date, end_date, token } = args;

    if (!token) {
      throw new Error('Authorization token required');
    }

    const ouraClient = getOuraClient(token);
    const endpoints = [
      { path: '/usercollection/personal_info', name: 'Personal Info' },
      { path: '/usercollection/daily_sleep', name: 'Daily Sleep' },
      { path: '/usercollection/sleep', name: 'Sleep' },
      { path: '/usercollection/daily_activity', name: 'Daily Activity' },
      { path: '/usercollection/daily_readiness', name: 'Daily Readiness' },
      { path: '/usercollection/heartrate', name: 'Heart Rate' },
      { path: '/usercollection/session', name: 'Sessions' },
      { path: '/usercollection/tag', name: 'Tags' },
      { path: '/usercollection/workout', name: 'Workouts' },
      { path: '/usercollection/daily_stress', name: 'Daily Stress' },
      { path: '/usercollection/rest_mode_period', name: 'Rest Mode' },
      { path: '/usercollection/ring_configuration', name: 'Ring Configuration' }
    ];

    const results = [];
    const queryLower = query.toLowerCase();

    for (const endpoint of endpoints) {
      if (endpoint.name.toLowerCase().includes(queryLower)) {
        try {
          const params: Record<string, string> = {};
          if (start_date) params.start_date = start_date;
          if (end_date) params.end_date = end_date;

          const response = await ouraClient.get(endpoint.path, { params });
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
        type: "text" as const,
        text: JSON.stringify(results)
      }]
    };
  }
);

// Handle POST requests
app.post('/mcp', async (req: Request, res: Response) => {
  try {
    const transport = new StreamableHTTPServerTransport({
      sessionIdGenerator: undefined, // Stateless mode
    });
    
    res.on('close', () => {
      console.log('Request closed');
      transport.close();
      server.close();
    });
    
    await server.connect(transport);
    await transport.handleRequest(req, res, req.body);
  } catch (error) {
    console.error('Error handling MCP request:', error);
    if (!res.headersSent) {
      res.status(500).json({
        jsonrpc: '2.0',
        error: {
          code: -32603,
          message: 'Internal server error',
        },
        id: null,
      });
    }
  }
});

// Handle GET requests (not needed in stateless mode)
app.get('/mcp', async (_req: Request, res: Response) => {
  console.log('Received GET MCP request');
  res.writeHead(405).end(JSON.stringify({
    jsonrpc: "2.0",
    error: {
      code: -32000,
      message: "Method not allowed."
    },
    id: null
  }));
});

// Handle DELETE requests (not needed in stateless mode)
app.delete('/mcp', async (_req: Request, res: Response) => {
  console.log('Received DELETE MCP request');
  res.writeHead(405).end(JSON.stringify({
    jsonrpc: "2.0",
    error: {
      code: -32000,
      message: "Method not allowed."
    },
    id: null
  }));
});

// Start the server
const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`MCP server listening on port ${port}`);
});
