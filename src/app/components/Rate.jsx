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
    const [loading, setLoading] = useState(true);
    const fetchRate = async () => {
        try {
            setLoading(true);
            const response = await axios.get(`/api/stock/exchange/?key=${process.env.NEXT_PUBLIC_API_KEY}`);
            console.log(response.data)
            setRate(response.data)
            setLoading(false)
        } catch (error) {
            console.error(error);
        }
    }
    useEffect(() => {
        fetchRate();
        const intervalId = setInterval(() => {
            fetchRate();
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
                    </div>
                ) : (
                    <>
                        <Typography variant="h5" className="mb-2">
                            Exchange Rate
                        </Typography>
                        <Typography variant="h3" className="font-bold" color="deep-purple">
                            USD to THB
                        </Typography>
                        <Typography variant="h2" color="blue-gray">
                            {rate.price}
                        </Typography>
                        </>
                )}
            </CardBody>
        </Card>
    );
}