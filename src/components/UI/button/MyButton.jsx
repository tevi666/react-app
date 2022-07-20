import React from 'react'
const MyButton = ({children, ...props}) => {
	return (
		<>
			<button {...props} className="py-2 px-6 m-4 text-teal-500 text-lg bg-transparent border cursor-pointer">
				{children}
			</button>
		</>
	)
}
export default MyButton