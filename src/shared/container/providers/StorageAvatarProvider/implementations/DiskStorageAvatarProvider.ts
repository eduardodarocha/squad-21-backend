import fs from 'fs';
import path from 'path';
import avatarUpload from '@config/avatarUpload';
import IStorageAvatarProvider from '../models/IStorageAvatarProvider';

export default class DiskStorageAvatarProvider
  implements IStorageAvatarProvider
{
  public async saveFile(file: string): Promise<string> {
    await fs.promises.rename(
      path.resolve(avatarUpload.tmpFolder, file),
      path.resolve(avatarUpload.uploadsFolder, file),
    );

    return file;
  }

  public async deleteFile(file: string): Promise<void> {
    const filePath = path.resolve(avatarUpload.uploadsFolder, file);

    try {
      await fs.promises.stat(filePath);
    } catch {
      return;
    }

    await fs.promises.unlink(filePath);
  }
}
