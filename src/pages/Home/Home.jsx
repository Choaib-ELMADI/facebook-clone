import Navbar from "../../components/Navbar/Navbar";
import { CreatePost, StoriesAndReels } from "../../container/index";
import './Home.scss';



export default function Home() {
  return (
    <main className="home">
      <Navbar />
      
      <div><h1>Left Side Bar</h1></div>
      <div className="home__main-section">
        <StoriesAndReels />
        <CreatePost />
      </div>
      <div><h1>Right Side Bar</h1></div>
    </main>
  );
};