import fs from 'node:fs/promises';

async function getFiles(): Promise<string[]> {
  // return list of files in the ToShare folder
  try {
    const files = await fs.readdir('./ToShare');
    return files;
  } catch (error) {
    throw new Error(`some thing wring with getFiles:  ${error}`);
  }
}

export default { getFiles };
