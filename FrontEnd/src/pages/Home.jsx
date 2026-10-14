import React, { useState, useEffect } from "react";
import { noteService } from "../services/noteService";
import NoteForm from "../components/NoteForm";
import NoteGrid from "../components/NoteGrid";

export default function Home() {
  const [topic, setTopic] = useState("hoc-tap");
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  const loadNotes = async () => {
    try {
      const data = await noteService.getByTopic(topic);
      setNotes(data || []);
    } catch (err) {
      console.error("Lỗi lấy ghi chú:", err);
    }
  };

  useEffect(() => {
    loadNotes();
    setEditingNote(null);
  }, [topic]);

  const handleFormSubmit = async (formData) => {
    if (editingNote) {
      await noteService.update(topic, editingNote.id, formData);
      setEditingNote(null);
    } else {
      await noteService.create(topic, formData);
    }
    loadNotes();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa ghi chú này?")) {
      await noteService.delete(topic, id);
      loadNotes();
    }
  };

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      {/* Header trang và Bộ lọc chủ đề */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 pb-5 border-b border-slate-200 dark:border-slate-800">
        <div>
          <h2 className="text-2xl font-bold text-slate-800 dark:text-white">
            Ghi chú công khai
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Quản lý và sắp xếp ghi chú theo chủ đề
          </p>
        </div>

        <div className="flex items-center gap-2">
          <span className="text-xs font-semibold text-slate-500 dark:text-slate-400">
            Chủ đề:
          </span>
          <select
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="px-3.5 py-2 rounded-xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-slate-900 text-sm font-medium text-slate-700 dark:text-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-500/20"
          >
            <option value="hoc-tap">📚 Học tập</option>
            <option value="cong-viec">💼 Công việc</option>
            <option value="ca-nhan">👤 Cá nhân</option>
          </select>
        </div>
      </div>

      <NoteForm
        editingNote={editingNote}
        onSubmit={handleFormSubmit}
        onCancel={() => setEditingNote(null)}
      />
      <NoteGrid
        notes={notes}
        onEdit={(note) => setEditingNote(note)}
        onDelete={handleDelete}
      />
    </div>
  );
}
