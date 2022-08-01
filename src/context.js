import React, { createContext, useContext, useEffect, useReducer } from 'react'
import reducer from './reducer'
import {
  HANDLE_PAGE,
  HANDLE_SEARCH,
  REMOVE_STORIES,
  SET_LOADING,
  SET_STORIES,
} from './actions'

const API_ENDPOINT = 'https://hn.algolia.com/api/v1/search?'

const initialState = {
  isLoading: true,
  hits: [],
  query: 'react',
  page: 0,
  nbPages: 0,
}
const AppContext = createContext()

const AppProvider = ({ children }) => {
  //useReducer function
  const [state, dispatch] = useReducer(reducer, initialState)

  //fetch function
  const fetchStories = async (url) => {
    dispatch({ type: SET_LOADING })
    try {
      const response = await fetch(url)
      const data = await response.json()
      console.log(data)
      dispatch({
        type: SET_STORIES,
        payload: { hits: data.hits, nbPages: data.nbPages },
      })
    } catch (error) {
      console.log(error)
    }
  }
  const removeStory = (id) => {
    dispatch({ type: REMOVE_STORIES, payload: id })
  }

  const searchHandler = (query) => {
    dispatch({ type: HANDLE_SEARCH, payload: query })
  }

  const pageHandler = (value) => {
    dispatch({type: HANDLE_PAGE,payload:value})
  }

  useEffect(() => {
    fetchStories(`${API_ENDPOINT}query=${state.query}&page=${state.page}`)
  }, [state.page, state.query])

  return (
    <AppContext.Provider value={{ ...state, removeStory, searchHandler,pageHandler }}>
      {children}
    </AppContext.Provider>
  )
}

export const useGlobalContext = () => {
  return useContext(AppContext)
}

export { AppContext, AppProvider }
