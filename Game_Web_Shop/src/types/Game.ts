// games interfaces
export interface Platform {
    id: number,
    name: string,
    slug: string
}


export interface Games {
    id: number,
    name: string,
    background_image: string,
    parent_platforms: { platform: Platform }[],
    metacritic: number;
    rating_top: number;
    rating: number,
    genres: Genre[]
}

export interface Genre {
    id: number,
    name:string,
    image_background: string
}


export interface FetchGenresRes {
    count: number,
    results: Genre[]
    }

export interface FetchGameRes {
    count: number;
    results: Games[]
}



  
  export interface PlatformWrapper {
    id: number,
    name: string,
    slug: string,
    platforms: Platform[]
  }
  
  export interface PlatFormResults {
    results: PlatformWrapper[]
  }


export interface GameDetails {
    id: number,
    name: string,
    description: string,
    metacritic: number,
    released: Date,
    background_image: string,
    website: string,
    rating: number,
    playtime: number,
    platforms: {
      platform: {
        name: string;
      };
    }[];
}


export interface GameTrailer {
  count: number;
  next: string | null;
  previous: string | null;
  results: TrailerResult[];
}

export interface TrailerResult {
  id: number;
  name: string;
  preview: string;
  data: {
    480: string;
    max: string;
  };
}


export interface BackendGameData {
  _id: string;
  rawgId: number;
  price: number;
  rentalPrice?: number;
  availableForRent: boolean;
}

export type FullGame = Games & BackendGameData;

