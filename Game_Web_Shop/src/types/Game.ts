
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
    metacritic: number
}



export interface FetchGameRes {
    count: number;
    results: Games[]
}






