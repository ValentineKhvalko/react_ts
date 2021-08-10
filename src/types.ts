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

export interface ArticleProps {
  article: ArticleType,
  deleteArt: (title:string) => void,
}