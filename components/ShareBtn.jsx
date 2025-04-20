import { FaShare } from "react-icons/fa";

const ShareBtn = () => {
  return (
    <button className="bg-yellow-500 hover:bg-green-600 text-white font-bold w-full py-2 px-4 rounded-full flex items-center justify-center">
      <FaShare className="mr-2" /> Share Property
    </button>
  );
};

export default ShareBtn;
