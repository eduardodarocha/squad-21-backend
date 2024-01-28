export default interface IStorageImagesProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
