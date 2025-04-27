import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";

async function getUnreadMessageCount() {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User id is required to check bookmark status.");
  }
  const { userId } = sessionUser;

  const count = await Message.countDocuments({
    recipient: userId,
    is_read: true,
  });

  return { count };
}

export default getUnreadMessageCount;
