import React from 'react'
import MyButton from './UI/button/MyButton'
import { useLocation } from 'react-router-dom'

const PostItem = props => {
	const router = useLocation()
	return (
		<div className='flex justify-around border py-2 mb-2'>
			<div className=''>
				<strong className='border bg-green py-1 px-1 m-4'>
					{props.post.id}. {props.post.title}
				</strong>
				<div className='m-4 text-green-400'>{props.post.body}</div>
			</div>
			<div className='flex'>
				<MyButton
					// ! error
					onClick={() => router.push(`/posts/${props.post.id}`)}
					className='border border-r-8 bg-gray-700 py-2 px-2 m-4 hover:bg-red-700 transition-all'
				>
					Открыть
				</MyButton>
				<MyButton
					onClick={() => props.remove(props.post)}
					className='border border-r-8 bg-gray-700 py-2 px-2 m-4 hover:bg-red-700 transition-all'
				>
					Удалить
				</MyButton>
			</div>
		</div>
	)
}
export default PostItem
