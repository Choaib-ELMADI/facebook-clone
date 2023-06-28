import { useEffect } from 'react';

import './Bookmarks.scss';
import { LeftSidebar, Navbar } from '../../components/index';



const Bookmarks = () => {
    useEffect(() => {
        document.title = 'Bookmarks | Facebook';
    }, []);

    return (
        <main className="bookmarks">
            <Navbar />
            <LeftSidebar />
        </main>
    );
};

export default Bookmarks;