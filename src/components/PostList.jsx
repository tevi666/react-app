import React from 'react'
import { TransitionGroup, CSSTransition } from 'react-transition-group'
import PostItem from './PostItem'

const PostList = ({ posts, title, remove }) => {
	if (!posts.length) {
		return (
			<h1 className='text-red-700 text-center text-5xl'>Посты не найдены</h1>
		)
	}
	return (
		<div className='border shadow-xl py-4 m-4'>
			<h1 className='text-center text-5xl font-bold'>{title}</h1>
			<TransitionGroup>
				{posts.map((post, index) => (
					<CSSTransition key={post.id} timeout={500} classNames='post'>
						<PostItem
							remove={remove}
							number={index + 1}
							post={post}
							key={post.id}
						/>
					</CSSTransition>
				))}
			</TransitionGroup>
		</div>
	)
}
export default PostList
