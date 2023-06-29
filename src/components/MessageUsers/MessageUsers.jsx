import './MessageUsers.scss';
import { Messenger, Navbar } from '../index';



const MessageUsers = () => {
    return (
        <div className='message-users-container'>
            <Navbar />
            <Messenger />
        </div>
    );
};

export default MessageUsers;