"use server";

import { cloudinary } from "@/app/api/download/[fileName]/route"; 
import { ALLOWED_TYPES, MAX_FILE_SIZE } from "@/app/constants";
import { isAllowedMimeType, sanitizeFileName } from "@/app/utils";

type UploadResult = {
  success: boolean;
  message: string;
  fileName?: string;
};

const upload = async (formData: FormData): Promise<UploadResult> => {
  try {
    const file = formData.get("file") as File;

    if (!file) {
      return { success: false, message: "No file uploaded" };
    }

    if (!isAllowedMimeType(file.type)) {
      return {
        success: false,
        message: `File type not allowed. Allowed types: ${Object.keys(
          ALLOWED_TYPES
        ).join(", ")}`,
      };
    }

    if (file.size > MAX_FILE_SIZE) {
      return {
        success: false,
        message: `File size too large. Maximum size: ${
          MAX_FILE_SIZE / (1024 * 1024)
        }MB`,
      };
    }

    // Subir el archivo a Cloudinary
    const result = await new Promise<any>(async (resolve, reject) => {
      cloudinary.uploader.upload_stream(
        { resource_type: "auto" }, // Permite manejar imágenes, video, audio, etc.
        (error, result) => {
          if (error) {
            reject(error);
          } else {
            resolve(result);
          }
        }
      ).end(Buffer.from(await file.arrayBuffer()));
    });

    return {
      success: true,
      message: "File uploaded successfully",
      fileName: result.public_id, // Usamos el public_id de Cloudinary
    };
  } catch (error) {
    return {
      success: false,
      message:
        error instanceof Error ? error.message : "Unknown error occurred",
    };
  }
};

const deleteFile = async (fileName: string) => {
  try {
    // Usamos el public_id de Cloudinary para eliminar el archivo
    await cloudinary.uploader.destroy(fileName); // fileName debe ser el public_id de Cloudinary
  } catch (error) {
    console.error("Delete error:", error);
  }
};

export { upload, deleteFile };
