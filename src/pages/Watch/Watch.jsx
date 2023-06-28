import { useEffect } from 'react';

import './Watch.scss';
import { Navbar, Sidebar } from '../../components/index';



const Watch = () => {
  useEffect(() => {
    document.title = 'Watch | Facebook';
  }, []);

  return (
    <main className="watch">
      <Navbar />
      <div className='section'>
          <Sidebar title='Watch' />
          <div className='watch-content'>
            <p>Video</p>
            <p>Video</p>
            <p>Video</p>
            <p>Video</p>
            <p>Video</p>
          </div>
      </div>
    </main>
  );
};

export default Watch;