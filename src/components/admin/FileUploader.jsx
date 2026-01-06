import React, { useState, useRef } from 'react';
import { Upload, Loader2 } from 'lucide-react';
import { base44 } from '@/api/base44Client';
import { toast } from 'sonner';

export default function FileUploader({ onUpload, accept = "image/*", label = "לחץ או גרור קובץ לכאן" }) {
  const [isUploading, setIsUploading] = useState(false);
  const inputRef = useRef(null);

  const handleFile = async (file) => {
    if (!file) return;
    
    setIsUploading(true);
    try {
      const { file_url } = await base44.integrations.Core.UploadFile({ file });
      onUpload(file_url);
      toast.success('הקובץ הועלה בהצלחה');
    } catch (error) {
      console.error('Upload failed:', error);
      toast.error('שגיאה בהעלאת הקובץ');
    } finally {
      setIsUploading(false);
    }
  };

  const handleDrop = (e) => {
    e.preventDefault();
    if (e.dataTransfer.files?.[0]) {
      handleFile(e.dataTransfer.files[0]);
    }
  };

  return (
    <div 
      className="border-2 border-dashed border-slate-300 rounded-lg p-6 text-center hover:bg-slate-50 transition-colors cursor-pointer"
      onDragOver={(e) => e.preventDefault()}
      onDrop={handleDrop}
      onClick={() => inputRef.current?.click()}
    >
      <input 
        type="file" 
        className="hidden" 
        ref={inputRef} 
        accept={accept} 
        onChange={(e) => handleFile(e.target.files?.[0])}
      />
      {isUploading ? (
        <div className="flex flex-col items-center gap-2">
          <Loader2 className="w-8 h-8 animate-spin text-slate-400" />
          <span className="text-sm text-slate-500">מעלה...</span>
        </div>
      ) : (
        <div className="flex flex-col items-center gap-2">
          <Upload className="w-8 h-8 text-slate-400" />
          <span className="text-sm text-slate-600 font-medium">{label}</span>
        </div>
      )}
    </div>
  );
}