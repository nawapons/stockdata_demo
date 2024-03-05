import { NextResponse } from "next/server";
import { Server } from "socket.io"
import { createServer } from "http"
import axios from "axios";
import { load } from "cheerio";
export async function GET(req, res) {
  try {
  
    const httpServer = createServer()
    const io = new Server(httpServer, {
      cors: { origin: "*" }
    }
    );

    const stockname = req.nextUrl.searchParams.get("stockname").toUpperCase();
    const url = `https://finance.yahoo.com/quote/${stockname}`;
    if (!stockname) {
      return NextResponse.json({ status: "error", message: "Please provide API key and stock name" });
    }
    io.emit("update-stock", async (stockname) => {
      console.log(stockname)
      const { data } = await axios.get(url);
      const $ = load(data);

      const fullname = $('[class*="D(ib)"][class*="Fz(18px)"]').text().trim();
      const currentprice = $(`[data-symbol=${stockname}][data-field="regularMarketPrice"][value]`);
      const marketchange = $(`[data-symbol=${stockname}][data-field="regularMarketChange"][value]`);
      const changePercent = $(`[data-symbol=${stockname}][data-field="regularMarketChangePercent"][value]`);
      if (currentprice) {
        const price = currentprice.attr("value");
        const change = marketchange.attr("value")
        const percent = changePercent.attr("value")
        await io.emit("receive-stock", {
          stockname, fullname, price, change, percent
        })
        return NextResponse.json({ stockname, fullname, price, change, percent })
      } else {
        return NextResponse.json({ status: "error", message: "Price element not found" })
      }
    })
    return NextResponse.json({ status: "success" })
  } catch (error) {
    return NextResponse.json({ status: "error", message: error.message })
  }
}