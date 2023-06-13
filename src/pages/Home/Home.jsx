import './Home.scss';
import Navbar from "../../components/Navbar/Navbar";
import { LeftSidebar, RightSidebar } from "../../components/index";
import { CreatePost, StoriesAndReels } from "../../container/index";



export default function Home() {
  return (
    <main className="home">
      <Navbar />
      
      <LeftSidebar />
      <div className="home__main-section">
        <StoriesAndReels />
        <CreatePost />
      </div>
      <RightSidebar />
    </main>
  );
};