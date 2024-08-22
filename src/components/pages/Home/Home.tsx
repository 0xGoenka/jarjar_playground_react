import "./Home.css";
import { Header } from "./Header";
import { Content } from "./Content";
import { Toaster } from "react-hot-toast";
import { DiscordWall } from "../DiscordWall/DiscordWall";
import { useEffect, useState } from "react";

const CODE = "You are so early";

export const Home = () => {
  const [code, setCode] = useState(localStorage.getItem("code") ?? "");

  useEffect(() => {
    if (code === CODE) {
      localStorage.setItem("code", code);
    }
  }, [code]);

  if (code !== CODE) return <DiscordWall setCode={setCode} code={code} />;

  return (
    <div className="container">
      <Toaster />
      <Header />
      <Content />
    </div>
  );
};
