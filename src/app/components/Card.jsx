"use client"
import React, { useState, useEffect } from "react";
import io from "socket.io-client";
import {
    Card,
    CardBody,
    Typography,
} from "@material-tailwind/react";

export function CardPrice() {
    const [stocks, setStocks] = useState({});
    const stockname = "VOO";
    const socket = io("http://localhost:5000"); // Replace with your server URL

    const fetchPrice = () => {
        // Emit the "fetch-price" event to request stock data
        socket.emit("fetch-price", { stockname });

    };

    useEffect(() => {
        // Listen for fetch-price event from the server
        socket.on("fetch-price", (data) => {
            setStocks(data);
        });

        // Trigger the initial fetch
        fetchPrice();

        // Set up interval to fetch every 10 seconds
        const intervalId = setInterval(() => {
            fetchPrice();
        }, 3000);

        // Cleanup interval and disconnect on component unmount
        return () => {
            clearInterval(intervalId);
        };
    }, [socket]);
    
    return (
        <Card className="mx-auto mt-6 w-96">
            <CardBody>
                <Typography variant="h5" className="mb-2">
                    {stocks.fullname}
                </Typography>
                <Typography variant="h3" className="font-bold" color="deep-purple">
                    {stocks.stockname}
                </Typography>
                <Typography variant="h2" color="blue-gray">
                    {stocks.price}
                </Typography>
                <span className={stocks.percent > 0 ? "text-green-500" : "text-red-500"}>
                    ▲ {(stocks.percent * 100).toFixed(2)} %
                </span>
            </CardBody>
        </Card>
    );
}
