import { NextResponse } from "next/server";
import { put, list } from '@vercel/blob';

export async function POST(req: Request) {
  try {
    const data = await req.formData();
    const file = data.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file provided" }, { status: 400 });
    }

    // Subir a Vercel Blob
    const { url } = await put(file.name, file, {
      access: 'public',
    });

    return NextResponse.json({ 
      message: "File uploaded successfully", 
      fileName: file.name,
      url: url 
    });
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error uploading file" }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const url = new URL(req.url);
    const fileName = url.searchParams.get('file') || url.pathname.split("/").pop(); 

    if (!fileName || fileName === "api") {
      const { blobs } = await list();
      return NextResponse.json({ files: blobs });
    }

    const { blobs } = await list({ prefix: fileName });
    
    if (blobs.length === 0) {
      return NextResponse.json({ error: "File not found" }, { status: 404 });
    }
    
    return NextResponse.redirect(blobs[0].url);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Error retrieving file" }, { status: 500 });
  }
}