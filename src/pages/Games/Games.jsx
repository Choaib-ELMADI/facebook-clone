import './Games.scss';
import { Navbar, Sidebar } from '../../components/index';



const Games = () => {
  return (
    <main className="games">
        <Navbar />
        <div className='section'>
          <Sidebar title='Games' />
          <div className='games-content'>
            <p>Game</p>
            <p>Game</p>
            <p>Game</p>
            <p>Game</p>
            <p>Game</p>
          </div>
      </div>
    </main>
  );
};

export default Games;