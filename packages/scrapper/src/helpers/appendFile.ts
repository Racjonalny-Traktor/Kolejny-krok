import fs from 'fs';

export const apendToFile = async ({
  fileName,
  dataToAppend,
}: {
  fileName: string;
  dataToAppend: string;
}): Promise<void> => {
  return new Promise((resolve, reject) => {
    fs.appendFile(fileName, dataToAppend, (err) => {
      if (err) {
        console.error('Error appending to file:', err);
      } else {
        console.log('Successfully appended to file');
      }
    });
  });
};
