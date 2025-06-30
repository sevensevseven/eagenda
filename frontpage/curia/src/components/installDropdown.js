'use client';
import { useState, useEffect } from 'react';
import Android from './android';
import IOS from './ios';

export default function Dropdown({title}) {
    const [isOpen, setIsOpen] = useState(false);
    const [isIOS, setIsIOS] = useState(true);

    useEffect(() => {
        const userAgent = navigator.userAgent || window.opera;
        if (/iPad|iPhone|iPod/.test(userAgent) && !window.MSStream) {
            setIsIOS(true);
        } else {
            setIsIOS(false);
        }
    }, []);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className={`bg-gradient-to-br from-white via-[--faq-bg] to-white text-[--foreground] rounded-xl my-2 shadow-lg transition-all duration-700 ease-in-out ${isOpen ? "" : "animate-pulse-scale"}`}>
            <div onClick={toggleDropdown} className="cursor-pointer flex justify-between items-center px-6 py-6">
                <h3 className="text-lg font-medium">{title}</h3>
                <span>{isOpen ? '-' : '+'}</span>
            </div>
            <div
                className={`transition-all duration-700 ease-in-out overflow-hidden px-6 rounded-b-xl ${
                    isOpen ? 'max-h-[3000px] opacity-100 mt-2 bg-white pb-6 pt-4' : 'max-h-0 opacity-0'
                }`}
            >
                <div className="flex justify-start mb-6 pl-2 pr-2">
                    <button
                        className={`px-4 py-1 ${
                            isIOS ? 'border-b-2 border-black font-medium text-black' : 'text-gray-500'
                        }`}
                        onClick={() => setIsIOS(true)}
                    >
                        iOS
                    </button>
                    <button
                        className={`px-4 py-1 ${
                            !isIOS ? 'border-b-2 border-black font-medium text-black' : 'text-gray-500'
                        }`}
                        onClick={() => setIsIOS(false)}
                    >
                        Android
                    </button>
                </div>
                {isIOS ? <IOS /> : <Android />}
            </div>
        </div>
    );
}