import React from "react";
import s from "./style.module.css";
import { Search as SearchIcon } from "react-bootstrap-icons";

export default function SearchBar({ onSubmit }) {
  function submit(e) {
    if (e.key === "Enter" && e.target.value.trim() !== "") {
      console.log("e.target.value. :", e.target.value);
      onSubmit(e.target.value);
    }
  }
  return (
    <>
      <SearchIcon size={27} className={s.icon} />
      <input
        onKeyUp={submit}
        type="text"
        className={s.input}
        placeholder="search a tv show you may like"
      />
    </>
  );
}
