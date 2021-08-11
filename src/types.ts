import {FormEvent} from 'react';
export interface ArticleType {
  author: string
  content: string,
  description: string,
  publishedAt: string,
  source: {id: null|string, name: string}
  title: string,
  url: string,
  urlToImage: string,
}

export interface GET200_Articles {
  articles: ArticleType[],
}

export interface ArticlesProps {
  articles: ArticleType[],
  deleteArt: (title: string) => void,
  clearArt: () => void,
}

export interface ArticleProps {
  article: ArticleType,
  deleteArt: (title:string) => void,
}
export interface SearchProps {
  handleSubmit: (e:FormEvent<HTMLFormElement>, searchValue:string, currentOpt: string) => Promise<void>,
  isLoading: boolean,
}