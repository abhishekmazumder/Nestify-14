import PropertyAddForm from "@/components/PropertyAddForm";

function AddPropertyPage() {
  return (
    <div className="bg-blue-50">
      <div className="container m-auto max-w-2xl py-20">
        <div className="bg-white px-6 py-8 shadow-lg mb-4 rounded-lg border m-4 md:m-0">
          <PropertyAddForm />
        </div>
      </div>
    </div>
  );
}

export default AddPropertyPage;
