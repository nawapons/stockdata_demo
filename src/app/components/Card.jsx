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
    const [loading, setLoading] = useState(true);
    const stockname = "voo"
    const fetchPrice = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/stock/getstock/?stockname=${stockname}&key=${process.env.NEXT_PUBLIC_API_KEY}`);
            setStocks(response.data)
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchPrice();
        // Set up interval to fetch every 10 seconds
        const intervalId = setInterval(() => {
            fetchPrice();
        }, 10000);

        // Cleanup interval on component unmount
        return () => clearInterval(intervalId);
    }, []);
    return (
        <Card className="mx-auto mt-6 w-96">
            <CardBody>
                {loading ? (
                    <div className="max-w-full animate-pulse">
                        <Typography
                            as="div"
                            variant="h1"
                            className="mb-4 h-3 w-56 rounded-full bg-gray-300"
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                        >
                            &nbsp;
                        </Typography>
                        <Typography
                            as="div"
                            variant="paragraph"
                            className="mb-2 h-2 w-72 rounded-full bg-gray-300"
                        >
                            &nbsp;
                        </Typography>
                    </div>
                ) : (
                    <>
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
                    </>
                )}
            </CardBody>
        </Card>
    );
}