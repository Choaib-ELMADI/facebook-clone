import './Menu.scss';
import Left from './Left';
import Right from './Right';



const Menu = () => {
  return (
    <div className='menu-container'>
        <h1>Menu</h1>
        <div className='menu-wrapper'>
            <Left />
            <Right />
        </div>
    </div>
  );
};

export default Menu;