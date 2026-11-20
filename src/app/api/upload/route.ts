import { NextRequest, NextResponse } from 'next/server';
import { writeFile, mkdir } from 'fs/promises';
import path from 'path';

// Optional Cloudinary integration
function getCloudinary() {
  const cloudName = process.env.CLOUDINARY_CLOUD_NAME;
  const apiKey = process.env.CLOUDINARY_API_KEY;
  const apiSecret = process.env.CLOUDINARY_API_SECRET;

  if (cloudName && apiKey && apiSecret) {
    // eslint-disable-next-line @typescript-eslint/no-require-imports
    const cloudinary = require('cloudinary').v2;
    cloudinary.config({
      cloud_name: cloudName,
      api_key: apiKey,
      api_secret: apiSecret,
      secure: true,
    });
    return cloudinary;
  }
  return null;
}

export async function POST(req: NextRequest) {
  try {
    const formData = await req.formData();
    const file = formData.get('file') as File | null;

    if (!file) {
      return NextResponse.json({ error: 'No image file uploaded' }, { status: 400 });
    }

    // Validate mime type
    const validTypes = ['image/jpeg', 'image/png', 'image/webp', 'image/avif', 'image/jpg', 'image/gif'];
    if (!validTypes.includes(file.type.toLowerCase())) {
      return NextResponse.json(
        { error: 'Invalid file format. Please upload JPG, PNG, WebP, or AVIF.' },
        { status: 400 }
      );
    }

    // Limit to 20MB
    const maxBytes = 20 * 1024 * 1024;
    if (file.size > maxBytes) {
      return NextResponse.json(
        { error: 'File size exceeds 20MB limit.' },
        { status: 400 }
      );
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    // 1. Try Cloudinary if configured
    const cloudinary = getCloudinary();
    if (cloudinary) {
      const uploadResult = await new Promise<{ secure_url: string; public_id: string }>(
        (resolve, reject) => {
          const uploadStream = cloudinary.uploader.upload_stream(
            {
              folder: 'tracey-kq/atelier',
              resource_type: 'image',
              transformation: [{ quality: 'auto', fetch_format: 'auto' }],
            },
            (err: unknown, result: { secure_url: string; public_id: string }) => {
              if (err) reject(err);
              else resolve(result);
            }
          );
          uploadStream.end(buffer);
        }
      );

      return NextResponse.json({
        success: true,
        url: uploadResult.secure_url,
        provider: 'cloudinary',
        filename: file.name,
      });
    }

    // 2. Local fallback storage into public/uploads
    const uploadDir = path.join(process.cwd(), 'public', 'uploads');
    await mkdir(uploadDir, { recursive: true });

    const safeName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const uniqueFileName = `${Date.now()}-${Math.random().toString(36).substring(2, 8)}-${safeName}`;
    const filePath = path.join(uploadDir, uniqueFileName);

    await writeFile(filePath, buffer);

    const publicUrl = `/uploads/${uniqueFileName}`;

    return NextResponse.json({
      success: true,
      url: publicUrl,
      provider: 'local',
      filename: uniqueFileName,
    });
  } catch (error: unknown) {
    console.error('Image upload error:', error);
    const message = error instanceof Error ? error.message : 'Upload failed';
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
