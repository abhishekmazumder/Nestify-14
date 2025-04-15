"use server";
import cloudinary from "@/config/cloudinary";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { getSessionUser } from "@/utils/getSessionUser";
import { revalidatePath } from "next/cache";

async function deleteProperty(propertyId) {
  const sessionUser = await getSessionUser();
  if (!sessionUser || !sessionUser.userId) {
    throw new Error("UserId required!");
  }
  const { userId } = sessionUser;
  await connectDB();

  const property = await Property.findById(propertyId);
  if (!property) throw new Error("Property not found!");

  // Check the ownership of the property
  if (property.owner.toString() !== userId) {
    throw new Error("You are not authorized to delete this property!");
  }

  // Extract public Ids from the images
  const publicIds = property.images.map((imageUrl) => {
    const segments = imageUrl.split("/");
    return segments.at(-1).split(".")[0];
    // const publicId = segments[segments.length - 1].split(".")[0];
    // return publicId;
  });
  // Delete the images from cloudinary
  if (publicIds.length > 0) {
    // await Promise.all(
    //   publicIds.map((publicId) => cloudinary.uploader.destroy(publicId))
    // );
    for (let publicId of publicIds) {
      await cloudinary.uploader.destroy("nestify/" + publicId, {
        invalidate: true,
      });
    }
  }
  // Delete the property
  await property.deleteOne();
  revalidatePath("/", "layout");
}

export default deleteProperty;
