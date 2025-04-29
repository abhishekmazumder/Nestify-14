"use client";
import { useState } from "react";
import { toast } from "react-toastify";
import markMessageAsRead from "@/app/actions/markMessageRead";
import deleteMessage from "@/app/actions/deleteMessage";

const MessageCard = ({ message }) => {
  const [isRead, setIsRead] = useState(message.isRead);
  const { setUnreadMessageCount } = useGlobalContext();

  const handleMessageClick = async () => {
    const read = await markMessageAsRead(message._id);
    setIsRead(read);
    setUnreadMessageCount((prevCount) =>
      read ? prevCount - 1 : prevCount + 1
    );
  };

  const handleDelete = async () => {
    const confirmed = confirm("Are you sure you want to delete this message?");
    if (confirmed) {
      try {
        await deleteMessage(message._id);
        setUnreadMessageCount((prevCount) =>
          read ? prevCount : prevCount - 1
        );
        toast.success("Message deleted successfully!");
      } catch (error) {
        toast.error(error.message || "Failed to delete message.");
      }
    }
  };

  return (
    <div className="relative bg-white p-4 rounded-md shadow-md border border-gray-200">
      {!isRead && (
        <div className="absolute top-2 right-2 bg-red-500 text-white text-xs px-2 py-1 rounded-md">
          New Message!
        </div>
      )}
      <h2 className="text-xl mb-4">
        <span className="font-bold">Property Inquiry:</span>
        {message.property.name}
      </h2>
      <p className="text-gray-700">{message.body}</p>

      <ul className="mt-4">
        <li>
          <strong>Name:</strong> {message.name}
        </li>

        <li>
          <strong>Reply Email:</strong>
          <a href={`mailto:${message.email}`} className="text-blue-500">
            {message.email}
          </a>
        </li>
        <li>
          <strong>Reply Phone:</strong>
          <a href={`tel:${message.phone}`} className="text-blue-500">
            {message.phone}
          </a>
        </li>
        <li>
          <strong>Received:</strong>
          {new Date(message.createdAt).toLocaleDateString("en-US", {
            year: "numeric",
            month: "long",
            day: "numeric",
          })}
        </li>
      </ul>
      <button
        onClick={handleMessageClick}
        className="mt-4 mr-3 bg-blue-500 text-white py-1 px-3 rounded-md"
      >
        {isRead ? "Mark as Unread" : "Mark as Read"}

        {/* Mark As read */}
      </button>
      <button
        onClick={handleDelete}
        className="mt-4 bg-red-500 text-white py-1 px-3 rounded-md"
      >
        Delete
      </button>
    </div>
  );
};

export default MessageCard;
