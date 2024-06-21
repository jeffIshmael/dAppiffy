import React, { useState, ChangeEvent } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSubmit: (username: string) => void;
  isPending: boolean;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, onSubmit , isPending }) => {
  const [username, setUsername] = useState<string>("");

  if (!isOpen) return null;

  const handleSubmit = () => {
    onSubmit(username);
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setUsername(e.target.value);
  };

  return (
    <div className="fixed top-4 w-80 right-4 bg-white p-4 rounded-lg shadow-md mt-14">
      <div className="flex items-center justify-between">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-400 hover:text-gray-800"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </button>
        <div className="flex flex-col gap-2">
          <h2 className="text-lg font-bold text-black">Sign Up</h2>
          <div className="flex space-x-1 ">
            <input
              type="text"
              placeholder="input username"
              value={username}
              onChange={handleChange}
              required
              className="text-black w-3/4 rounded-md"
            />

            <button
              onClick={username ? handleSubmit : undefined}
              disabled={!username}
              className={`bg-blue-500 text-white rounded-lg w-1/4  hover:bg-blue-400 ${
                !username && "opacity-50 cursor-not-allowed"
              }`}
            >
              {isPending ? "..." : "Sign Up"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Modal;
