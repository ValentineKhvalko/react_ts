import { AxiosError, AxiosResponse } from "axios";
import React, {ChangeEvent, FC, FormEvent, useState} from "react";
import axiosInstance from "./services/api";
import { ArticleType, GET200_Articles } from './types';
import ArticleElem from './Article';

const API_KEY = '9aab61bc713c40f69912f9d3be66ca99';

const Articles: FC = () => {
  const [searchValue, setSearchValue] = useState<string>('');
  const [isLoading, setLoading] = useState<boolean>(false);
  const [art, setArt] =  useState<ArticleType[]>([]);
  const handleChange = (e: ChangeEvent<HTMLInputElement>):void => {
    const value = e.target.value;
    setSearchValue(value);
  }
  const handleSubmit = async (e:FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response:AxiosResponse<GET200_Articles> = await axiosInstance.get(`/v2/everything?q=${searchValue}&apiKey=${API_KEY}`)
      setArt(response.data.articles);
    } catch(err: any) {
      console.log(err);
      
    } finally {
      setLoading(false);
    }
  }

  const deleteArt = (title:string):void => {
    setArt((articles) => {
      return articles.filter((art:ArticleType) => art.title !== title);
    })
  }

  const clearArt = ():void => {
    setArt([]);
    setSearchValue('');
  }

  return (
  <div>
    <form onSubmit={handleSubmit} className="search__container">
      <input id="search" type="text" value={searchValue} onChange={handleChange} disabled={isLoading} />
      <button type="submit" disabled={isLoading ? true : false}>{isLoading ? 'Loading' : 'Search'}</button>
    </form>
    {art.length ? <div className="clearArt" onClick={clearArt}>Очистить</div> : '' }
    <div className="articles__container"> 
    {
      art.length 
      ? art.map((article, index) => {
          return <ArticleElem deleteArt={deleteArt} article={article} key={index + 'art'}/>
        })
      : <div className="emptyArt">Введите тему статьи</div>
    }
    </div>
    
  </div>
  )
}

export default Articles;