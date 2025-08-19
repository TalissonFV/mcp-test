var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";
import fs from "node:fs/promises";
const server = new McpServer({
    name: "test",
    version: "1.0.0",
    capabilities: {
        resources: {},
        tools: {},
        prompts: {},
    },
});
server.resource("get-users", "users://all", {
    description: "Get all users",
    title: "Get Users",
    mimeType: "application/json",
}, (uri) => __awaiter(void 0, void 0, void 0, function* () {
    const users = yield import("./data/users.json", { with: { type: "json" } }).then((m) => m.default);
    return {
        contents: [{ uri: uri.href, text: JSON.stringify(users), mimeType: "application/json" }],
    };
}));
server.tool("create-user", "Create a new user", {
    name: z.string(),
    email: z.string(),
    password: z.string(),
    address: z.string(),
    phone: z.string(),
}, {
    title: "Create User",
    readOnlyHint: false,
    destructiveHint: false,
    idempotentHint: false,
    openWorldHint: true,
    description: "Create a new user",
}, (params) => __awaiter(void 0, void 0, void 0, function* () {
    try {
        yield createUser(params);
        return {
            content: [{ type: "text", text: "User created" }],
        };
    }
    catch (_a) {
        return {
            content: [{ type: "text", text: "Failed to save user" }],
        };
    }
}));
function main() {
    return __awaiter(this, void 0, void 0, function* () {
        const transport = new StdioServerTransport();
        yield server.connect(transport);
    });
}
function createUser(user) {
    return __awaiter(this, void 0, void 0, function* () {
        const users = yield import("./data/users.json", { with: { type: "json" } }).then((m) => m.default);
        const id = users.length + 1;
        users.push(Object.assign({ id }, user));
        yield fs.writeFile("./src/data/users.json", JSON.stringify(users, null, 2));
        return id;
    });
}
main();
