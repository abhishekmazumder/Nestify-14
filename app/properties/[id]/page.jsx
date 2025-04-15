import PropertyHeaderImg from "@/components/PropertyHeaderImg";
import PropertyInfo from "@/components/PropertyInfo";
import PropertyImages from "@/components/PropertyImages";
import connectDB from "@/config/db";
import Property from "@/models/Property";
import Link from "next/link";
import { FaArrowLeft } from "react-icons/fa";

async function PropertyDetailsPage({ params }) {
  await connectDB();
  const property = await Property.findById(params.id).lean();
  return (
    <>
      <PropertyHeaderImg image={property.images[0]} />

      {/* Go Back */}
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
