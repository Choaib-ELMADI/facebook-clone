import { LeftSidebar } from "../../components/index";
import Navbar from "../../components/Navbar/Navbar";
import { CreatePost, StoriesAndReels } from "../../container/index";
import './Home.scss';



export default function Home() {
  return (
    <main className="home">
      <Navbar />
      
      <LeftSidebar />
      <div className="home__main-section">
        <StoriesAndReels />
        <CreatePost />
      </div>
      <div className="sidebar right"><h1>Right Side Bar</h1></div>
    </main>
  );
};