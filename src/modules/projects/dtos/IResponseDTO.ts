export default interface IResponseDTO {
  id: string;
  title: string;
  tags: string;
  link: string;
  description: string;
  image: string; // upload image ???
  created_at: Date;
  updated_at: Date;
}
