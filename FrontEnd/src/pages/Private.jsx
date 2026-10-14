import React, { useState } from "react";
import { privateService } from "../services/privateService";
import PasswordModal from "../components/PasswordModal";
import NoteForm from "../components/NoteForm";
import NoteGrid from "../components/NoteGrid";
import { Lock } from "lucide-react";

export default function Private() {
  const [isUnlocked, setIsUnlocked] = useState(false);
  const [notes, setNotes] = useState([]);
  const [editingNote, setEditingNote] = useState(null);

  const loadPrivateNotes = async () => {
    try {
      const data = await privateService.getAll();
      setNotes(data || []);
    } catch (err) {
      console.error(err);
    }
  };

  const handleUnlock = async (password) => {
    try {
      const res = await privateService.verifyPassword(password);
      if (res.success) {
        setIsUnlocked(true);
        loadPrivateNotes();
        return true;
      }
      return false;
    } catch {
      return false;
    }
  };

  const handleFormSubmit = async (formData) => {
    if (editingNote) {
      await privateService.update(editingNote.id, formData);
      setEditingNote(null);
    } else {
      await privateService.create(formData);
    }
    loadPrivateNotes();
  };

  const handleDelete = async (id) => {
    if (window.confirm("Bạn có chắc muốn xóa ghi chú bí mật này?")) {
      await privateService.delete(id);
      loadPrivateNotes();
    }
  };

  if (!isUnlocked) {
    return <PasswordModal onUnlock={handleUnlock} />;
  }

  return (
    <div className="max-w-5xl mx-auto space-y-6">
      <div className="flex items-center justify-between pb-5 border-b border-red-200 dark:border-red-950/60">
        <div>
          <h2 className="text-2xl font-bold text-red-600 dark:text-red-400 flex items-center gap-2">
            <Lock className="w-6 h-6" /> Vùng ghi chú mật
          </h2>
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Các thông tin nhạy cảm đã được bảo vệ
          </p>
        </div>

        <button
          onClick={() => setIsUnlocked(false)}
          className="px-3.5 py-1.5 bg-red-600 hover:bg-red-700 text-white rounded-xl text-xs font-semibold transition"
        >
          Khóa lại
        </button>
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
        emptyMessage="Chưa có ghi chú bí mật nào."
      />
    </div>
  );
}
