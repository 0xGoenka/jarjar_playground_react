import "./Home.css";
import { Header } from "./Header";
import { Content } from "./Content";
import { Toaster } from "react-hot-toast";
import { useState } from "react";

export const Home = () => {
  return (
    <div className="container">
      <Toaster />
      <Header />
      <Content />
    </div>
  );
};
