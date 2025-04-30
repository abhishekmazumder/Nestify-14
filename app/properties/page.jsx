import Pagination from "@/components/Pagination";
import PropertyCard from "@/components/PropertyCard";
import connectDB from "@/config/db";
import Property from "@/models/Property";

async function PropertiesPage({ searchParams: { page = 1, pageSize = 6 } }) {
  await connectDB();

  // pagination
  const skip = (page - 1) * pageSize;
  const totalPropertyCount = await Property.countDocuments();
  const totalPages = Math.ceil(totalPropertyCount / pageSize);
  const properties = await Property.find({}).skip(skip).limit(pageSize);
  const showPagination = totalPropertyCount > pageSize;

  return (
    <section className="px-4 py-6">
      <div className="container-xl lg:container m-auto px-4 py-6">
        {properties.length === 0 ? (
          <p>No properties found!</p>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {properties.map((property) => (
              <PropertyCard key={property._id} property={property} />
            ))}
          </div>
        )}
        {showPagination && (
          <Pagination
            page={parseInt(page)}
            pageSize={pageSize}
            totalPages={totalPages}
          />
        )}
      </div>
    </section>
  );
}

export default PropertiesPage;
