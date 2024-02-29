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
export function CardRate() {
    const [rate, setRate] = useState({})
    const optionsRate = {
        method: 'GET',
        url: 'https://real-time-finance-data.p.rapidapi.com/currency-exchange-rate',
        params: {
            from_symbol: 'USD',
            to_symbol: 'THB',
            language: 'en'
        },
        headers: {
            'X-RapidAPI-Key': process.env.NEXT_PUBLIC_API_KEY,
            'X-RapidAPI-Host': process.env.NEXT_PUBLIC_HOST_API
        }
    };
    const fetchRate = async () => {
        try {
            const response = await axios.request(optionsRate);
            setRate(response.data.data)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchRate();
    }, []);
    return (
        <Card className="mx-auto mt-6 w-96">
            <CardBody>
                <Typography variant="h5" className="mb-2">
                    Exchange Rate
                </Typography>
                <Typography variant="h3" className="font-bold" color="deep-purple">
                {rate.from_symbol} to {rate.to_symbol}
                </Typography>
                <Typography variant="h2" color="blue-gray">
                    {rate.exchange_rate}
                </Typography>
            </CardBody>
        </Card>
    );
}