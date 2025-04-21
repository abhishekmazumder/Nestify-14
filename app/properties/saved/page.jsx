import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/db";
import User from "@/models/User";
import { getSessionUser } from "@/utils/getSessionUser";

const SavedPropertiesPage = async () => {
  connectDB();
  const { userId } = await getSessionUser();
  const { bookmarks } = await User.findById(userId).populate("bookmarks");
  console.log(bookmarks);

  return (
    <section className="px-4 py-6">
      <div className="container lg:container px-4 py-6">
        <h1 className="text-2xl font-bold mb-4">Saved Properties</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {bookmarks.length === 0 ? (
            <p className="font-bold mt-12">No Saved Properties</p>
          ) : (
            bookmarks.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))
          )}
        </div>
      </div>
    </section>
  );
};

export default SavedPropertiesPage;
