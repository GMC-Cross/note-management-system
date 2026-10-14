import React from "react";
import NoteCard from "./NoteCard";
import { FolderOpen } from "lucide-react";

export default function NoteGrid({
  notes,
  onEdit,
  onDelete,
  emptyMessage = "Chưa có ghi chú nào ở chủ đề này.",
}) {
  if (!notes || notes.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center p-12 bg-white dark:bg-slate-900 border border-dashed border-slate-200 dark:border-slate-800 rounded-2xl text-center">
        <FolderOpen className="w-10 h-10 text-slate-300 dark:text-slate-600 mb-2" />
        <p className="text-sm text-slate-400 dark:text-slate-500 font-medium">
          {emptyMessage}
        </p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
      {notes.map((note, index) => (
        <NoteCard
          key={note.id || note._id || `note-${index}`}
          note={note}
          onEdit={onEdit}
          onDelete={onDelete}
        />
      ))}
    </div>
  );
}
