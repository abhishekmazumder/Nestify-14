import PropertyHeaderImg from "@/components/PropertyHeaderImg";
import PropertyInfo from "@/components/PropertyInfo";
import PropertyImages from "@/components/PropertyImages";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";
import { convertToSerializableObject } from "@/utils/convertToObject";

async function PropertyDetailsPage({ params }) {
  await connectDB();
  const propertyDoc = await Property.findById(params.id).lean();
  const property = convertToSerializableObject(propertyDoc);

  if(!property) {
    return (
      <div className="container m-auto py-24 px-6">
        <h1 className="text-3xl font-bold mb-4">Property not found</h1>
        <Link href="/properties" className="text-blue-500 hover:text-blue-600">
          Back to Properties
        </Link>
      </div>
    );
  }

  return (
    <>
      <PropertyHeaderImg image={property.images[0]} />
      {/* Go Back to properties page button */}
      <section>
        <div className="container m-auto py-6 px-6">
          <Link
            href="/properties"
            className="text-blue-500 hover:text-blue-600 flex items-center"
          >
            <FaArrowLeft className="mr-2" /> Back to Properties
          </Link>
        </div>
      </section>
      {/* Property Info */}
      <section className="bg-blue-50">
        <div className="container m-auto py-10 px-6">
          <div className="grid grid-cols-1 md:grid-cols-70/30 w-full gap-6">
            <PropertyInfo property={property} />
          </div>
        </div>
      </section>
      <PropertyImages images={property.images} />
    </>
  );
}

export default PropertyDetailsPage;
