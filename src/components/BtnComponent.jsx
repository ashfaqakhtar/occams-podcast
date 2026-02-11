import React from 'react'

const BtnComponent = ({ btn_title, btn_url, className }) => {
    return (
        <div>
            <a href={btn_url} className={`lg:flex rounded-full text-base py-3.5 items-center ${className}
                font-medium justify-center text-[#EF6A24] bg-white px-8`}>
                {btn_title}
            </a>
        </div>
    )
}

export default BtnComponent