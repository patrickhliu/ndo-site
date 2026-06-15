interface Photo {
  src: string;
  width: number;
  height: number;
}

export default interface Game {
  id: number;
  title: string;
  sale_price?: number;
  regular_price?: number;
  discount_percent?: number;
  discount_ends?: number;
  platform_code: string;
  release_date: Date;
  file_size: string;
  url: string;
  photo_gallery: Photo[];
  video_gallery: Photo[];
}
