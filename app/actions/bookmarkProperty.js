"use server";

import connectDB from "@/config/db";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function bookmarkProperty(propertyId) {
  await connectDB();
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("User id is required to bookmark a property.");
  }

  const { userId } = sessionUser;
  const user = await User.findById(userId);
  if (!user) {
    throw new Error("User not found.");
  }

  let isBookmarked = user.bookmarks.includes(propertyId);
  let message;
  // if (alreadyBookmarked) {
  //   user.bookmarks = user.bookmarks.filter((id) => id.toString() !== propertyId);
  //   message = "Property removed from bookmarks.";
  // } else {
  //   user.bookmarks.push(propertyId);
  //   message = "Property bookmarked successfully.";
  // }
  if (isBookmarked) {
    user.bookmarks.pull(propertyId);
    message = "Property removed from bookmarks.";
    isBookmarked = false;
  } else {
    user.bookmarks.push(propertyId);
    message = "Property saved successfully.";
    isBookmarked = true;
  }
  await user.save();
  revalidatePath("/properties/saved", "page");
  return { message, isBookmarked };
}

export default bookmarkProperty;
