import React, {FC} from "react";
import { ArticlesProps } from './types';
import ArticleElem from './Article';


const Articles: FC<ArticlesProps> = ({articles, deleteArt, clearArt}:ArticlesProps) => {

  return (
  <div>
    {articles.length ? <div className="clearArt" onClick={clearArt}>Очистить</div> : '' }
    <div className="articles__container"> 
    {
      articles.length 
      ? articles.map((article, index) => {
          return <ArticleElem deleteArt={deleteArt} article={article} key={index + 'art'}/>
        })
      : <div className="emptyArt">Введите тему статьи</div>
    }
    </div>
    
  </div>
  )
}

export default Articles;