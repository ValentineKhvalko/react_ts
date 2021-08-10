import React, { FC } from "react";
import {ArticleProps} from './types';

const ArticleElem:FC<ArticleProps> = ({article, deleteArt}:ArticleProps) => {
  
  return (
    <div className="article">
      <div className="article__field title">{article.title}</div>
      <div className="article__field author">{article.author}</div>
      <div className="article__field content">{article.content}</div>
      <div className="article__field description">{article.description}</div>
      <div className="article__field urlToImage">
        <img src={article.urlToImage} />
      </div>
      <div className="article__field delete">
        <div className="deleteArt" onClick={() => deleteArt(article.title)}>Delete</div>
      </div>
    </div>
  )
}

export default ArticleElem;