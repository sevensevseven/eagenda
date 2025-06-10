'use client';
import { useState } from 'react';

export default function Dropdown() {
    const [isOpen, setIsOpen] = useState(false);

    const toggleDropdown = () => {
        setIsOpen(!isOpen);
    };

    return (
        <div className="border-b border-gray-300 py-4 cursor-pointer">
            <div onClick={toggleDropdown} className="flex justify-between items-center">
                <h3 className="text-lg font-medium">What is CuriaChronos?</h3>
                <span>{isOpen ? '-' : '+'}</span>
            </div>
            <div
                className={`mt-2 overflow-hidden transition-all duration-300 ease-in-out ${
                    isOpen ? 'max-h-40 opacity-100' : 'max-h-0 opacity-0'
                }`}
            >
                <p className="text-gray-700">
                    CuriaChronos is a platform designed to help you track court hearings and legal schedules efficiently.
                </p>
            </div>
        </div>
    );
}