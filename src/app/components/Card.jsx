"use client"
import {
    Card,
    CardBody,
    CardFooter,
    Typography,
    Button,
    Chip
} from "@material-tailwind/react";
import { useState, useEffect } from "react";
import axios from "axios"
export function CardPrice() {
    const [stocks, setStocks] = useState({})
    const [rate, setRate] = useState({})
    const optionsPrice = {
        method: 'GET',
        url: 'https://real-time-finance-data.p.rapidapi.com/stock-quote',
        params: {
            symbol: 'VOO',
            language: 'en'
        },
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_API_KEY,
            'X-RapidAPI-Host': process.env.NEXT_PUBLIC_HOST_API
        }
    };
    const fetchPrice = async () => {
        try {
            const response = await axios.request(optionsPrice);
            const splitname = response.data.data.symbol.split(':');
            setStocks({
                ...response.data.data,
                splitname: splitname[0]
            });
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchPrice();
    }, []);
    return (
        <Card className="mx-auto mt-6 w-96">
            <CardBody>
                <Typography variant="h5" className="mb-2">
                    {stocks.name}
                </Typography>
                <Typography variant="h3" className="font-bold" color="deep-purple">
                    {stocks.splitname}
                </Typography>
                <Typography variant="h2" color="blue-gray">
                    {stocks.price}
                </Typography>
                <span className={stocks.change_percent > 0 ? "text-green-500" : "text-red-500"}>▲ {stocks.change_percent}</span>
            </CardBody>
        </Card>
    );
}