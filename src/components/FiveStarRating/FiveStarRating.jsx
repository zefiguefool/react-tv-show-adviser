import React from "react";
import { StarFill, Star as StarEmpty, StarHalf } from "react-bootstrap-icons";

export function FiveStarRating({ rating }) {
  const starList = [];

  // Stocker dans une variable le nombre d'étoiles pleines
  const starFillCount = Math.floor(rating);
  // Stocker dans une variable s'il y a oui ou non une demi étoile
  const hasStarHalf = rating - starFillCount >= 0.5;
  // Stocker dans une variable le nombre d'étoiles vides
  const emptyStatCount = 5 - starFillCount - (hasStarHalf ? 1 : 0);

  //console.log(starFillCount, hasStarHalf, emptyStatCount);
  // Pusher dans le tableau les etoiles pleines
  for (let i = 1; i <= starFillCount; i++) {
    starList.push(<StarFill key={"star-fill" + i} />);
  }
  // Pusher dans le tableau les demi etoiles s'il y en a
  if (hasStarHalf) {
    starList.push(<StarHalf key={"star-half"} />);
  }
  // Pusher dans le tableau les etoiles vides
  for (let i = 1; i <= emptyStatCount; i++) {
    starList.push(<StarEmpty key={"star-empty" + i} />);
  }

  return <div>{starList}</div>;
}
