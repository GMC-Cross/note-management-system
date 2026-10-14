import React from "react";
import { Edit2, Trash2 } from "lucide-react";

export default function NoteCard({ note, onEdit, onDelete }) {
  return (
    <div className="bg-white dark:bg-slate-900 border border-slate-200/80 dark:border-slate-800 rounded-2xl p-5 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between group">
      <div>
        <h4 className="font-semibold text-slate-800 dark:text-slate-100 text-base mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
          {note.title}
        </h4>
        <p className="text-slate-600 dark:text-slate-400 text-sm whitespace-pre-wrap leading-relaxed line-clamp-4">
          {note.content}
        </p>
      </div>

      <div className="mt-5 pt-3 border-t border-slate-100 dark:border-slate-800/80 flex items-center justify-between">
        <span className="text-xs text-slate-400 dark:text-slate-500">
          {new Date(
            note.updatedAt || note.createdAt || Date.now(),
          ).toLocaleDateString("vi-VN")}
        </span>

        <div className="flex items-center gap-1.5">
          <button
            onClick={() => onEdit(note)}
            className="p-1.5 text-slate-500 hover:text-blue-600 dark:hover:text-blue-400 hover:bg-blue-50 dark:hover:bg-blue-950/40 rounded-lg transition"
            title="Chỉnh sửa"
          >
            <Edit2 className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => onDelete(note.id)}
            className="p-1.5 text-slate-500 hover:text-red-600 dark:hover:text-red-400 hover:bg-red-50 dark:hover:bg-red-950/40 rounded-lg transition"
            title="Xóa"
          >
            <Trash2 className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
}
