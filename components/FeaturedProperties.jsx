import connectDB from "@/config/db";
import Property from "@/models/Property";
import FeaturedCard from "./FeaturedCard";

const FeaturedProperties = async () => {
  await connectDB();
  const feautredProperties = await Property.find({ is_featured: true }).lean();

  return (
    feautredProperties.length > 0 && (
      <section className="px-4 bg-blue-100 py-8">
        <div className="container-xl lg:container m-auto">
          <h2 className="text-3xl font-bold text-blue-500 mb-6 text-center">
            Featured Properties
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {feautredProperties.map((property) => (
              <FeaturedCard key={property._id} property={property} />
            ))}
          </div>
        </div>
      </section>
    )
  );
};

export default FeaturedProperties;
