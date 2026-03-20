import { useState, useRef, useEffect } from 'react'
import { Link, Outlet } from '@tanstack/react-router'
import IceCream from '../assets/ice-cream.svg'
import { NewRecipeProvider } from '../context/NewRecipeContext.ts'
import { postFindRecipe } from '../api_calls/POSTFindRecipe.ts'
import '../App.css'

const RecipeCatalogue = () => {
  const [searchQuery, setSearchQuery] = useState('')
  const [searchResults, setSearchResults] = useState([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [searching, setSearching] = useState(false)
  const searchWrapRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target)) setDropdownOpen(false)
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  const handleSearch = async (e) => {
    e?.preventDefault()
    const q = (searchQuery ?? '').trim()
    if (!q) {
      setSearchResults([])
      setDropdownOpen(false)
      return
    }
    setSearching(true)
    setDropdownOpen(true)
    try {
      const recipes = await postFindRecipe(q)
      setSearchResults(recipes ?? [])
    } catch {
      setSearchResults([])
    } finally {
      setSearching(false)
    }
  }

  const handleSelectRecipe = (recipe) => {
    setSearchQuery(recipe.name)
    setSearchResults([])
    setDropdownOpen(false)
  }

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
        <Link
          to="/recipe-catalogue/add-new-recipe"
          activeProps={{ className: 'tab tab--active' }}
          inactiveProps={{ className: 'tab' }}
        >
          Add new recipe
        </Link>
        <Link
          to="/recipe-catalogue/my-recipes"
          activeProps={{ className: 'tab tab--active' }}
          inactiveProps={{ className: 'tab' }}
        >
          My recipes
        </Link>
        <Link
          to="/recipe-catalogue/catalogue"
          activeProps={{ className: 'tab tab--active' }}
          inactiveProps={{ className: 'tab' }}
        >
          Catalogue
        </Link>
      </div>
      <div className="recipe-catalogue-search-wrap" ref={searchWrapRef}>
        <form onSubmit={handleSearch} className="recipe-catalogue-search-form">
          <input
            type="text"
            className="recipe-name-input recipe-catalogue-search-input"
            placeholder="Search recipes by name, author, or ingredient..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            onFocus={() => searchResults.length > 0 && setDropdownOpen(true)}
            aria-expanded={dropdownOpen}
            aria-haspopup="listbox"
            aria-controls="recipe-search-results"
          />
          <button type="submit" className="add-ingredient-btn recipe-catalogue-search-btn">
            Search
          </button>
        </form>
        {dropdownOpen && (
          <div
            id="recipe-search-results"
            className="recipe-search-dropdown"
            role="listbox"
          >
            {searching ? (
              <div className="recipe-search-dropdown-item recipe-search-dropdown-message">
                Searching...
              </div>
            ) : searchResults.length === 0 ? (
              <div className="recipe-search-dropdown-item recipe-search-dropdown-message">
                No recipes found
              </div>
            ) : (
              <div className="recipe-search-dropdown-scroll">
                {searchResults.map((recipe) => (
                  <button
                    key={recipe.id}
                    type="button"
                    className="recipe-search-dropdown-item"
                    role="option"
                    onClick={() => handleSelectRecipe(recipe)}
                  >
                    <span className="recipe-search-dropdown-name">{recipe.name}</span>
                    <span className="recipe-search-dropdown-meta">by {recipe.author}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
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

