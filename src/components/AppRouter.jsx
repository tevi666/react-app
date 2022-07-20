import React, { useContext } from 'react'
import { Route, Routes } from 'react-router-dom'
import About from '../pages/About'
import Posts from '../pages/Posts'
// import Error from '../pages/Error'
import PostIdPage from '../pages/PostIdPage'
// import { routes } from '../router/index'
import { publicRoutes, privateRoutes } from '../router'
import Login from '../pages/Login'
import { AuthContext } from '../context'
import Loader from './UI/Loader/Loader'
const AppRouter = () => {
	const { isAuth, isLoading } = useContext(AuthContext)

	if (isLoading) {
		return <Loader />
	}
	return isAuth ? (
		<Routes>
			<Route path='/posts' element={<Posts />} exact />
			<Route path='/about' element={<About />} exact />
			<Route path='/posts/:id' element={<PostIdPage />} exact />
			<Route path='*' element={<Posts to='/posts' replace />} />
		</Routes>
	) : (
		<Routes>
			<Route path='*' element={<Login to='/login' replace />} />
		</Routes>
	)
}
export default AppRouter
