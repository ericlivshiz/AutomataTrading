'use client';

import React, { useState } from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { createWorkflow } from '@/lib/actions/room.actions';
import { useRouter } from 'next/navigation';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogFooter,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { ComboboxDemo } from './ComboBoxType';

const AddWorkflowBtn = ({ userId, email }: AddWorkflowBtnProps) => {
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);

    const youre = "you're";

    const router = useRouter();

    const addWorkflowHandler = async () => {
        setLoading(true);

        try {
            const room = await createWorkflow({ userId, email });

            if (room) {
                router.push(`/workflows/${room.id}`);
            }
        } catch (error) {
            console.log(error);
        }

        setLoading(false);
    }

    return (
        <Dialog>
            <DialogTrigger asChild>
                {/* <Button type="submit" onClick={addWorkflowHandler} className="gradient-blue flex gap-1 shadow-md">
                    <Image
                        src="/assets/icons/add.svg" alt="add" width={24} height={24}
                    />
                    <p className="hidden sm:block"> Start a New Workflow</p>
                </Button> */}

                <Button className="gradient-blue flex gap-1 shadow-md">
                    <Image
                        src="/assets/icons/add.svg" alt="add" width={24} height={24}
                    />
                    <p className="hidden sm:block"> Start a New Workflow</p>
                </Button>
            </DialogTrigger>
            <DialogContent className="shad-dialog">
                <DialogHeader>
                    <Image
                        src="/assets/icons/fund-svgrepo-com.svg"
                        alt="delete"
                        width={48}
                        height={48}
                        className="mb-4"
                    />
                    <DialogTitle>New Workflow</DialogTitle>
                    <DialogDescription>
                        Choose which type of market you would like to trade on. Click save when {youre} done.
                    </DialogDescription>
                </DialogHeader>
                <ComboboxDemo />
                <DialogFooter>
                    <Button type="submit" className="gradient-blue flex gap-1 shadow-md" onClick={addWorkflowHandler} disabled= {loading}>
                    {loading? 'Saving...' : 'Save changes'}</Button>
                </DialogFooter>
            </DialogContent>
        </Dialog>

    )
}

export default AddWorkflowBtn