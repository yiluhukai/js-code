import express from "express";

const app = express();

// 开启静态服务
app.use(express.static("dist"));

const template = `
    <html>
        <head>
        <title>React Fiber</title>
        </head>
        <body>
            <div id="root"></div>
            <script src="bundle.js"></script>
        </body>
    </html>
`;

app.get("*", function (req, res) {
    res.send(template);
});

app.listen(3000, function (err) {
    if (!err) {
        console.log(err);
    }
    console.log("server is starting!");
});
