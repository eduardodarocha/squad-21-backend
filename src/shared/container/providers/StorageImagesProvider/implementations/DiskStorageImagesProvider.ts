import fs from 'fs';
import path from 'path';
import imagesUpload from '@config/projectsUpload';
import IStorageImagesProvider from '../models/IStorageImagesProvider';

export default class DiskStorageAvatarProvider
  implements IStorageImagesProvider
{
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(imagesUpload.tmpFolder, file),
      path.resolve(imagesUpload.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(imagesUpload.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
