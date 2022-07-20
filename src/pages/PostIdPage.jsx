import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import PostService from '../API/PostService'
import Loader from '../components/UI/Loader/Loader'
import { useFetching } from '../hooks/useFetching'
const PostIdPage = () => {
	const params = useParams()
	const [post, setPost] = useState({})
	const [comments, setComments] = useState([])

	const [fetchPostById, isLoading, error] = useFetching(async id => {
		const response = await PostService.getById(id)
		setComments(response.data)
	})
	const [fetchComments, isCommentsLoading, CommentsError] = useFetching(
		async id => {
			const response = await PostService.getCommentsByPostId(id)
			setPost(response.data)
		}
	)

	useEffect(() => {
		fetchPostById(params.id)
		fetchComments(params.id)
	}, [])
	return (
		<div>
			<h1 className='text-center text-5xl text-green-400'>
				Вы открыли страницу поста с ID = {params.id}
			</h1>
			{isLoading ? (
				<Loader />
			) : (
				<div className='text-center text-green-600 text-5xl py-10'>
					{post.id}. {post.title}
				</div>
			)}
			<h1 className='text-center text-teal-400 text-5xl'>Комментарии</h1>
			{isCommentsLoading ? (
				<Loader />
			) : (
				<div>
					// !! error
					{comments.map(comm => (
						<div className='mt-5'>
							<h5>{comm.id}</h5>
							<div>{comm.body}</div>
						</div>
					))}
				</div>
			)}
		</div>
	)
}
export default PostIdPage
