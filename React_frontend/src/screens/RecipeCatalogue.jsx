import IceCream from '../assets/ice-cream.svg';
import '../App.css';

const RecipeCatalogue = () => {
  return (
    <>
      <div className="top-inline">
        <img 
          src={IceCream} 
          alt="Ice Cream" 
          style={{ height: '10rem', width: '10rem' }} 
        />
        <div className="header-with-underline">
          <h1>MRC Recipe Catalogue</h1>
          <span className="h1-underline" aria-hidden="true" />
        </div>
      </div>
      <div className="about">
        <p>Recipe Catalogue</p>
      </div>
    </>
  );
};

export default RecipeCatalogue;
