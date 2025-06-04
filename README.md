# Oura API MCP Server

This server implements the Model Context Protocol for the Oura Ring API, allowing AI models to access your Oura Ring data through a standardized interface. It uses the official MCP TypeScript SDK.

## Setup

1. Install dependencies:
```bash
npm install
```

2. Create a `.env` file in the root directory with your Oura API token:
```
OURA_API_TOKEN=your_personal_access_token_here
```

You can obtain your personal access token from the [Oura Cloud Dashboard](https://cloud.ouraring.com/personal-access-tokens).

3. Build the TypeScript code:
```bash
npm run build
```

## Running the Server

Start the server:
```bash
npm start
```

For development with hot reloading:
```bash
npm run dev
```

## Available Resources

The server provides access to the following Oura API endpoints as MCP resources:

### Static Resources (No Parameters)
- `oura://personal_info` - Personal information
- `oura://ring_configuration` - Ring configuration data

### Time-Based Resources
All of these resources accept `start_date` and `end_date` parameters in the URI:

- `oura://daily_sleep/{start_date}/{end_date}` - Daily sleep summaries
- `oura://sleep/{start_date}/{end_date}` - Detailed sleep documents
- `oura://daily_activity/{start_date}/{end_date}` - Daily activity data
- `oura://daily_readiness/{start_date}/{end_date}` - Daily readiness scores
- `oura://heart_rate/{start_date}/{end_date}` - Heart rate measurements
- `oura://sessions/{start_date}/{end_date}` - Session data
- `oura://tags/{start_date}/{end_date}` - Tags data
- `oura://workouts/{start_date}/{end_date}` - Workout data
- `oura://daily_stress/{start_date}/{end_date}` - Daily stress data
- `oura://rest_mode/{start_date}/{end_date}` - Rest mode periods

Dates should be provided in ISO 8601 format (YYYY-MM-DD).

## Available Tools

- `search-oura-data` - Search through Oura data with optional date range filtering
  - Parameters:
    - `query` (required): Search term to filter data
    - `start_date` (optional): Start date in YYYY-MM-DD format
    - `end_date` (optional): End date in YYYY-MM-DD format

## Testing

### Manual Testing
1. Start the server in one terminal:
```bash
npm start
```

2. In another terminal, run the test client:
```bash
npm run client
```

The test client will:
- Connect to the server
- List available resources and tools
- Test the personal info resource
- Test daily sleep data with a date range
- Test the search tool

## Security Note

Make sure to keep your Oura API token secure and never commit it to version control. 