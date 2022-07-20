import About from '../pages/About'
import Login from '../pages/Login'
import PostIdPage from '../pages/PostIdPage'
import Posts from '../pages/Posts'

export const privateRoutes = [
	{ path: '/about', component: About, exact: true, key: 'about' },
	{ path: '/posts', component: Posts, exact: true, key: 'posts' },
	{ path: '/posts/:id', component: PostIdPage, exact: true, key: 'postIdPage' },
]
export const publicRoutes = [
	{ path: '/login', component: Login, exact: true, key: 'login' },
]
