const fs = require("node:fs/promises");
const path = require("node:path");
const pico = require("picocolors");
const folder = process.argv[2] ?? ".";

async function ls(folder) {
  let files;
  try {
    files = await fs.readdir(folder);
  } catch (error) {
    console.error(pico.red(`💔 No se pudo leer el directorio ${folder}`));
    process.exit(1);
  }

  const filePromises = files.map(async (file) => {
    const filePath = path.join(folder, file);

    let stats;

    try {
      stats = await fs.stat(filePath);
    } catch {
      console.error(pico.red(`💔 No se puede leer el archivo ${filepath}`));
      process.exit(1);
    }

    const isDirectory = stats.isDirectory();
    const fileType = isDirectory ? "📂" : "file";
    const fileSize = stats.size;
    const fileModified = stats.mtime.toLocaleString();

    return `${fileType} ${file.padEnd(20)} ${fileSize
      .toString()
      .padStart(10)} ${fileModified}`;
  });

  const fileInfo = await Promise.all(filePromises);

  fileInfo.forEach((fileInfo) => console.log(fileInfo));
}
ls(folder);
// comado :  node 9ls-advanced.js '' o '../cjs' escribir el fichero que queremos listar
