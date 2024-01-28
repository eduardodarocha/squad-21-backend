import { container } from 'tsyringe';
import imagesUpload from '@config/projectsUpload';

import IStorageImagesProvider from './models/IStorageImagesProvider';

import DiskStorageImagesProvider from './implementations/DiskStorageImagesProvider';
import S3StorageProvider from './implementations/S3StorageProvider';

const providers = {
  disk: DiskStorageImagesProvider,
  s3: S3StorageProvider,
};

container.registerSingleton<IStorageImagesProvider>(
  'DiskStorageImagesProvider',
  providers[imagesUpload.driver],
);
