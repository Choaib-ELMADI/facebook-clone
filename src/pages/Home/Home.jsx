import Navbar from "../../components/Navbar/Navbar";
import { CreatePost } from "../../container/index";
import './Home.scss';



export default function Home() {
  return (
    <main className="home">
      <Navbar />
      
      <div><h1>Left Side Bar</h1></div>
      <CreatePost />
      <div><h1>Right Side Bar</h1></div>
    </main>
  );
};