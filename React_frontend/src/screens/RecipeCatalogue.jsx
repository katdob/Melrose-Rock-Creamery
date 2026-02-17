import { Link, Outlet } from '@tanstack/react-router'
import IceCream from '../assets/ice-cream.svg'
import { NewRecipeProvider } from '../context/NewRecipeContext'
import '../App.css'

const RecipeCatalogue = () => {
  return (
    <>
      <div className="top-inline">
        <img src={IceCream} alt="Ice Cream" style={{ height: '10rem', width: '10rem' }} />
        <div className="header-with-underline">
          <h1>MRC Recipe Catalogue</h1>
          <span className="h1-underline" aria-hidden="true" />
        </div>
      </div>
      <div className="tabs">
        <Link to="/recipe-catalogue/add-new-recipe" activeProps={{ className: 'tab tab--active' }} inactiveProps={{ className: 'tab' }}>
          Add new recipe
        </Link>
        <Link to="/recipe-catalogue/my-recipes" activeProps={{ className: 'tab tab--active' }} inactiveProps={{ className: 'tab' }}>
          My recipes
        </Link>
        <Link to="/recipe-catalogue/catalogue" activeProps={{ className: 'tab tab--active' }} inactiveProps={{ className: 'tab' }}>
          Catalogue
        </Link>
      </div>
      <div className="card">
        <div className="about">
          <NewRecipeProvider>
            <Outlet />
          </NewRecipeProvider>
        </div>
      </div>
    </>
  )
}

export default RecipeCatalogue
