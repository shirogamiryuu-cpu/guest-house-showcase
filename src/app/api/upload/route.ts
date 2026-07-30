import { NextResponse } from "next/server"
import { createClient } from "@supabase/supabase-js"
import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3"

export const runtime = "nodejs"

const MAX_BYTES = 10 * 1024 * 1024
const ALLOWED = ["image/png", "image/jpeg", "image/webp", "image/gif", "image/avif", "image/svg+xml"]

function r2Config() {
  const accountId = process.env.R2_ACCOUNT_ID
  const accessKeyId = process.env.R2_ACCESS_KEY_ID
  const secretAccessKey = process.env.R2_SECRET_ACCESS_KEY
  const bucket = process.env.R2_BUCKET
  const publicBase = process.env.R2_PUBLIC_BASE_URL
  const endpoint =
    process.env.R2_ENDPOINT ?? (accountId ? `https://${accountId}.r2.cloudflarestorage.com` : undefined)
  if (!accessKeyId || !secretAccessKey || !bucket || !endpoint || !publicBase) return null
  return { accessKeyId, secretAccessKey, bucket, endpoint, publicBase }
}

export async function POST(request: Request) {
  const cfg = r2Config()
  if (!cfg) {
    return NextResponse.json(
      { error: "Image storage is not configured yet. Add the Cloudflare R2 credentials." },
      { status: 503 },
    )
  }

  // Only admins may upload.
  const authHeader = request.headers.get("authorization") ?? ""
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL as string,
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY as string,
    { auth: { persistSession: false }, global: { headers: { Authorization: authHeader } } },
  )
  const { data: userData } = await supabase.auth.getUser()
  if (!userData?.user) return NextResponse.json({ error: "Unauthorized" }, { status: 401 })
  const { data: isAdmin } = await supabase.rpc("has_role", {
    _user_id: userData.user.id,
    _role: "admin",
  })
  if (!isAdmin) return NextResponse.json({ error: "Forbidden" }, { status: 403 })

  const form = await request.formData()
  const file = form.get("file")
  if (!(file instanceof File)) return NextResponse.json({ error: "No file provided" }, { status: 400 })
  if (file.size > MAX_BYTES) return NextResponse.json({ error: "File is larger than 10MB" }, { status: 400 })
  if (!ALLOWED.includes(file.type)) return NextResponse.json({ error: "Unsupported image type" }, { status: 400 })

  const ext = (file.name.split(".").pop() ?? "bin").toLowerCase().replace(/[^a-z0-9]/g, "")
  const key = `uploads/${Date.now()}-${crypto.randomUUID()}.${ext}`

  const client = new S3Client({
    region: "auto",
    endpoint: cfg.endpoint,
    credentials: { accessKeyId: cfg.accessKeyId, secretAccessKey: cfg.secretAccessKey },
  })

  try {
    await client.send(
      new PutObjectCommand({
        Bucket: cfg.bucket,
        Key: key,
        Body: Buffer.from(await file.arrayBuffer()),
        ContentType: file.type,
        CacheControl: "public, max-age=31536000, immutable",
      }),
    )
  } catch {
    return NextResponse.json({ error: "Upload failed. Check the storage credentials." }, { status: 502 })
  }

  const url = `${cfg.publicBase.replace(/\/$/, "")}/${key}`
  return NextResponse.json({ url })
}
