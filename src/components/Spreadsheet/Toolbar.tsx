import { ChevronDown, Eye, ArrowUpDown, Filter, Upload, Download, Share2 } from "lucide-react";

const Toolbar = () => {
  const handleToolbarAction = (action: string) => {
    console.log(`${action} clicked`);
  };

  return (
    <>
      <div className="bg-white border-b border-gray-200 px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <button onClick={() => handleToolbarAction("Tool bar")} className="flex items-center space-x-1 px-3 py-1.5 text-sm font-medium text-gray-700 hover:bg-gray-100 rounded">
              Tool bar
              <ChevronDown className="w-4 h-4" />
            </button>
            <button onClick={() => handleToolbarAction("Hide Fields")} className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded">
              <Eye className="w-4 h-4" />
              Hide Fields
            </button>
            <button onClick={() => handleToolbarAction("Sort")} className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded">
              <ArrowUpDown className="w-4 h-4" />
              Sort
            </button>
            <button onClick={() => handleToolbarAction("Filter")} className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 rounded">
              <Filter className="w-4 h-4" />
              Filter
            </button>
          </div>

          <div className="flex items-center space-x-2">
            <button onClick={() => handleToolbarAction("Import")} className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 border border-gray-300 rounded-md">
              <Upload className="w-4 h-4" />
              Import
            </button>
            <button onClick={() => handleToolbarAction("Export")} className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 border border-gray-300 rounded-md">
              <Download className="w-4 h-4" />
              Export
            </button>
            <button onClick={() => handleToolbarAction("Share")} className="flex items-center space-x-1 px-3 py-1.5 text-sm text-gray-600 hover:bg-gray-100 border border-gray-300 rounded-md">
              <Share2 className="w-4 h-4" />
              Share
            </button>
            <button onClick={() => handleToolbarAction("New Action")} className="flex items-center space-x-1 px-3 py-1.5 bg-green-600 text-white text-sm font-medium rounded hover:bg-green-700">
              New Action
            </button>
          </div>
        </div>
      </div>
    </>
  );
};

export default Toolbar;
