import { ReactNode } from "react";

export enum SearchType {
    all = '',
    movie = 'movie',
    series = 'series',
    episode = 'episode',
}

export interface SearchResult {
    Title: string
    Year: string
    Poster: string
    imdbID: string
    Type: string;
    Genre: string;
}
export interface DetailsResult {
    imdbRating: ReactNode;
    Title: string
    Year: string
    Poster: string
    imdbID: string
    Type: string;
    Genre: string;
}
export interface SearchError {
    Response: string
    Error: string

}

export const useApi = () => {
    let url = 'https://www.omdbapi.com/'
    let apiKey = 'c1034dd'

    const searchData = async (title: string, type: SearchType): Promise<SearchResult[] | SearchError> => {
        const result = await fetch(
            `${url}?s=${encodeURI(title)}&type=${type}&apikey=${apiKey}`,
        )
        return result.json()
    }
    const getDetails = async (id: string): Promise<DetailsResult> => {
        const result = await fetch (`${url}?i=${id}&plot=full&apikey=${apiKey}`)
        return result.json()
    }
    return{
        searchData,
        getDetails,
    }
}

export default useApi
