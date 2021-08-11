import React, {FC, FormEvent, useState} from "react";
import '../styles/style.scss';
import Search from "./Search";
import Articles from "./Articles";
import axiosInstance from "./services/api";
import { AxiosResponse } from "axios";
import { GET200_Articles, ArticleType } from './types';

const API_KEY = '9aab61bc713c40f69912f9d3be66ca99';

const App: FC = () => {
  const [isLoading, setLoading] = useState<boolean>(false);
  const [art, setArt] =  useState<ArticleType[]>([]);
  const handleSubmit = async (e:FormEvent<HTMLFormElement>, searchValue:string, currentOpt:string) => {
    e.preventDefault();
    setLoading(true);
    try {
      const response:AxiosResponse<GET200_Articles> = await axiosInstance.get(`/v2/everything?q=${searchValue}&sortBy=${currentOpt}&apiKey=${API_KEY}`)
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
  }

  return (
    <div id="app">
      <h1 className="header">Search articles App</h1>
      <Search handleSubmit={handleSubmit} isLoading={isLoading}/>
      <Articles articles={art} deleteArt={deleteArt} clearArt={clearArt}/>
    </div>
    
  );
};

export default App;