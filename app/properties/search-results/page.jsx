import Link from "next/link";
import PropertyCard from "@/components/PropertyCard";
import SearchForm from "@/components/SearchForm";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import { convertToSerializableObject } from "@/utils/convertToObject";
import { FaArrowAltCircleLeft } from "react-icons/fa";

const SearchResultsPage = async ({
  searchParams: { location, propertyType },
}) => {
  console.log("SearchResultsPage:", location, propertyType);
  await connectDB();
  const locationRegex = new RegExp(location, "i");

  // for location param, we will search in the following fields:
  let query = {
    $or: [
      { name: { $regex: locationRegex } },
      { "location.street": { $regex: locationRegex } },
      { "location.city": { $regex: locationRegex } },
      { "location.state": { $regex: locationRegex } },
    ],
  };

  // for propertyType param, we will search in the following fields:
  // if (propertyType && propertyType !== "All") {
  //   const propertyTypeRegex = new RegExp(propertyType, "i");
  //   query = {
  //     ...query,
  //     propertyType: { $regex: propertyTypeRegex },
  //   };
  // }

  // for propertyType param, we will search in the following fields:
  if (propertyType && propertyType !== "All") {
    const propertyTypeRegex = new RegExp(propertyType, "i");
    query.type = { $regex: propertyTypeRegex };
  }

  const propertiesQueruResults = await Property.find(query).lean();
  const properties = convertToSerializableObject(propertiesQueruResults);
  // console.log("properties:", properties);

  return (
    <>
      <section className="bg-blue-900 py-4">
        <div className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8 flex flex-col items-center">
          <SearchForm />
          <div className="text-center py-8">
            <h1 className="text-3xl font-bold text-white">Search Results</h1>
            <p className="my-4 text-lg text-white">
              Found{" "}
              <span className="font-bold text-yellow-400">
                {properties.length}
              </span>{" "}
              properties matching your search criteria.
            </p>
          </div>
        </div>
      </section>
      <section className="max-w-7xl mx-auto px-4 py-8 sm:px-6 lg:px-8">
        <Link
          href="/properties"
          className="inline-flex items-center mb-4 hover:underline font-semibold text-blue-600 bg-gray-300  px-4 py-2 rounded-lg"
        >
          <FaArrowAltCircleLeft className="mr-4" /> Go back to properties
        </Link>
      </section>
      <section>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          {properties.length === 0 ? (
            <p className="text-3xl font-bold text-gray-400 mb-16">No property found matching your search criteria</p>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {properties.map((property) => (
                <Link key={property._id} href={`/properties/${property._id}`}>
                  <PropertyCard property={property} />
                </Link>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  );
};

export default SearchResultsPage;
