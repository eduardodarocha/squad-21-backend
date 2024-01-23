import { container } from 'tsyringe';
import avatarUpload from '@config/avatarUpload';

import IStorageAvatarProvider from './models/IStorageAvatarProvider';

import DiskStorageAvatarProvider from './implementations/DiskStorageAvatarProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageAvatarProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageAvatarProvider>(
  'DiskStorageAvatarProvider',
  providers[avatarUpload.driver],
);
