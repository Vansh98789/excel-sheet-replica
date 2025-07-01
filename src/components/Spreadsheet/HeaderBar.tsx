// components/Spreadsheet/HeaderBar.tsx
import { ChevronDown, MoreHorizontal, Search, Bell } from "lucide-react";

const HeaderBar = () => {
  return (
    <div className="bg-white border-b border-gray-200 px-4 py-3">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-6 h-6 bg-grey-100 rounded flex items-center justify-center">
              <div className="w-3 h-3 bg-gray-500 rounded"></div>
            </div>
            <span className="text-sm font-medium text-gray-700">Workspace</span>
            <ChevronDown className="w-4 h-4 text-gray-400" />
          </div>
          <span className="text-gray-400">›</span>
          <span className="text-sm text-gray-600">Folder 2</span>
          <span className="text-gray-400">›</span>
          <span className="text-sm font-medium text-gray-900">Spreadsheet 3</span>
          <MoreHorizontal className="w-4 h-4 text-gray-400" />
        </div>

        <div className="flex items-center space-x-3">
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              placeholder="Search within sheet"
              className="pl-10 pr-4 py-2 text-sm border border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            />
          </div>
          <div className="flex items-center space-x-2">
            <Bell className="w-5 h-5 text-gray-400" />
            <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center">
              <span className="text-white text-sm font-medium">JD</span>
            </div>
            <span className="text-sm font-medium text-gray-700">John Doe</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeaderBar;
