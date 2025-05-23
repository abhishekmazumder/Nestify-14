"use server";
import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteMessage(messageId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserId required!");
  }
  const { userId } = sessionUser;

  const message = await Message.findById(messageId);
  if (!message) throw new Error("Message not found!");

  if (message.recipient.toString() !== userId) {
    throw new Error("You are not authorized to delete this message!");
  }
  await message.deleteOne();

  revalidatePath("/messages", "page");
}

export default deleteMessage;
