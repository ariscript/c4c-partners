import express, { Express } from "express";
import fs from "node:fs/promises";
import { writeFileSync } from "node:fs";
import type { PartnerDetails } from "./types";

const DATA_FILE = "data/partners.json";

const app: Express = express();
const port = 4000;

const partners: PartnerDetails[] = JSON.parse(
    await fs.readFile(DATA_FILE, "utf-8")
);

if (partners.length === 0) {
    // so we have something even if everything gets deleted.
    // this will also get re-added to the file at the end
    // (if there's no other data or it doesn't get deleted)
    // but it's mostly here for testing purposes.
    partners.push({
        name: "Speak For The Trees",
        description:
            "Speak for the Trees Boston aims to improve the size and health of the urban forest in the greater Boston area, with a focus on under-served and under-canopied neighborhoods. They work with volunteers to inventory (collect data) trees, plant trees, and educate those about trees. C4C has built a tree stewardship application for SFTT that allows users to participate in conserving Boston's urban forest. Across Boston, hundreds of trees have been adopted and cared for.",
        logoUrl:
            "https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/sfft-project-page.png",
        active: true,
    });
}

process.on("exit", async () => {
    console.log(JSON.stringify(partners, null, 4));
    writeFileSync(DATA_FILE, JSON.stringify(partners, null, 4));
});

app.use(express.json());
app.use((_req, res, next) => {
    res.removeHeader("X-Powered-By");
    res.header("Access-Control-Allow-Origin", "http://localhost:3000");
    res.header(
        "Access-Control-Allow-Headers",
        "Origin, X-Requested-With, Content-Type, Accept"
    );
    res.header(
        "Access-Control-Allow-Methods",
        "GET, POST, PUT, DELETE, OPTIONS"
    );
    next();
});

app.get("/", (_, res) => {
    res.status(200).send(partners);
});

app.post("/", (req, res) => {
    if (partners.some((x: { name: string }) => x.name === req.body.name)) {
        console.log(`attempting to create '${req.body.name}', but it exists`);
        res.status(409).send({
            error: `partner ${req.body.name} already exists`,
        });
        return;
    }

    console.log(`creating partner '${req.body.name}'`);
    partners.unshift(req.body);
    res.status(200).send(partners);
});

app.put("/", (req, res) => {
    const idx = partners.findIndex(
        (x: { name: string }) => x.name === req.body.oldName
    );

    if (idx < 0) {
        console.log(`trying to edit nonexistent partner '${req.body.oldName}'`);
        res.status(404).send({
            error: `partner ${req.body.oldName} not found`,
        });
        return;
    }
    console.log(
        `editing partner '${req.body.oldName}' -> '${req.body.updated.name}'`
    );
    partners[idx] = req.body.updated;
    res.status(200).send(partners);
});

app.delete("/", (req, res) => {
    const idx = partners.findIndex(
        (x: { name: string }) => x.name === req.body.name
    );

    if (idx < 0) {
        console.log(`trying to delete nonexistent partner '${req.body.name}'`);
        res.status(404).send({
            error: "partner not found",
        });
        return;
    }

    console.log(`deleting partner '${req.body.name}'`);
    partners.splice(idx, 1);
    res.status(200).send(partners);
});

app.listen(port, () => {
    console.log(`Express server starting on port ${port}!`);
});
