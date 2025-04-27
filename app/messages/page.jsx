import connectDB from "@/config/db";
import Message from "@/models/Message";
import { getSessionUser } from "@/utils/getSessionUser";
import { convertToSerializableObject } from "@/utils/convertToObject";
import "@/models/Property";
import MessageCard from "@/components/MessageCard";

const MessagePage = async () => {
  await connectDB();
  const sessionUser = await getSessionUser();

  if (!sessionUser || !sessionUser.userId) {
    return <div>Please log in to view your messages.</div>;
  }

  const readMessages = await Message.find({
    recipient: sessionUser.userId,
    is_read: true,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const unreadMessages = await Message.find({
    recipient: sessionUser.userId,
    is_read: false,
  })
    .sort({ createdAt: -1 })
    .populate("sender", "username")
    .populate("property", "name")
    .lean();

  const messages = [...readMessages, ...unreadMessages].map((messageDoc) => {
    const message = convertToSerializableObject(messageDoc);
    message.sender = convertToSerializableObject(message.sender);
    message.property = convertToSerializableObject(message.property);
    return message;
  });

  return (
    <section className="bg-blue-50">
      <div className="container m-auto p-24 max-w-6xl">
        <div className="bg-white px-6 py-8 shadow-md rounded-md border m-4 md:m-0">
          <h2 className="text-2xl font-semibold mb-4">Your Messages</h2>
          <div className="space-y-4">
            {messages.length === 0 ? (
              <p className="text-gray-500">You have got no message.</p>
            ) : (
              messages.map((message) => (
                <MessageCard key={message._id} message={message} />
              ))
            )}
          </div>
        </div>
      </div>
    </section>
  );
};

export default MessagePage;
