import React from 'react'

const MyInput = React.forwardRef((props, ref) => {
	return (
		<input ref={ref} className='py-2 px-5 m-4 border' {...props} >
			</input>
	)
})
export default MyInput