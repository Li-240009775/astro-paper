import { readFile } from "node:fs/promises";
import { join } from "node:path";

function toArrayBuffer(buf: Buffer): ArrayBuffer {
  return buf.buffer.slice(
    buf.byteOffset,
    buf.byteOffset + buf.byteLength
  ) as ArrayBuffer;
}

export async function getOgImageFonts() {
  const root = process.cwd();
  const [regularData, boldData] = await Promise.all([
    readFile(join(root, "src/assets/fonts/DejaVuSans.ttf")),
    readFile(join(root, "src/assets/fonts/DejaVuSans-Bold.ttf")),
  ]);

  return [
    {
      name: "DejaVu Sans",
      data: toArrayBuffer(regularData),
      weight: 400 as const,
      style: "normal" as const,
    },
    {
      name: "DejaVu Sans",
      data: toArrayBuffer(boldData),
      weight: 700 as const,
      style: "normal" as const,
    },
  ];
}
