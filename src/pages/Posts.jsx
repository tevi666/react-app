import React, { useEffect, useRef, useState } from 'react'
import PostService from '../API/PostService'
import PostFilter from '../components/PostFilter'
import PostForm from '../components/PostForm'
import PostList from '../components/PostList'
import MyButton from '../components/UI/button/MyButton'
import Loader from '../components/UI/Loader/Loader'
import MyModal from '../components/UI/MyModal/MyModal'
import Pagination from '../components/UI/pagination/Pagination'
import MySelect from '../components/UI/select/MySelect'
import { useFetching } from '../hooks/useFetching'
import { useObserver } from '../hooks/useObserver'
import { usePosts } from '../hooks/usePosts'
import { getPageCount } from '../utils/pages'
import '../styles/App.css'

function Posts() {
	const [posts, setPosts] = useState([])
	const [filter, setFilter] = useState({ sort: '', query: '' })
	const [modal, setModal] = useState(false)
	const [totalPages, setTotalPages] = useState(0)
	const [limit, setLimit] = useState(10)
	const [page, setPage] = useState(1)
	const lastedElement = useRef()

	const sortedAndSearchedPosts = usePosts(posts, filter.sort, filter.query)
	const [fetchPosts, isPostsLoading, postError] = useFetching(
		async (limit, page) => {
			const response = await PostService.getAll(limit, page)
			setPosts([...posts, ...response.data])
			const totalCount = response.headers['x-total-count']
			setTotalPages(getPageCount(totalCount, limit))
		}
	)

	useObserver(lastedElement, page < totalPages, isPostsLoading, () => {
		setPage(page + 1)
	})
	const changePage = page => {
		setPage(page)
	}

	const createPost = newPost => {
		setPosts([...posts, newPost])
		setModal(false)
	}
	useEffect(() => {
		fetchPosts(limit, page)
	}, [page, limit])
	// получаем пост с дочерного элемента
	const removePost = post => {
		setPosts(posts.filter(p => p.id !== post.id))
	}
	return (
		<div>
			<MyButton className='mt-4' onClick={() => setModal(true)}>
				Создать пользователя
			</MyButton>
			<MyModal visible={modal} setVisible={setModal}>
				<PostForm create={createPost} />
			</MyModal>
			<hr className='m-3' />
			<PostFilter filter={filter} setFilter={setFilter} />
			<MySelect
				value={limit}
				onChange={value => setLimit(value)}
				defaultValue='Кол-во элементов на странице'
				options={[
					{ value: 5, name: '5' },
					{ value: 10, name: '10' },
					{ value: 25, name: '25' },
					{ value: -1, name: 'Показать все' },
				]}
			/>
			{/* условная трисовка */}
			{postError && <h1>Произошла ошибка ${postError}</h1>}
			<PostList
				remove={removePost}
				posts={sortedAndSearchedPosts}
				title='Посты про JS'
			/>
			<div ref={lastedElement} className='h-5 bg-red-700' />
			{isPostsLoading && (
				<div className='flex justify-center mt-5'>
					<Loader />
				</div>
			)}
			<Pagination page={page} changePage={changePage} totalPages={totalPages} />
		</div>
	)
}

export default Posts
