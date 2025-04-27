import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function markMessageAsRead(messageId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User id is required to check bookmark status.");
  }
  const { userId } = sessionUser;

  const message = await Message.findById(messageId);
  if (!message) {
    throw new Error("Message not found.");
  }

  // verify if the message belongs to the user
  if (message.recipient.toString() !== userId) {
    throw new Error("You are not authorized to mark this message as read.");
  }

  message.isRead = !message.isRead;
  await message.save();
  revalidatePath("/messages", "page");

  return message.isRead;
}

export default markMessageAsRead;
