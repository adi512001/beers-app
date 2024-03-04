export type TBeer<T = {}> = T & {
  id: number;
  name: string;
  image_url?: string;
  isFavorite?: boolean;
  rank?: number;
};

export type TBeerProps<T = {}> = TBeer & {
  loading?: boolean;
  description?: string;
  food_pairing?: string[];
  brewers_tips?: string;
  favoritesPage?: boolean;
} & T;
