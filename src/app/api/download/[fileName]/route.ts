import { v2 as cloudinary } from "cloudinary";
import { NextResponse } from "next/server";

// Configuración de Cloudinary
cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
});

interface CloudinaryUploadResult {
  secure_url: string;
  public_id: string;
}

export async function POST(req: Request) {
  try {
    // Obtener los datos del formulario
    const data = await req.formData();
    const file = data.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Convertir el archivo a un buffer para la carga
    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    // Subir a Cloudinary
    const result = await new Promise<CloudinaryUploadResult>((resolve, reject) => {
      cloudinary.uploader.upload_stream({}, (error, result) => {
        if (error) reject(error);
        else resolve(result as CloudinaryUploadResult);  
      }).end(buffer);
    });

    // Responder con el URL del archivo cargado
    return NextResponse.json({ message: "File uploaded successfully", url: result.secure_url });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error uploading file" }, { status: 500 });
  }
}
