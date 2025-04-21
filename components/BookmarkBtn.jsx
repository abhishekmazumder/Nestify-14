"use client";

import { useState, useEffect } from "react";
import { FaBookmark } from "react-icons/fa";
import { toast } from "react-toastify";
import { useSession } from "next-auth/react";

import bookmarkProperty from "@/app/actions/bookmarkProperty";
import checkBookmarkStatus from "@/app/actions/checkBookmarkStatus";

const BookmarkBtn = ({ property }) => {
  const [isSaved, setIsSaved] = useState(true);
  const { data: session } = useSession();
  const userId = session?.user?.id;

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBookmarkStatus = async () => {
      try {
        setLoading(true);
        const { isBookmarked } = await checkBookmarkStatus(property._id);
        setLoading(false);
        setIsSaved(isBookmarked);
      } catch (error) {
        toast.error(error.message, {
          position: "bottom-center",
          theme: "dark",
          autoClose: 2000,
        });
      }
    };
    if (userId) {
      fetchBookmarkStatus();
    }
  }, [property._id, userId]);

  const handleClick = async () => {
    try {
      const { message, isBookmarked } = await bookmarkProperty(property._id);
      setIsSaved(isBookmarked);
      toast.success(message, {
        position: "bottom-center",
        theme: "dark",
        autoClose: 2000,
      });
    } catch (error) {
      toast.error(error.message, {
        position: "bottom-center",
        theme: "dark",
        autoClose: 2000,
      });
    }
  };

  if (!session) return null; // Ensure the user is logged in before showing the button
  if (loading) return <p className="text-center">Loading...</p>

  return isSaved ? (
    <button
      className="bg-red-600 hover:bg-red-700 text-white font-bold w-full py-2 px-4
    rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" /> Remove Property
    </button>
  ) : (
    <button
      className="bg-blue-500 hover:bg-blue-600 text-white font-bold w-full py-2 px-4
    rounded-full flex items-center justify-center"
      onClick={handleClick}
    >
      <FaBookmark className="mr-2" /> Save Property
    </button>
  );
};

export default BookmarkBtn;
