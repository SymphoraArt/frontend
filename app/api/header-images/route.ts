import { NextResponse } from "next/server";
import fs from "fs";
import path from "path";

// Always re-read the folder on each request so newly dropped files show up
// without a rebuild.
export const dynamic = "force-dynamic";

// Detect images by their CONTENT (magic bytes) instead of the file extension,
// so files with random names and any (or no) extension still load.
function looksLikeImage(buf: Buffer): boolean {
  if (buf.length < 12) return false;
  // JPEG  FF D8 FF
  if (buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return true;
  // PNG   89 50 4E 47
  if (buf[0] === 0x89 && buf[1] === 0x50 && buf[2] === 0x4e && buf[3] === 0x47) return true;
  // GIF   47 49 46
  if (buf[0] === 0x47 && buf[1] === 0x49 && buf[2] === 0x46) return true;
  // BMP   42 4D
  if (buf[0] === 0x42 && buf[1] === 0x4d) return true;
  // WEBP  "RIFF"...."WEBP"
  if (buf.toString("ascii", 0, 4) === "RIFF" && buf.toString("ascii", 8, 12) === "WEBP") return true;
  // AVIF / HEIC  ....ftyp
  if (buf.toString("ascii", 4, 8) === "ftyp") return true;
  return false;
}

// Lists every image inside /public/header (by content sniffing). Drop files in
// that folder and the landing-page header mosaic picks them up automatically.
export async function GET() {
  try {
    const dir = path.join(process.cwd(), "public", "header");
    if (!fs.existsSync(dir)) return NextResponse.json([]);

    const out: string[] = [];
    for (const name of fs.readdirSync(dir)) {
      if (name.startsWith(".")) continue; // skip dotfiles
      const full = path.join(dir, name);

      let stat: fs.Stats;
      try {
        stat = fs.statSync(full);
      } catch {
        continue;
      }
      if (!stat.isFile()) continue;

      const head = Buffer.alloc(16);
      let fd: number | null = null;
      try {
        fd = fs.openSync(full, "r");
        fs.readSync(fd, head, 0, 16, 0);
      } catch {
        continue;
      } finally {
        if (fd !== null) {
          try {
            fs.closeSync(fd);
          } catch {
            /* ignore */
          }
        }
      }

      if (looksLikeImage(head)) {
        out.push(`/header/${encodeURIComponent(name)}`);
      }
    }

    return NextResponse.json(out);
  } catch (e) {
    console.error("[/api/header-images] error:", e);
    return NextResponse.json([]);
  }
}
