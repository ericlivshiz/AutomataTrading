'use client';

import React from 'react'
import { Button } from './ui/button'
import Image from 'next/image'
import { createWorkflow } from '@/lib/actions/room.actions';
import { useRouter } from 'next/navigation';

const AddWorkflowBtn = ({userId, email}: AddWorkflowBtnProps) => {
    const router = useRouter();

    const addWorkflowHandler = async () => {
        try{
          const room = await createWorkflow({ userId, email });

          if (room) {
            router.push(`/workflows/${room.id}`);
          }
        } catch(error){
            console.log(error);
        }
    }

    return (
        <Button type="submit" onClick={addWorkflowHandler} className="gradient-blue flex gap-1 shadow-md">
            <Image 
               src="/assets/icons/add.svg" alt="add" width={24} height={24}
            />
            <p className="hidden sm:block"> Start a New Workflow</p>
        </Button>
    )
}

export default AddWorkflowBtn