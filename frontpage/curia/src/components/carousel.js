'use client';

import { useState } from 'react';
import { getFeatures } from '@/util';
import Card from '@/components/card';

export default function Carousel() {
    const features = getFeatures();
    const [currentIndex, setCurrentIndex] = useState(0);

    const goToPrevious = () => {
        setCurrentIndex((prevIndex) => (prevIndex === 0 ? features.length - 1 : prevIndex - 1));
    };

    const goToNext = () => {
        setCurrentIndex((prevIndex) => (prevIndex === features.length - 1 ? 0 : prevIndex + 1));
    };

    return (
        <div className="w-full flex flex-col items-center mb-8 mx-1">
            <div className="relative w-full max-w-md overflow-hidden">
                {/* Blurred left edge */}
                <div className="absolute left-0 top-0 h-full w-10 bg-gradient-to-r from-[--background] to-transparent pointer-events-none z-20"></div>
                {/* Blurred right edge */}
                <div className="absolute right-0 top-0 h-full w-10 bg-gradient-to-l from-[--background] to-transparent pointer-events-none z-20"></div>

                <div
                    className="flex m-2 transition-transform duration-500"
                    style={{ transform: `translateX(-${currentIndex * 100}%)` }}
                >
                    {features.map((feature, index) => (
                        <div className="min-w-full flex justify-center" key={index}>
                            <Card
                                title={feature.title}
                                description={feature.description}
                                imageSrc={feature.img || null}
                            />
                        </div>
                    ))}
                </div>
                <button onClick={goToPrevious} className="absolute left-2 top-1/2 -translate-y-1/2 z-30 px-3 py-1 bg-gray-200 rounded">‹</button>
                <button onClick={goToNext} className="absolute right-2 top-1/2 -translate-y-1/2 z-30 px-3 py-1 bg-gray-200 rounded">›</button>
            </div>
            <div className="flex mt-4 space-x-2">
                {features.map((_, index) => (
                    <div
                        key={index}
                        className={`h-2 w-2 rounded-full ${index === currentIndex ? 'bg-gray-800' : 'bg-gray-400'}`}
                    />
                ))}
            </div>
        </div>
    );
}