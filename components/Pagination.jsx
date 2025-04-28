import Link from "next/link";
import { FaArrowLeft, FaArrowRight } from "react-icons/fa";

const Pagination = ({ page, pageSize, totalPages }) => {
  return (
    <div className="container mx-auto flex justify-center items-center my-8">
      <nav className="flex items-center space-x-2">
        {page > 1 && (
          <Link
            href={`/properties?page=${page - 1}`}
            className="px-4 py-2 border-2 border-gray-400 text-gray-600 rounded-md hover:bg-blue-600"
          >
            <FaArrowLeft />
          </Link>
        )}

        <span className="text-gray-400 font-bold">
          Page {page} of {totalPages}
        </span>
        {page < totalPages && (
          <Link
            href={`/properties?page=${page + 1}`}
            className="px-4 py-2 border-2 border-gray-400 text-gray-600 rounded-md hover:bg-blue-600"
          >
            <FaArrowRight />
          </Link>
        )}
      </nav>
    </div>
  );
};

export default Pagination;
