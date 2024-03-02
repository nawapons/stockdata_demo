import { load } from "cheerio";
import { useParams } from "next/navigation";
import { NextResponse } from "next/server";
import axios from "axios";
export async function GET(req, res) {
   try {
      const stockname = req.nextUrl.searchParams.get("stockname").toUpperCase();
      const key = req.nextUrl.searchParams.get("key")
      if (!stockname || !key) {
         return NextResponse.json({ status: "error", message: "Please provide API key and stock name" });
      }
      if(key != process.env.TOKEN_SECRET){
         return NextResponse.json({status: "error", message: "API KEY is not valid"})
      }

      const url = `https://finance.yahoo.com/quote/${stockname}`;
      try {
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
            return NextResponse.json({ stockname, fullname, price, change, percent });
         } else {
            return NextResponse.json({ status: "error", message: "Price element not found" })
         }
      } catch (error) {
         return NextResponse.json({ status: "error", message: "Error fetching stock data", error: error.message });
      }
   } catch (error) {
      return NextResponse.json({ message: error.message })
   }
}