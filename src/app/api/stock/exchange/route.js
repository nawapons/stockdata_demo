import { load } from "cheerio";
import { NextResponse } from "next/server";
import axios from "axios";
export async function GET(req, res) {
   try {
      const key = req.nextUrl.searchParams.get("key")
      if (!key) {
         return NextResponse.json({ status: "error", message: "Please provide API key and stock name" });
      }
      if (key != process.env.TOKEN_SECRET) {
         return NextResponse.json({ status: "error", message: "API KEY is not valid" })
      }

      const url = "https://finance.yahoo.com/quote/THB=X"
      try {
         const { data } = await axios.get(url);
         const $ = load(data);

         const currentprice = $(`[data-symbol=THB=X][data-field="regularMarketPrice"][value]`);
         if (currentprice.length > 0) {
            const rawPrice = parseFloat(currentprice.attr("value"));
            const price = isNaN(rawPrice) ? null : rawPrice.toFixed(4);
            return NextResponse.json({ price });
         } else {
            return NextResponse.json({ status: "error", message: "Exchange Price element not found" })
         }
      } catch (error) {
         return NextResponse.json({ status: "error", message: "Error fetching exchange data", error: error.message });
      }
   } catch (error) {
      return NextResponse.json({ message: error.message })
   }
}