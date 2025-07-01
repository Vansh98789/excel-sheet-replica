
import { useState, useEffect, useMemo, useCallback } from "react";
import {
  useReactTable,
  getCoreRowModel,
  getSortedRowModel,
  getFilteredRowModel,
  flexRender,
  createColumnHelper,
} from "@tanstack/react-table";
import type { SortingState, ColumnFiltersState } from "@tanstack/react-table";
import { getStatusBadge, getPriorityBadge } from "./utils";

interface SpreadsheetCell {
  id: number;
  [key: string]: string | number;
}

const createInitialData = (): SpreadsheetCell[] => {
  const columns = "ABCDEFGHIJKLMNOPQRST".split("");
  const data: SpreadsheetCell[] = [];

  const sampleData = [
    {
      A: "Launch social media campaign for pro...",
      B: "15-11-2024",
      C: "In-process",
      D: "Aisha Patel",
      E: "www.aishapatel...",
      F: "Sophie Choudhury",
      G: "Medium",
      H: "20-11-2024",
      I: "6,200,000",
    },
    {
      A: "Update press kit for company redesign",
      B: "28-10-2024",
      C: "Need to start",
      D: "Irfan Khan",
      E: "www.irfankhan...",
      F: "Tejas Pandey",
      G: "High",
      H: "30-10-2024",
      I: "3,500,000",
    },
    {
      A: "Finalize user testing feedback for app...",
      B: "05-12-2024",
      C: "In-process",
      D: "Mark Johnson",
      E: "www.markjohns...",
      F: "Rachel Lee",
      G: "Medium",
      H: "10-12-2024",
      I: "4,750,000",
    },
    {
      A: "Design new features for the website",
      B: "10-01-2025",
      C: "Complete",
      D: "Emily Green",
      E: "www.emilygreen...",
      F: "Tom Wright",
      G: "Low",
      H: "15-01-2025",
      I: "5,900,000",
    },
    {
      A: "Prepare financial report for Q4",
      B: "25-01-2025",
      C: "Blocked",
      D: "Jessica Brown",
      E: "www.jessicabro...",
      F: "Kevin Smith",
      G: "Low",
      H: "30-01-2025",
      I: "2,800,000",
    },
  ];

  sampleData.forEach((row, index) => {
    const typedRow = row as Record<string, string | number>;
    const dataRow: SpreadsheetCell = { id: index + 1 };
    columns.forEach((col) => {
      dataRow[col] = typedRow[col] || "";
    });
    data.push(dataRow);
  });

  for (let i = 5; i < 30; i++) {
    const emptyRow: SpreadsheetCell = { id: i + 1 };
    columns.forEach((col) => {
      emptyRow[col] = "";
    });
    data.push(emptyRow);
  }

  return data;
};

const SpreadsheetTable = () => {
  const [data, setData] = useState(createInitialData());
  const [sorting, setSorting] = useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [selectedCell, setSelectedCell] = useState<{
    rowIndex: number;
    columnId: string;
  } | null>(null);
  const [editingCell, setEditingCell] = useState<{
    rowIndex: number;
    columnId: string;
  } | null>(null);

  const columnHelper = createColumnHelper<SpreadsheetCell>();

  const columnHeaders = [
    "#", // ID
    "Job Request",
    "Submitted",
    "Status",
    "Submitter",
    "URL",
    "Assigned",
    "Priority",
    "Due Date",
    "Est. Value",
    
  ];

  const updateCellValue = useCallback(
    (rowIndex: number, columnId: string, value: string | number) => {
      setData((prev) => {
        const newData = [...prev];
        newData[rowIndex] = { ...newData[rowIndex], [columnId]: value };
        return newData;
      });
    },
    []
  );

  const columns = useMemo(() => {
    const cols = [
      columnHelper.accessor("id", {
        header: "",
        cell: (info) => (
          <div className="text-center text-sm text-gray-500 font-medium">
            {info.getValue()}
          </div>
        ),
        size: 50,
        enableSorting: false,
        enableResizing: false,
      }),
      ..."ABCDEFGHI".split("").map((col, index) =>
        columnHelper.accessor(col, {
          header: columnHeaders[index + 1] || col,
          cell: (info) => {
            const rowIndex = info.row.index;
            const columnId = info.column.id;
            const value = info.getValue() as string;
            const isEditing =
              editingCell?.rowIndex === rowIndex &&
              editingCell?.columnId === columnId;

            if (isEditing) {
              return (
                <input
                  type="text"
                  value={value}
                  onChange={(e) =>
                    updateCellValue(rowIndex, columnId, e.target.value)
                  }
                  onBlur={() => setEditingCell(null)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") setEditingCell(null);
                  }}
                  className="w-full border-none outline-none bg-transparent"
                  autoFocus
                />
              );
            }

            if (columnId === "C" && value) {
              return (
                <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getStatusBadge(value)}`}>
                  {value}
                </span>
              );
            }

            if (columnId === "G" && value) {
              return (
                <span className={`inline-block px-2 py-1 rounded-md text-xs font-medium ${getPriorityBadge(value)}`}>
                  {value}
                </span>
              );
            }

            return <div className="text-sm">{value}</div>;
          },
          size:
            index === 0
              ? 500
              : index === 1
              ? 120
              : index === 2
              ? 130
              : index === 3
              ? 150
              : index === 4
              ? 180
              : index === 5
              ? 150
              : index === 6
              ? 100
              : index === 7
              ? 120
              : index === 8
              ? 120
              : 100,
        })
      ),
    ];
    return cols;
  }, [editingCell, columnHelper, updateCellValue]);

  const table = useReactTable({
    data,
    columns,
    state: {
      sorting,
      columnFilters,
      globalFilter,
    },
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onGlobalFilterChange: setGlobalFilter,
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    enableColumnResizing: true,
    columnResizeMode: "onChange",
  });

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!selectedCell || editingCell) return;

      const columnIds = table.getAllColumns().filter(col => col.id !== "id").map(col => col.id);
      const colIndex = columnIds.indexOf(selectedCell.columnId);

      let newRow = selectedCell.rowIndex;
      let newCol = selectedCell.columnId;

      switch (e.key) {
        case "ArrowUp":
          e.preventDefault();
          newRow = Math.max(0, newRow - 1);
          break;
        case "ArrowDown":
          e.preventDefault();
          newRow = Math.min(data.length - 1, newRow + 1);
          break;
        case "ArrowLeft":
          e.preventDefault();
          if (colIndex > 0) newCol = columnIds[colIndex - 1];
          break;
        case "ArrowRight":
          e.preventDefault();
          if (colIndex < columnIds.length - 1) newCol = columnIds[colIndex + 1];
          break;
        case "Enter":
          e.preventDefault();
          if (selectedCell.columnId !== "id") setEditingCell(selectedCell);
          return;
        case "Escape":
          e.preventDefault();
          setEditingCell(null);
          return;
      }

      setSelectedCell({ rowIndex: newRow, columnId: newCol });
    };

    document.addEventListener("keydown", handleKeyDown);
    return () => document.removeEventListener("keydown", handleKeyDown);
  }, [selectedCell, editingCell, table, data.length]);

  return (
    <div className="flex-1 overflow-auto">
      <table className="min-w-full divide-y divide-gray-200">
        <thead className="sticky top-0 bg-gray-50 z-10">
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider border-r border-gray-200 cursor-pointer hover:bg-gray-100 relative"
                  style={{ width: header.getSize() }}
                  onClick={() => {
                    if (header.column.getCanSort()) header.column.toggleSorting();
                  }}
                >
                  <div className="flex items-center justify-center">
                    {flexRender(header.column.columnDef.header, header.getContext())}
                  </div>
                  {header.column.getCanResize() && (
                    <div
                      onMouseDown={header.getResizeHandler()}
                      onTouchStart={header.getResizeHandler()}
                      className="absolute right-0 top-0 h-full w-1 bg-transparent hover:bg-blue-300 cursor-col-resize"
                    />
                  )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody className="bg-white divide-y divide-gray-200">
          {table.getRowModel().rows.map((row, rowIndex) => (
            <tr key={row.id} className="hover:bg-gray-50">
              {row.getVisibleCells().map((cell) => (
                <td
                  key={cell.id}
                  className={`px-2 py-1 border-r border-gray-200 text-sm cursor-pointer ${
                    selectedCell?.rowIndex === rowIndex &&
                    selectedCell?.columnId === cell.column.id
                      ? "bg-blue-100 ring-1 ring-blue-500"
                      : ""
                  } ${cell.column.id === "id" ? "bg-gray-50 text-center" : ""}`}
                  style={{ width: cell.column.getSize() }}
                  onClick={() =>
                    setSelectedCell({ rowIndex, columnId: cell.column.id })
                  }
                  onDoubleClick={() => {
                    if (cell.column.id !== "id") {
                      setEditingCell({ rowIndex, columnId: cell.column.id });
                    }
                  }}
                >
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default SpreadsheetTable;
