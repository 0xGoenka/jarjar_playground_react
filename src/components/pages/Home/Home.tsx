import "./Home.css";
import { Header } from "./Header";
import { Content } from "./Content";

export const Home = () => {
  return (
    <div className="container">
      <Header />
      <Content />
    </div>
  );
};
