'use client';

import React, { useRef, useState, useCallback } from 'react';
import { Upload, X, Loader2, ImageIcon } from 'lucide-react';

interface ImageUploaderProps {
  value: string;
  onChange: (url: string) => void;
  label?: string;
  /** Extra Tailwind classes for the outer wrapper */
  className?: string;
}

export default function ImageUploader({ value, onChange, label, className = '' }: ImageUploaderProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [uploading, setUploading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [dragging, setDragging] = useState(false);

  const handleFile = useCallback(
    async (file: File) => {
      setError(null);
      setUploading(true);
      try {
        const formData = new FormData();
        formData.append('file', file);
        const res = await fetch('/api/upload', { method: 'POST', body: formData });
        const data = await res.json();
        if (!res.ok || !data.success) throw new Error(data.error ?? 'Upload failed');
        onChange(data.url as string);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Upload failed');
      } finally {
        setUploading(false);
      }
    },
    [onChange]
  );

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) handleFile(file);
    // reset so same file can be re-picked
    e.target.value = '';
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setDragging(false);
    const file = e.dataTransfer.files[0];
    if (file) handleFile(file);
  };

  const handleDragOver = (e: React.DragEvent) => { e.preventDefault(); setDragging(true); };
  const handleDragLeave = () => setDragging(false);

  return (
    <div className={`space-y-2 ${className}`}>
      {label && (
        <label className="text-xs font-semibold text-[#8A8A8F] block">{label}</label>
      )}

      {/* Drop zone / upload button row */}
      <div
        onDrop={handleDrop}
        onDragOver={handleDragOver}
        onDragLeave={handleDragLeave}
        className={`relative flex items-center gap-3 rounded-xl border-2 border-dashed px-4 py-3 transition-colors cursor-pointer
          ${dragging ? 'border-[#111113] bg-[#F5F5F7]' : 'border-[#D8D8DC] bg-white hover:border-[#BBBBBF]'}`}
        onClick={() => inputRef.current?.click()}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') inputRef.current?.click(); }}
        aria-label={label ? `Upload ${label}` : 'Upload image'}
      >
        <input
          ref={inputRef}
          type="file"
          accept="image/*"
          className="hidden"
          onChange={handleInputChange}
        />

        {/* Thumbnail */}
        <div className="w-14 h-14 rounded-lg overflow-hidden bg-[#F0F0F4] border border-[#E6E6EA] flex-shrink-0 flex items-center justify-center">
          {value ? (
            // eslint-disable-next-line @next/next/no-img-element
            <img src={value} alt="preview" className="w-full h-full object-cover" />
          ) : (
            <ImageIcon className="w-6 h-6 text-[#BBBBBF]" />
          )}
        </div>

        {/* Text cue */}
        <div className="flex-1 min-w-0">
          {uploading ? (
            <span className="flex items-center gap-2 text-xs text-[#8A8A8F]">
              <Loader2 className="w-4 h-4 animate-spin" />
              Uploading…
            </span>
          ) : (
            <>
              <p className="text-xs font-semibold text-[#111113]">
                {value ? 'Replace image' : 'Upload image'}
              </p>
              <p className="text-[11px] text-[#8A8A8F]">
                Tap to browse · drag &amp; drop · JPG PNG WebP · max 20 MB
              </p>
            </>
          )}
        </div>

        {/* Upload icon */}
        <Upload className="w-5 h-5 text-[#8A8A8F] flex-shrink-0" />
      </div>

      {/* Error message */}
      {error && (
        <p className="text-[11px] text-red-500 flex items-center gap-1">
          <X className="w-3 h-3" />
          {error}
        </p>
      )}

      {/* Manual URL fallback */}
      <div>
        <label className="text-[11px] text-[#BBBBBF] block mb-1">Or paste a URL directly</label>
        <input
          type="url"
          value={value}
          onChange={(e) => { setError(null); onChange(e.target.value); }}
          placeholder="https://…"
          className="w-full h-9 px-3 rounded-xl bg-[#F5F5F7] border border-[#E6E6EA] text-xs outline-none placeholder:text-[#BBBBBF]"
        />
      </div>
    </div>
  );
}
