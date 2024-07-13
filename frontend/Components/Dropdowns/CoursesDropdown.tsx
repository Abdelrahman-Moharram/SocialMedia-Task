import React from 'react'
import { ImFileEmpty } from "react-icons/im";
import CourseDropdownItem from './CourseDropdownItem';


interface courseType{
    id: string,
    name: string,
    image: string,
    description: string,
}
interface props{
    handleCourseDropdown:()=>void
}
const CoursesDropdown = ({handleCourseDropdown}:props) => {
    return (
        <div className='absolute right-10 top-[60px] max-w-[40rem] bg-gray-100 rounded-md shadow-lg px-5 py-4 z-10 my-3 max-h-[70%] overflow-y-auto'>
        
        </div>
    )
}

export default CoursesDropdown
