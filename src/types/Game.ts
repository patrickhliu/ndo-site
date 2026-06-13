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
  photo_gallery: Photo[];
}
