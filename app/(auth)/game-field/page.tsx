"use client";
import React, { useEffect, useState } from "react";
import io from "socket.io-client";

const GameField = () => {
    const [message, setMessage] = useState("11");
    useEffect(() => {
        // Establish Socket.IO connection
        const socket = io("http://localhost:3001"); // Replace with your server URL

        // Event handler for 'connect' event
        socket.on("connect", () => {
            console.log("Connected to server");
            setMessage("Socket connected");
        });

        // Event handler for 'message' event
        socket.on("message", (data): void => {
            console.log("Received message:", data);
            setMessage("Message received=> " + JSON.stringify(data));
        });

        // Clean up on unmount
        return () => {
            socket.disconnect();
        };
    }, []);

    return (
        <div>
            <h1>{message}</h1>
        </div>
    );
};

export default GameField;
