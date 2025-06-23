'use client';
import { useState } from 'react';

export default function Dropdown({title, answer}) {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="bg-[--faq-bg] text-[--foreground] rounded-xl my-1 bg-white shadow-md">
            <div onClick={toggleDropdown} className="cursor-pointer flex justify-between items-center px-4 pt-4">
                <h3 className="text-lg font-medium">{title}</h3>
                <span>{isOpen ? '-' : '+'}</span>
            </div>
            <div
                className={`transition-all duration-500 ease-in-out overflow-hidden py-2 px-4 ${
                    isOpen ? 'max-h-[500px] opacity-100 mt-2 bg-white pb-4 rounded-b-xl' : 'max-h-0 opacity-0'
                }`}
            >
                {answer}
            </div>
        </div>
    );
}