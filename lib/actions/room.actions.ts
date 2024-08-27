'use server';

import { nanoid } from "nanoid"
import { liveblocks } from "../liveblocks";
import { revalidatePath } from "next/cache";
import { getAccessType, parseStringify } from "../utils";
import { parse } from "path";
import { redirect } from "next/navigation";

export const createWorkflow = async ({ userId, email }: CreateWorkflowParams) => {
      const roomId = nanoid();

      try {
        const metadata = {
            creatorId: userId,
            email,
            title: 'Untitled'
        }

        const usersAccesses: RoomAccesses = {
            [email]: ['room:write']
        }

        const room = await liveblocks.createRoom(roomId, {
          metadata,
          usersAccesses,
          defaultAccesses: []
        });
          
        revalidatePath('/');

        return parseStringify(room);
      } catch(error) {
        console.log(`Error happened while creating a room: ${error}`);
      }
}

export const getWorkflow = async ({roomId, userId}: {roomId: string; userId: string}) => {
  try{
    const room = await liveblocks.getRoom(roomId);

  const hasAccess = Object.keys(room.usersAccesses).includes(userId);

  if (!hasAccess){
    throw new Error('You do not have access to this workflow');
  }

  return parseStringify(room);
  } catch(error) {
    console.log(`Error happened while getting a room ${error}`);
  }
}

export const updateWorkflow = async (roomId: string, title: string) => {
  try{
    const updatedRoom = await liveblocks.updateRoom(roomId, {
      metadata: {
        title
      }
    })

    revalidatePath(`/workflows/${roomId}`);

    return parseStringify(updatedRoom);

  }catch(error){
    console.log(`Error happened while updating a room: ${error}`);
  }
}

export const getWorkflows = async (email: string) => {
  try{
    const rooms = await liveblocks.getRooms({ userId: email});

  // const hasAccess = Object.keys(room.usersAccesses).includes(userId);

  // if (!hasAccess){
  //   throw new Error('You do not have access to this workflow');
  // }

  return parseStringify(rooms);
  } catch(error) {
    console.log(`Error happened while getting rooms: ${error}`);
  }
}

export const updateWorkflowAccess = async ({roomId, email, userType, updatedBy}: ShareDocumentParams) => {
  try {
    const usersAccesses: RoomAccesses = {
      [email]: getAccessType(userType) as AccessType,
    }

    const room = await liveblocks.updateRoom(roomId, {
      usersAccesses
    })

    if (room) {
      const notificationId = nanoid();

      await liveblocks.triggerInboxNotification({
        userId: email,
        kind: '$documentAccess',
        subjectId: notificationId,
        activityData: {
          userType,
          title: `You have been granted ${userType} access to the document by ${updatedBy.name}`,
          updatedBy: updatedBy.name,
          avatar: updatedBy.avatar,
          email: updatedBy.email
        },
        roomId
      })
    }

    revalidatePath(`/workflows/${roomId}`);
    return parseStringify(room);
  } catch(error)
  {
    console.log(`Error happened while updating a room access: ${error}`);
  }
}

export const removeCollaborator = async ({roomId, email}: {roomId: string, email: string}) => {
  try{
    const room = await liveblocks.getRoom(roomId);

    if (room.metadata.email === email) {
      throw new Error('You cannot remove yourself from the document');
    }

    const updatedRoom = await liveblocks.updateRoom(roomId, {
      usersAccesses: {
        [email]: null
      }
    })

    revalidatePath(`/workflows/${roomId}`);
    return parseStringify(updatedRoom);

  } catch(error) {
    console.log(`Error happened while removing a collaborator: ${error}`);
  }
}

export const deleteWorkflow = async (roomId: string) => {
  try{
    await liveblocks.deleteRoom(roomId);

    revalidatePath('/');
    redirect('/');
  } catch(error) {
    console.log(`Error happened while deleting a room: ${error}`);
  }
}