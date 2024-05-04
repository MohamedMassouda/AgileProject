import express from "express";
import session, { MemoryStore } from "express-session";
import Keycloak from "keycloak-connect";
import KcAdminClient from "@keycloak/keycloak-admin-client";

const app = express();
const PORT = process.env.PORT || 3000;

// Configure express-session middleware
const memoryStore = new MemoryStore();
app.use(
  session({
    secret: "mySecret",
    resave: false,
    saveUninitialized: true,
    store: memoryStore,
  }),
);

// Initialize Keycloak
const keycloak = new Keycloak({ store: memoryStore });
const kcAdminClient = new KcAdminClient();

// Protect routes using Keycloak middleware
app.use(keycloak.middleware());
app.use(express.json());

// Secure route
app.get("/secured", keycloak.protect("realm:user"), (req, res) => {
  res.send("This is a secured route.");
});

// Access user information
app.get("/user", keycloak.protect(), (req, res) => {
  res.json(req.kauth.grant.access_token.content);
});

app.post("/login", async (req, res) => {
  await kcAdminClient.auth(req.body);
});

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
