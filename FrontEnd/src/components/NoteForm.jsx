import React, { useState, useEffect } from "react";
import * as yup from "yup";
import { Plus, Check, X } from "lucide-react";

const noteSchema = yup.object().shape({
  title: yup
    .string()
    .trim()
    .required("Tiêu đề không được để trống!")
    .max(60, "Tiêu đề không quá 60 ký tự!"),
  content: yup
    .string()
    .trim()
    .required("Nội dung ghi chú không được để trống!"),
});

export default function NoteForm({ editingNote, onSubmit, onCancel }) {
  const [formData, setFormData] = useState({ title: "", content: "" });
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (editingNote) {
      setFormData({
        title: editingNote.title || "",
        content: editingNote.content || "",
      });
    } else {
      setFormData({ title: "", content: "" });
    }
    setErrors({});
  }, [editingNote]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await noteSchema.validate(formData, { abortEarly: false });
      setErrors({});
      onSubmit(formData);
      setFormData({ title: "", content: "" });
    } catch (err) {
      const validationErrors = {};
      err.inner.forEach((error) => {
        validationErrors[error.path] = error.message;
      });
      setErrors(validationErrors);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white dark:bg-slate-900 border border-slate-200 dark:border-slate-800 rounded-2xl p-5 mb-8 shadow-sm transition-all"
    >
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-sm font-semibold text-slate-800 dark:text-slate-200 uppercase tracking-wider">
          {editingNote ? "Chỉnh sửa ghi chú" : "Thêm ghi chú mới"}
        </h3>
        {editingNote && (
          <span className="text-xs bg-amber-50 dark:bg-amber-950/40 text-amber-600 dark:text-amber-400 px-2 py-1 rounded-md font-medium">
            Đang sửa ID: {editingNote.id}
          </span>
        )}
      </div>

      <div className="space-y-3.5">
        <div>
          <input
            type="text"
            placeholder="Tiêu đề ghi chú..."
            value={formData.title}
            onChange={(e) =>
              setFormData({ ...formData, title: e.target.value })
            }
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-slate-50/50 dark:bg-slate-950 dark:text-white transition focus:outline-none focus:ring-2 ${
              errors.title
                ? "border-red-400 focus:ring-red-500/20"
                : "border-slate-200 dark:border-slate-800 focus:ring-blue-500/20 focus:border-blue-500"
            }`}
          />
          {errors.title && (
            <p className="text-xs text-red-500 mt-1 font-medium">
              {errors.title}
            </p>
          )}
        </div>

        <div>
          <textarea
            placeholder="Nội dung ghi chú..."
            rows={3}
            value={formData.content}
            onChange={(e) =>
              setFormData({ ...formData, content: e.target.value })
            }
            className={`w-full px-3.5 py-2.5 rounded-xl border text-sm bg-slate-50/50 dark:bg-slate-950 dark:text-white transition focus:outline-none focus:ring-2 resize-none ${
              errors.content
                ? "border-red-400 focus:ring-red-500/20"
                : "border-slate-200 dark:border-slate-800 focus:ring-blue-500/20 focus:border-blue-500"
            }`}
          />
          {errors.content && (
            <p className="text-xs text-red-500 mt-1 font-medium">
              {errors.content}
            </p>
          )}
        </div>
      </div>

      <div className="flex items-center gap-2 mt-4">
        <button
          type="submit"
          className="flex items-center gap-1.5 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-xl text-sm font-medium transition shadow-sm shadow-blue-500/20"
        >
          {editingNote ? (
            <Check className="w-4 h-4" />
          ) : (
            <Plus className="w-4 h-4" />
          )}
          <span>{editingNote ? "Cập nhật" : "Lưu lại"}</span>
        </button>

        {editingNote && (
          <button
            type="button"
            onClick={onCancel}
            className="flex items-center gap-1.5 px-4 py-2 border border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-600 dark:text-slate-300 rounded-xl text-sm font-medium transition"
          >
            <X className="w-4 h-4" />
            <span>Hủy</span>
          </button>
        )}
      </div>
    </form>
  );
}
