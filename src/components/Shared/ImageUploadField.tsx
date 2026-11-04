"use client";

import { useState, useRef, useEffect } from "react";
import {
  UploadCloud,
  Link2,
  CheckCircle2,
  Loader2,
  X,
  Image as ImageIcon,
  Sparkles,
} from "lucide-react";
import toast from "react-hot-toast";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

interface ImageUploadFieldProps {
  name?: string;
  label?: string;
  defaultValue?: string;
  required?: boolean;
  placeholder?: string;
  helperText?: string;
  className?: string;
}

export default function ImageUploadField({
  name = "image",
  label = "Cover Image",
  defaultValue = "",
  required = false,
  placeholder = "https://images.unsplash.com/... or upload a file",
  helperText,
  className = "",
}: ImageUploadFieldProps) {
  const [mode, setMode] = useState<"upload" | "url">("upload");
  const [imageUrl, setImageUrl] = useState<string>(defaultValue);
  const [preview, setPreview] = useState<string>(defaultValue);
  const [isUploading, setIsUploading] = useState<boolean>(false);
  const [isDragOver, setIsDragOver] = useState<boolean>(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (defaultValue) {
      setImageUrl(defaultValue);
      setPreview(defaultValue);
    }
  }, [defaultValue]);

  const uploadToImgBB = async (file: File) => {
    if (!file.type.startsWith("image/")) {
      toast.error("Please upload a valid image file (PNG, JPG, WEBP, GIF)");
      return;
    }

    if (file.size > 32 * 1024 * 1024) {
      toast.error("Image file size exceeds 32MB limit");
      return;
    }

    const localUrl = URL.createObjectURL(file);
    setPreview(localUrl);
    setIsUploading(true);

    try {
      const apiKey =
        process.env.NEXT_PUBLIC_IMGBB_API_KEY ||
        "f678e604d546047549ca4cc2f2a651b0";

      const formData = new FormData();
      formData.append("image", file);

      const response = await fetch(
        `https://api.imgbb.com/1/upload?key=${apiKey}`,
        {
          method: "POST",
          body: formData,
        }
      );

      const resData = await response.json();

      if (resData.success && resData.data?.url) {
        const remoteUrl = resData.data.display_url || resData.data.url;
        setImageUrl(remoteUrl);
        setPreview(remoteUrl);
        toast.success("Image uploaded to ImgBB cloud successfully!");
      } else {
        toast.error(resData.error?.message || "Failed to upload to ImgBB");
        if (!imageUrl) setPreview("");
      }
    } catch {
      toast.error(
        "Upload failed. Check your internet connection or paste an image URL directly."
      );
      if (!imageUrl) setPreview("");
    } finally {
      setIsUploading(false);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      uploadToImgBB(file);
    }
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    setIsDragOver(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      uploadToImgBB(file);
    }
  };

  const handleClear = () => {
    setImageUrl("");
    setPreview("");
    if (fileInputRef.current) {
      fileInputRef.current.value = "";
    }
  };

  return (
    <div className={`flex flex-col gap-2 ${className}`}>
      <div className="flex items-center justify-between">
        <label
          htmlFor={name}
          className="text-xs font-semibold text-text-secondary uppercase tracking-wider flex items-center gap-1.5"
        >
          <span>{label}</span>
          {required && <span className="text-brand-orange">*</span>}
        </label>

        <div className="inline-flex items-center rounded-lg bg-surface-2 p-0.5 border border-border-subtle text-[11px] font-mono">
          <button
            type="button"
            onClick={() => setMode("upload")}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              mode === "upload"
                ? "bg-brand-orange text-white font-bold shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <UploadCloud className="w-3 h-3" />
            <span>Upload File</span>
          </button>
          <button
            type="button"
            onClick={() => setMode("url")}
            className={`px-2.5 py-1 rounded-md transition-all cursor-pointer flex items-center gap-1 ${
              mode === "url"
                ? "bg-brand-orange text-white font-bold shadow-sm"
                : "text-text-muted hover:text-text-primary"
            }`}
          >
            <Link2 className="w-3 h-3" />
            <span>Paste URL</span>
          </button>
        </div>
      </div>

      <input type="hidden" name={name} value={imageUrl} required={required} />

      {mode === "upload" ? (
        <div
          onDragOver={(e) => {
            e.preventDefault();
            setIsDragOver(true);
          }}
          onDragLeave={() => setIsDragOver(false)}
          onDrop={handleDrop}
          onClick={() => !isUploading && fileInputRef.current?.click()}
          className={`relative border-2 border-dashed rounded-2xl p-4 sm:p-5 flex flex-col items-center justify-center text-center cursor-pointer transition-all ${
            isDragOver
              ? "border-brand-orange bg-brand-orange/10 scale-[0.99]"
              : preview
              ? "border-border-subtle bg-surface-1 hover:border-brand-orange/40"
              : "border-border-subtle/80 bg-film-black hover:border-brand-orange/50 hover:bg-surface-1/50"
          }`}
        >
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            className="hidden"
          />

          {isUploading ? (
            <div className="py-4 flex flex-col items-center gap-2.5">
              <div className="w-10 h-10 rounded-full bg-brand-orange/15 border border-brand-orange/30 flex items-center justify-center text-brand-orange">
                <Loader2 className="w-5 h-5 animate-spin" />
              </div>
              <div className="flex flex-col items-center">
                <span className="text-xs font-mono font-bold text-text-primary">
                  Uploading to ImgBB Cloud...
                </span>
                <span className="text-[10px] font-mono text-text-muted">
                  Generating permanent CDN media URL
                </span>
              </div>
            </div>
          ) : preview ? (
            <div className="w-full flex flex-col sm:flex-row items-center gap-4">
              <div className="relative w-28 h-20 sm:w-36 sm:h-24 rounded-xl overflow-hidden bg-surface-2 border border-border-subtle shrink-0">
                <img
                  src={preview}
                  alt="Upload preview"
                  className="w-full h-full object-cover"
                />
              </div>

              <div className="flex-1 text-left min-w-0">
                <div className="flex items-center gap-2 mb-1">
                  <Badge
                    variant="outline"
                    className="h-auto bg-emerald-500/10 border-emerald-500/20 text-emerald-400 font-mono text-[10px] font-bold uppercase tracking-wider py-0.5 px-2"
                  >
                    <CheckCircle2 className="w-3 h-3 mr-1" />
                    <span>Hosted on ImgBB</span>
                  </Badge>
                </div>
                <p className="text-xs font-mono text-text-muted truncate max-w-full">
                  {imageUrl || "Temporary local preview"}
                </p>
                <p className="text-[11px] text-text-secondary mt-1">
                  Click or drag to replace image
                </p>
              </div>

              <Button
                type="button"
                variant="ghost"
                size="icon"
                onClick={(e) => {
                  e.stopPropagation();
                  handleClear();
                }}
                className="w-8 h-8 rounded-full bg-surface-2 hover:bg-rose-500/20 text-text-muted hover:text-rose-400 transition-colors shrink-0"
                title="Remove image"
              >
                <X className="w-4 h-4" />
              </Button>
            </div>
          ) : (
            <div className="py-3 flex flex-col items-center gap-2">
              <div className="w-10 h-10 rounded-2xl bg-surface-2 border border-border-subtle flex items-center justify-center text-brand-orange shadow-inner">
                <UploadCloud className="w-5 h-5" />
              </div>
              <div>
                <p className="text-xs font-semibold text-text-primary">
                  Click to upload or drag & drop image
                </p>
                <p className="text-[10px] font-mono text-text-muted mt-0.5">
                  PNG, JPG, WEBP, GIF up to 32MB (auto-hosted to ImgBB CDN)
                </p>
              </div>
            </div>
          )}
        </div>
      ) : (
        <div className="flex flex-col gap-2">
          <div className="relative flex items-center">
            <ImageIcon className="w-4 h-4 text-text-muted absolute left-3 pointer-events-none" />
            <Input
              type="url"
              value={imageUrl}
              onChange={(e) => {
                const val = e.target.value;
                setImageUrl(val);
                setPreview(val);
              }}
              placeholder={placeholder}
              className="bg-film-black border-border-subtle text-text-primary text-xs pl-9 pr-9 py-2.5 rounded-xl placeholder:text-text-muted focus-visible:border-brand-orange focus-visible:ring-0 h-auto"
            />
            {imageUrl && (
              <button
                type="button"
                onClick={handleClear}
                className="absolute right-3 text-text-muted hover:text-text-primary cursor-pointer"
              >
                <X className="w-3.5 h-3.5" />
              </button>
            )}
          </div>

          {preview && (
            <div className="flex items-center gap-3 p-2 rounded-xl bg-surface-1 border border-border-subtle">
              <div className="relative w-14 h-10 rounded-lg overflow-hidden bg-surface-2 border border-border-subtle shrink-0">
                <img
                  src={preview}
                  alt="URL Preview"
                  className="w-full h-full object-cover"
                  onError={() => setPreview("")}
                />
              </div>
              <div className="min-w-0 flex-1">
                <span className="text-[11px] font-mono text-text-muted truncate block">
                  {imageUrl}
                </span>
                <span className="text-[10px] text-emerald-400 font-mono">
                  ● Direct link preview active
                </span>
              </div>
            </div>
          )}
        </div>
      )}

      {helperText && (
        <span className="text-[11px] font-mono text-text-muted">
          {helperText}
        </span>
      )}
    </div>
  );
}
