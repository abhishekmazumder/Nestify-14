"use server";

import connectDB from "@/config/db";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

async function checkBookmarkStatus(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User id is required to check bookmark status.");
  }
  const { userId } = sessionUser;
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found.");
  }
  const isBookmarked = user.bookmarks.includes(propertyId);
  return { isBookmarked };
}

export default checkBookmarkStatus;
