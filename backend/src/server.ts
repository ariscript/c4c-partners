import express, { Express } from "express";

const app: Express = express();
const port = 4000;

const partners = [
    {
        logoUrl:
            "https://c4cneu-public.s3.us-east-2.amazonaws.com/Site/sfft-project-page.png",
        name: "Speak For The Trees",
        description:
            `Speak for the Trees Boston aims to improve the size and health of
            the urban forest in the greater Boston area, with a focus on
            under-served and under-canopied neighborhoods. They work with
            volunteers to inventory (collect data) trees, plant trees, and
            educate those about trees. C4C has built a tree stewardship
            application for SFTT that allows users to participate in conserving
            Boston's urban forest. Across Boston, hundreds of trees have been
            adopted and cared for.`.replaceAll(/$/gm, ""),
        active: true,
    },
];

app.use(express.json());
app.use((_req, res, next) => {
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

app.listen(port, () => {
    console.log(`Express server starting on port ${port}!`);
});
