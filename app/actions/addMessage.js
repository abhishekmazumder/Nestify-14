"use server";

import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

async function addMessage(previousState, formData) {
  await connectDB();

  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User ID is required");
  }

  const { userId } = sessionUser;
  const recipientId = formData.get("recipient");

  if (userId === recipientId) {
    return { error: "You cannot send a message to yourself" };
  }

  const messageData = {
    sender: userId,
    recipient: recipientId,
    property: formData.get("property"),
    name: formData.get("name"),
    email: formData.get("email"),
    phone: formData.get("phone"),
    body: formData.get("body"),
  };

  const newMessage = await Message.create(messageData);

  if (!newMessage) {
    throw new Error("Failed to create message");
  }
  return { submitted: true };
}

export default addMessage;
