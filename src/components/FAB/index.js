import React from "react";
import fileIcons from '../../assets/icons/file.png';

const FAB = ({onClick}) => {
    return (
        <button
            className="fixed right-10 bottom-10 rounded-full shadow-lg bg-white w-16 h-16 flex flex-col justify-center items-center hover:bg-violet-50"
            onClick={onClick}
        >
            <img src={fileIcons} className="w-12 h-12" alt="icons" />
        </button>
    )
}

export default FAB;