import * as React from "react";

import { cn } from "@/lib/utils";
import { Upload } from "lucide-react";

const Input = React.forwardRef<HTMLInputElement, React.ComponentProps<"input">>(
  ({ className, type, ...props }, ref) => {
    return (
      <input
        type={type}
        className={cn(
          "flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-base shadow-sm transition-colors file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring disabled:cursor-not-allowed disabled:opacity-50 md:text-sm",
          className,
        )}
        ref={ref}
        {...props}
      />
    );
  },
);
Input.displayName = "Input";

const ImageInput = React.forwardRef<
  HTMLDivElement,
  Omit<React.ComponentProps<"div">, "value"> & {
    accept?: string;
    value?: File | null;
    onUpload: (file: File) => void;
  }
>(({ className, accept, value, onUpload,  }, ) => {
  const [isDraggedInside, setIsDraggedInside] = React.useState<boolean>(false);
  const [previewUrl, setPreviewUrl] = React.useState<string | null>(null);

  const handleDragEnter = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("DRAG ENTER");
    setIsDraggedInside(true);
  };

  const handleDragLeave = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("DRAG LEAVE");
    setIsDraggedInside(false);
  };

  const handleDragOver = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("DRAG OVER");
    setIsDraggedInside(true);
  };

  const handleDrop = (e: React.DragEvent<HTMLDivElement>) => {
    e.preventDefault();
    e.stopPropagation();
    // console.log("DRAG DROP");
    setIsDraggedInside(false);

    const file = e.dataTransfer?.files[0];
    if (!file) {
      return;
    }
    if (accept) {
      const acceptedTypes = accept.split(",");
      const isAccepted = acceptedTypes.some((type) => file.type.match(type));
      if (!isAccepted) {
        return;
      }
    }
    onUpload(file)
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const target = e.target;
    const file = target.files?.[0];
    // console.log("FILE CHANGE", file, "TYPE : ", typeof file);
    if (!file) {
      // setPreviewUrl(null);
      return;
    }
    onUpload(file)
  };

  React.useEffect(() => {
    if (!value) {
      setPreviewUrl(null);
      return;
    }
    const reader = new FileReader();
    reader.onload = (e: ProgressEvent<FileReader>) => {
      setPreviewUrl(e.target?.result as string);
    };
    reader.readAsDataURL(value);
  }, [value])


  return (
    <div
      className={cn(
        className,
        "flex w-full border border-input rounded cursor-pointer",
        isDraggedInside ? "border-dashed border-primary" : "",
        previewUrl ? "h-auto" : "h-32",
      )}
      onDragEnter={handleDragEnter}
      onDragLeave={handleDragLeave}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      <label className="flex flex-col items-center justify-center w-full cursor-pointer">
        {previewUrl ? (
          <div>
            <img
              src={previewUrl}
              alt="Preview"
              className="h-full w-full object-cover"
            />
          </div>
        ) : (
          <>
            <div className="flex flex-col items-center justify-center gap-2 ">
              <Upload />
            </div>
            <span className="text-muted-foreground text-center">
              {isDraggedInside
                ? "Drop file di sini"
                : "Tarik dan lepas file di sini atau klik untuk mengupload"}
            </span>
          </>
        )}
        <input
          type="file"
          className="hidden w-full h-full"
          accept={accept}
          // ref={ref}
          // {...props}
          onChange={handleFileChange}
        />
      </label>
    </div>
  );
});
ImageInput.displayName = "ImageInput";

export { Input, ImageInput };
