import fs from 'node:fs';

export const writeFile = (filePath: string, data: string) =>
  fs.writeFile(filePath, data, (err) => {
    if (err) {
      console.error(err);
      return process.exit();
    }

    return console.log('success');
  });
