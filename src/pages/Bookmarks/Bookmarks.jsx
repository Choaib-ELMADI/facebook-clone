import './Bookmarks.scss';
import { LeftSidebar, Navbar } from '../../components/index';



const Bookmarks = () => {
    return (
        <main className="bookmarks">
            <Navbar />
            <LeftSidebar />
        </main>
    );
};

export default Bookmarks;