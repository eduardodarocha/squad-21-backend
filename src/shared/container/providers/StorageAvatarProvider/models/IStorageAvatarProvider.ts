export default interface IStorageAvatarProvider {
  saveFile(file: string): Promise<string>;
  deleteFile(file: string): Promise<void>;
}
