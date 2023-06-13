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
        <div className='home__main-section-content'>
          <StoriesAndReels />
          <CreatePost />
        </div>
      </div>
      <RightSidebar />
    </main>
  );
};