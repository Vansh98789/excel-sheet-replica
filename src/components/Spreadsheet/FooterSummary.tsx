// components/Spreadsheet/FooterBar.tsx
import React from "react";
import { Plus } from "lucide-react";

const FooterBar = () => {
  const footerItems = ["All Orders", "Pending", "Review", "Arrived"];

  const handleClick = (label: string) => {
    console.log(`${label} is clicked`);
  };

  return (
    <div className="fixed bottom-0 left-0 right-0 border-t border-gray-200 bg-gray-50 px-4 py-3 z-10">
      <div className="flex items-center space-x-6 text-sm">
        {footerItems.map((label) => (
          <div
            key={label}
            className="flex items-center cursor-pointer"
            onClick={() => handleClick(label)}
          >
            <span
              className={`px-3 py-2 rounded-md ${
                label === "All Orders"
                  ? "font-semibold text-green-700 bg-green-200 border-t-4 border-green-500"
                  : "text-gray-600 hover:text-gray-900"
              }`}
            >
              {label}
            </span>
          </div>
        ))}

        <button
          className="px-3 py-3 text-gray-400 hover:text-gray-600"
          onClick={() => console.log("Plus is clicked")}
        >
          <Plus className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
};

export default FooterBar;
