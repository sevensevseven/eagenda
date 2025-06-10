import React from "react";

const Card = ({ imageSrc, title, description }) => {
    return (
        <div className="flex flex-col justify-between max-w-sm  sm:max-w-[18rem] lg:max-w-sm rounded-2xl overflow-hidden shadow-md bg-white">
            <img src={imageSrc || null} alt={title} className="w-[50%] object-cover self-center p-4" />
            <div className="p-4">
                <h2 className="text-xl font-semibold mb-2">{title}</h2>
                <p className="text-gray-600">{description}</p>
            </div>
        </div>
    );
};

export default Card;