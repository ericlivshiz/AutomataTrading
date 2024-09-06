'use client'

import React, { useState } from "react"
import Image from "next/image"
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
} from "@/components/ui/dialog"
import { Button } from "../ui/button"
import { Label } from "../ui/label"
import { Input } from "../ui/input"

const WaitListModal = () => {
    const [email, setEmail] = useState('');
    const [loading, setLoading] = useState(false);
    const [errorMessage, setErrorMessage] = useState<string | null>(null);
    const [submitted, isSubmitted] = useState(false);

    const validateEmail = (email: string): boolean => {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };

    const addEmail = async () => {
        setLoading(true);
        isSubmitted(true);
        setErrorMessage(null); // Clear any previous error messages

        if (!validateEmail(email)) {
            setErrorMessage('Please enter a valid email address.');
            setLoading(false);
            return;
        }

        try {
            const response = await fetch('/api/waitlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({ email }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.error || 'Failed to add email');
            }

            console.log('Email added successfully:', result.data);
            // Optionally reset the email input
            setEmail('');
        } catch (error) {
            setErrorMessage(`Error happened while adding email: ${error}`);
        }

        setLoading(false);
    };
    return (
        <DialogContent className="shad-dialog">
            <DialogHeader>
                <DialogTitle>Join the Wait List!</DialogTitle>
                <DialogDescription>Your email will not be sold to any third-parties.</DialogDescription>
            </DialogHeader>
            <Label htmlFor="email" className="mt-6 text-blue-100">
                Email Address
            </Label>
            <div className="flex items-center gap-3">
                <div className="flex flex-1 rounded-md bg-dark-400">
                    <Input
                        id="email"
                        placeholder="Enter Email Address"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="share-input"
                        type="email"
                    />
                </div>
                <Button type="submit" onClick={addEmail} className="bg-indigo-600 flex h-full gap-1 px-5" disabled={loading}>
                    {loading ? 'Saving...' : 'Save'}
                </Button>
            </div>
            {errorMessage && (
                <p className="text-red-500 mt-4">{errorMessage}</p>
            )}
            {!errorMessage && submitted && (
                <p className="text-green-500 mt-4">Email added successfully!</p>
            )}
        </DialogContent>
    );
}

export default WaitListModal;
