import React, { useContext } from 'react'
import MyButton from '../components/UI/button/MyButton'
import MyInput from '../components/UI/input/MyInput'
import { AuthContext } from '../context'
const Login = () => {
	const { isAuth, setIsAuth } = useContext(AuthContext)
	const login = e => {
		e.preventDefault()
		setIsAuth(true)
		localStorage.setItem('auth', 'true')
	}
	return (
		<>
			<div>
				<h1 className='text-teal-600 text-center text-4xl relative top-20'>
					Страница для логина
				</h1>
				<form
					onSubmit={login}
					className='flex justify-center py-10 align-center relative top-40'
				>
					<MyInput type='text' placeholder='Введите логин' />
					<MyInput type='password' placeholder='Введите пароль' />
					<MyButton>Войти</MyButton>
				</form>
			</div>
		</>
	)
}
export default Login
