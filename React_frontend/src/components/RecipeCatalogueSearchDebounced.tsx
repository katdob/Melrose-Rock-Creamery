import React, { useEffect, useRef, useState } from 'react'
import { getSearchRecipes, type SearchRecipe } from '../api_calls/GETSearchRecipes.ts'

const DEBOUNCE_MS = 2000
const DEFAULT_PAGE = 1

function RecipeCatalogueSearchDebounced(): React.ReactElement {
  const [searchQuery, setSearchQuery] = useState('')
  const [searching, setSearching] = useState(false)
  const [searchResults, setSearchResults] = useState<SearchRecipe[]>([])
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  const searchWrapRef = useRef<HTMLDivElement | null>(null)

  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (searchWrapRef.current && !searchWrapRef.current.contains(e.target as Node)) {
        setDropdownOpen(false)
      }
    }
    document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [])

  useEffect(() => {
    const q = (searchQuery ?? '').trim()

    if (!q) {
      setSearchResults([])
      setSearching(false)
      setErrorMessage(null)
      setDropdownOpen(false)
      return
    }

    let cancelled = false

    const timeoutId = window.setTimeout(async () => {
      try {
        setSearching(true)
        setDropdownOpen(true)
        setErrorMessage(null)

        const data = await getSearchRecipes(q, DEFAULT_PAGE)
        if (!cancelled) setSearchResults(data?.results ?? [])
      } catch {
        if (!cancelled) {
          setSearchResults([])
          setErrorMessage()
        }
      } finally {
        if (!cancelled) setSearching(false)
      }
    }, DEBOUNCE_MS)

    return () => {
      cancelled = true
      // Ensure UI state doesn't get stuck if the user keeps typing quickly.
      setSearching(false)
      setDropdownOpen(false)
      window.clearTimeout(timeoutId)
    }
  }, [searchQuery])

  return (
    <div className="recipe-catalogue-search-wrap" ref={searchWrapRef}>
      <form
        className="recipe-catalogue-search-form"
        onSubmit={(e) => {
          e.preventDefault()
        }}
      >
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
      </form>

      {dropdownOpen && (
        <div
          id="recipe-search-results"
          className="recipe-search-dropdown"
          role="listbox"
          aria-label="Recipe search results"
        >
          {searching ? (
            <div className="recipe-search-dropdown-item recipe-search-dropdown-message">
              Searching...
            </div>
          ) : errorMessage ? (
            <div className="recipe-search-dropdown-item recipe-search-dropdown-message">
              {errorMessage}
            </div>
          ) : searchResults.length === 0 ? (
            <div className="recipe-search-dropdown-item recipe-search-dropdown-message">No recipes found</div>
          ) : (
            <div className="recipe-search-dropdown-scroll">
              {searchResults.map((recipe) => (
                <button
                  key={recipe.id}
                  type="button"
                  className="recipe-search-dropdown-item"
                  role="option"
                  onClick={() => {
                    // Keep it simple for now: selecting a recipe just closes the dropdown.
                    setDropdownOpen(false)
                  }}
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
  )
}

export default RecipeCatalogueSearchDebounced

