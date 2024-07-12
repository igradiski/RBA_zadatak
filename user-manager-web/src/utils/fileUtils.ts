import { CustomFile } from "../types/CustomFile";

export const file2Base64 = (file: File): Promise<string> => {
  return new Promise<string>((resolve, reject) => {
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => resolve(reader.result?.toString() || "");
    reader.onerror = (error) => reject(error);
  });
};

export const parseBase64 = (base64: string): string => {
  return base64.includes(",") ? base64.split(",")[1] : base64;
};

export const base64ToFile = (
  base64: string,
  fileName: string,
  fileType: string,
  id?: string
): CustomFile => {
  const byteCharacters = atob(base64);
  const byteNumbers = new Array(byteCharacters.length);

  for (let i = 0; i < byteCharacters.length; i++) {
    byteNumbers[i] = byteCharacters.charCodeAt(i);
  }

  const byteArray = new Uint8Array(byteNumbers);
  const blob = new Blob([byteArray], { type: fileType });

  return createCustomFile([blob], fileName, { type: fileType }, id);
};

export const createCustomFile = (
  blobParts: BlobPart[],
  fileName: string,
  options?: FilePropertyBag,
  id?: string
): CustomFile => {
  const blob = new Blob(blobParts, options);
  const date = new Date();

  return Object.assign(blob, {
    lastModified: date.getTime(),
    name: fileName,
    id: id,
  }) as CustomFile;
};
