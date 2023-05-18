'use client';

import { useState } from "react";
import { IoTelescope } from 'react-icons/io5';
import { FaCalendarPlus } from 'react-icons/fa';
import { BsFillPeopleFill, BsFillSaveFill, BsFillStarFill, BsFillPlayBtnFill, BsMessenger } from "react-icons/bs";
import { HiUserGroup } from "react-icons/hi";
import { BiJoystickAlt } from "react-icons/bi";
import { GiGamepadCross, GiBackwardTime } from 'react-icons/gi';
import { RiGalleryFill } from 'react-icons/ri';

import { GoSearch } from "react-icons/go";

const menuItems = [
  {
    category: 'Social',
    items: [
      {
        icon: <FaCalendarPlus color="#e74a66" size={ 26 } />,
        title: 'Evènements',
        description: 'Velit sunt exercitation exercitation excepteur consequat ea qui incididunt.',
        link: 'link'
      },
      {
        icon: <BsFillPeopleFill color='#1a7fe9' size={ 26 } />,
        title: 'Amis',
        description: 'Velit sunt exercitation exercitation excepteur consequat ea qui incididunt.',
        link: 'link'
      },
      {
        icon: <HiUserGroup color='#1a7fe9' size={ 26 } />,
        title: 'Groupes',
        description: 'Velit sunt exercitation exercitation excepteur consequat ea qui incididunt.',
        link: 'link'
      },
      {
        icon: <FaCalendarPlus color='#1a7fe9' size={ 26 } />,
        title: "Fil d'actualité",
        description: 'Velit sunt exercitation exercitation excepteur consequat ea qui incididunt.',
        link: 'link'
      },
      {
        icon: <BsFillStarFill color='#e9b330' size={ 26 } />,
        title: 'Favoris',
        description: 'View posts by favorites.',
        link: 'link'
      },
    ],
  },
  {
    category: 'Divertissement',
    items: [
      {
        icon: <GiGamepadCross color='#1a7fe9' size={ 26 } />,
        title: 'Vidéos de gaming',
        description: 'Velit sunt exercitation exercitation excepteur consequat ea qui incididunt.',
        link: 'link'
      },
      {
        icon: <BiJoystickAlt color='#1a7fe9' size={ 30 } />,
        title: 'Jouer à des jeux',
        description: 'Jouer a vos jeux favoris.',
        link: 'link'
      },
      {
        icon: <BsFillPlayBtnFill color='#1a7fe9' size={ 24 } />,
        title: 'Watch',
        description: 'Velit sunt exercitation exercitation excepteur consequat ea qui incididunt.',
        link: 'link'
      },
    ],
  },
  {
    category: 'Personnel',
    items: [
      {
        icon: <RiGalleryFill color='#1a7fe9' size={ 26 } />,
        title: "Activité publicitaire récente",
        description: 'Velit sunt exercitation exercitation excepteur consequat ea qui incididunt.',
        link: 'link'
      },
      {
        icon: <GiBackwardTime color='#1a7fe9' size={ 30 } />,
        title: 'Souvenirs',
        description: 'Velit sunt exercitation exercitation excepteur consequat ea qui incididunt.',
        link: 'link'
      },
      {
        icon: <BsFillSaveFill color='#c139ac' size={ 24 } />,
        title: 'Enregistrements',
        description: 'Velit sunt exercitation exercitation excepteur consequat ea qui incididunt.',
        link: 'link'
      },
    ],
  },
  {
    category: 'Autres produits de Meta',
    items: [
      {
        icon: <BsMessenger color='#6ec299' size={ 26 } />,
        title: 'Messenger Kids',
        description: 'Velit sunt exercitation exercitation excepteur consequat ea qui incididunt. Velit sunt exercitation exercitation excepteur conse.',
        link: 'link'
      },
    ],
  }
];



const Left = () => {
  const [search, setSearch] = useState('');
  const [filteredItems, setFilteredItems] = useState(menuItems);

  const handleSearch = () => {
    setFilteredItems(
      menuItems.filter(item => {
        return search.toLowerCase() === ' ' ?
        item :
        item.category.toLowerCase().includes(search.toLowerCase())
      })
    );
  };

  return (
    <div className="left-container">
      <div className="search">
        <GoSearch />
        <input 
          type="text" 
          placeholder="Rechercher dans le menu"
          onChange={ (e) => {
            setSearch(e.target.value);
            handleSearch();
          }}
          value={ search }
        />
      </div>
      <div className="search-results">
        {
          filteredItems.length < 1 &&
          <div className="no-result">
            <IoTelescope size={ 100 } />
            <h3>Nous n'avons rien trouvé</h3>
            <p>Essayez avec d'autres mots-clés ou vérifiez l'orthographe.</p>
          </div>
        }
        {
          filteredItems.length >= 1 &&
          <div className="results">
            {
              filteredItems.map((category) => (
                <div className="category-container" key={ category.category }>
                  <h3 className="category-title">{ category.category }</h3>
                  {
                    category.items.map((item, index) => (
                      <div className="item" key={ `${ category.category }-item-${ index }` }>
                        <div className="icon">{ item.icon }</div>
                        <div className="info">
                          <h3>{ item.title }</h3>
                          <p>{ item.description }</p>
                        </div>
                      </div>
                    ))
                  }
                  
                </div>
              ))
            }
          </div>
        }
      </div>
    </div>
  );
};

export default Left;