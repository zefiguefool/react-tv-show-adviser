import React from "react";
import { useEffect, useState } from "react";
import { TVShowAPI } from "./api/tv-show";
import "./global.css";
import s from "./style.module.css";
import { BACKDROP_BASE_URL } from "./config.js";
import { TVShowDetail } from "./components/TVShowDetail/TVShowDetail";
import { Logo } from "./components/Logo/Logo";
import logo from "./assets/images/logo.png";
import { TVShowList } from "./components/TVShowList/TVShowList";
import SearchBar from "./components/SearchBar/SearchBar";

export default function App() {
  const [currentTVShow, setCurrentTVShow] = useState();
  const [recommendationList, setRecommendationList] = useState([]);
  // on doit placer TVShowAPI.fetchPopulars() dans une fonction asynchrone car le code suivant ne fonctionne pas. useEffect ne peut retourner qu'une fonction et non pas une promesse
  /*  useEffect(async () => { 
    const populars = await TVShowAPI.fetchPopulars();
  }, []); */

  async function fetchPopulars() {
    try {
      const populars = await TVShowAPI.fetchPopulars();
      if (populars.length > 0) {
        setCurrentTVShow(populars[10]);
      }
    } catch (error) {
      alert("Erreur durant la recherche des séries polpulaires");
    }
  }
  async function fetchRecommendations(tvShowId) {
    try {
      const recommendations = await TVShowAPI.fetchRecommendations(tvShowId);
      if (recommendations.length > 0) {
        setRecommendationList(recommendations.slice(0, 10)); // on ne recupères que les 10 premieres reco
      }
    } catch (error) {
      alert("Erreur durant la recherche des séries recommandées");
    }
  }

  useEffect(() => {
    fetchPopulars();
  }, []); // apres le premier render ce useEffect ne se laisse qu'une fois

  useEffect(() => {
    if (currentTVShow) {
      fetchRecommendations(currentTVShow.id);
    }
  }, [currentTVShow]); // apres le premier render ce useEffect se lance dès que currentTVShow existe et est mis à jour

  console.log("currentTVShow :", currentTVShow);

  /* function setCurrentTVShowRecommendation(tvShow) {
    alert(JSON.stringify(tvShow));
  } */

  async function searchTVShow(tvShowName) {
    try {
      const searchResponse = await TVShowAPI.fetchByTitle(tvShowName);
      if (searchResponse.length > 0) setCurrentTVShow(searchResponse[0]); // On prend juste le premier element de la reponse jugé le plus pertinent
    } catch (error) {
      alert("Erreur durant la recherche");
    }
  }

  return (
    <div
      className={s.main_container}
      style={{
        background: currentTVShow
          ? `linear-gradient(rgba(0,0,0,0.55), rgba(0,0,0,0.55)), url("${BACKDROP_BASE_URL}${currentTVShow.backdrop_path}") no-repeat center / cover`
          : "black",
      }}
    >
      <div className={s.header}>
        <div className="row">
          <div className="col-4">
            <Logo
              title="watowatch"
              subtitle="Find a show you may like"
              image={logo}
            />
          </div>
          <div className="col-sm-12 col-md  -4">
            <SearchBar onSubmit={searchTVShow} />
          </div>
        </div>
      </div>
      <div className={s.tv_show_detail}>
        {currentTVShow && <TVShowDetail tvShow={currentTVShow} />}
      </div>
      <div className={s.recommend_shows}>
        {recommendationList && recommendationList.length > 0 && (
          <TVShowList
            onClickItem={setCurrentTVShow}
            TVShowList={recommendationList}
          />
        )}
      </div>
    </div>
  );
}
