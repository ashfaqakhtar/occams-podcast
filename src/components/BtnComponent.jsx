import Link from 'next/link'
import React from 'react'

const BtnComponent = ({ btn_title, btn_url = "#", bgColor = "bg-white", image,
    textColor = "text-[#EF6A24]", className = "py-3.5 px-8 cta-1"
}) => {
    return (
        <div>
            <Link href={btn_url} target="_blank" className={`group inline-flex flex-nowrap items-center rounded-full
                justify-center whitespace-nowrap gap-2.5 btn-professional ${bgColor} ${textColor} ${className}`}
            >
                <span className="whitespace-nowrap">{btn_title}</span>
                {image && (
                    <img src={image} alt="Button Image" className="h-auto w-max shrink-0" />
                )}
            </Link>
        </div>
    )
}

export default BtnComponent
