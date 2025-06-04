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

### Personal Information
- URI Template: `oura://personal_info/{token}`
- Description: User's personal information including age, weight, height, and biological sex from their Oura profile

### Sleep Data
- URI Template: `oura://daily_sleep/{token}/{start_date}/{end_date}`
- Description: Daily sleep metrics including total sleep time, sleep score, and sleep efficiency

### Detailed Sleep Analysis
- URI Template: `oura://sleep/{start_date}/{end_date}`
- Description: Detailed sleep analysis including sleep stages, heart rate, HRV, and temperature variations for individual sleep sessions

### Activity Data
- URI Template: `oura://daily_activity/{start_date}/{end_date}`
- Description: Daily activity metrics including steps, calories burned, activity score, and movement throughout the day

### Readiness Data
- URI Template: `oura://daily_readiness/{start_date}/{end_date}`
- Description: Daily readiness score and contributing factors like sleep balance, activity balance, and body temperature

### Heart Rate Data
- URI Template: `oura://heart_rate/{start_date}/{end_date}`
- Description: Continuous heart rate measurements throughout the day and night

### Session Data
- URI Template: `oura://sessions/{start_date}/{end_date}`
- Description: Meditation, relaxation, and other focused sessions recorded by the user

### Tags
- URI Template: `oura://tags/{start_date}/{end_date}`
- Description: User-created tags and annotations for tracking lifestyle factors, symptoms, or other personal markers

### Workout Data
- URI Template: `oura://workouts/{start_date}/{end_date}`
- Description: Workout sessions including type, duration, intensity, and associated biometric data

### Stress Data
- URI Template: `oura://daily_stress/{start_date}/{end_date}`
- Description: Daily stress levels and recovery metrics based on heart rate variability and other biometric data

### Rest Mode Periods
- URI Template: `oura://rest_mode/{start_date}/{end_date}`
- Description: Periods when the user has enabled Rest Mode, indicating times of illness, recovery, or reduced activity

### Ring Configuration
- URI Template: `oura://ring_configuration/{token}`
- Description: Technical details about the user's Oura ring including hardware version, firmware version, and sizing information

## Tools

### Search Oura Data
A tool to search through all available Oura data endpoints based on a query string.

Parameters:
- `token`: Oura API token
- `query`: Search query string
- `start_date`: (Optional) Start date in YYYY-MM-DD format
- `end_date`: (Optional) End date in YYYY-MM-DD format 