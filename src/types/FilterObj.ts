export default interface FilterObj {
  sort_by: string;
  sort_dir: string;
  game_category: string[];
  sales: boolean;
  demo: boolean;
  format: string;
  console: string;
  availability: string[];
  price_range: number;
}
