import './Friends.scss';
import { Navbar, Sidebar } from '../../components/index';



const Friends = () => {
  return (
    <main className="friends">
      <Navbar />
      <div className='section'>
          <Sidebar title='Amis' />
          <div className='friends-content'>
            <p>Friend</p>
            <p>Friend</p>
            <p>Friend</p>
            <p>Friend</p>
            <p>Friend</p>
          </div>
      </div>
    </main>
  );
};

export default Friends;