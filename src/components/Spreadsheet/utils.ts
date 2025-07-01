// components/Spreadsheet/utils.ts
export const getStatusBadge = (status: string) => {
  const statusLower = status.toLowerCase();
if (statusLower === "in-process")
  return "bg-yellow-100 text-yellow-800 border border-yellow-200 rounded-full";
if (statusLower === "need to start")
  return "bg-blue-100 text-blue-800 border border-blue-200 rounded-full";
if (statusLower === "complete")
  return "bg-green-100 text-green-800 border border-green-200 rounded-full";
if (statusLower === "blocked")
  return "bg-red-100 text-red-800 border border-red-200 rounded-full";
return "bg-gray-100 text-gray-800 border border-gray-200 rounded-full";

};

export const getPriorityBadge = (priority: string) => {
  const priorityLower = priority.toLowerCase();
  if (priorityLower === "high") return " text-red-800 ";
  if (priorityLower === "medium") return " text-yellow-800  ";
  if (priorityLower === "low") return " text-blue-800  ";
  return "bg-gray-100 text-gray-800 border border-gray-200";
};
