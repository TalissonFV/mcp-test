# MCP Test Project

This is a simple user management service built with Node.js, TypeScript, and the Model Context Protocol (MCP).

## Prerequisites

- Node.js
- npm

## Getting Started

1.  **Clone the repository:**
    ```bash
    git clone <repository-url>
    ```
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Build the project:**
    ```bash
    npm run server:build
    ```
4.  **Run the server in development mode:**
    ```bash
    npm run server:dev
    ```

## Available Scripts

- `npm test`: Runs the test suite (currently empty).
- `npm run server:build`: Compiles the TypeScript code to JavaScript.
- `npm run server:build:watch`: Compiles the TypeScript code in watch mode.
- `npm run server:dev`: Runs the server in development mode using `tsx`.
- `npm run server:dev:watch`: Runs the server in development mode with watch mode enabled.
- `npm run server:inspect`: Inspects the server using the MCP inspector.

## Project Structure

```
.
├── build/              # Compiled JavaScript files
├── node_modules/       # Project dependencies
├── src/                # TypeScript source code
│   ├── data/
│   │   └── users.json  # User data
│   └── server.ts       # MCP server implementation
├── package.json        # Project metadata and dependencies
├── tsconfig.json       # TypeScript configuration
└── ...
```

## API

The server exposes the following functionalities through the Model Context Protocol:

### Resources

- **`get-users` (`users://all`)**: Retrieves a list of all users.

### Tools

- **`create-user`**: Creates a new user with the following parameters:
  - `name` (string)
  - `email` (string)
  - `password` (string)
  - `address` (string)
  - `phone` (string)
