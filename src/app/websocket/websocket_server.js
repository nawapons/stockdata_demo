// websocket_server.js
const { createServer } = require("http");
const { Server } = require("socket.io");
const cheerio = require("cheerio");
const httpServer = createServer();
const axios = require("axios");
const io = new Server(httpServer, {
    cors: {
        origin: "*",
        methods: ["GET", "POST"],
    },
});

io.on("connection", async (socket) => {
    socket.on("fetch-price", async (data) => {
        const stockname = data.stockname;
        const url = `https://finance.yahoo.com/quote/${stockname}`;
        try {
            const { data } = await axios.get(url);
            const $ = cheerio.load(data);

            const fullname = $('[class*="D(ib)"][class*="Fz(18px)"]').text().trim();
            const currentprice = $(`[data-symbol=${stockname}][data-field="regularMarketPrice"][value]`);
            const marketchange = $(`[data-symbol=${stockname}][data-field="regularMarketChange"][value]`);
            const changePercent = $(`[data-symbol=${stockname}][data-field="regularMarketChangePercent"][value]`);
            if (currentprice) {
                const price = currentprice.attr("value");
                const change = marketchange.attr("value")
                const percent = changePercent.attr("value")
                socket.emit("fetch-price", { stockname, fullname, price, change, percent });

            } else {
                res.status(404).send({ message: "Price element not found" });
            }
        } catch (error) {
            console.error(error.message);
            
            // Handle the error and emit an error event or log it as needed
        }
    });
});

httpServer.listen(5000, () => {
    console.log("WebSocket listening on port 5000");
});
