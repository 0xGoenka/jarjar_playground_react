import "./Home.css";
import { Header } from "./Header";
import { Content } from "./Content";
import { Toaster } from "react-hot-toast";
import { DiscordWall } from "../DiscordWall/DiscordWall";
import { useEffect, useState } from "react";

export const Home = () => {
  const [code, setCode] = useState(localStorage.getItem("code") ?? "");

  useEffect(() => {
    if (code === "leboss") {
      localStorage.setItem("code", code);
    }
  }, [code]);

  if (code !== "leboss") return <DiscordWall setCode={setCode} code={code} />;

  return (
    <div className="container">
      <Toaster />
      <Header />
      <Content />
    </div>
  );
};
