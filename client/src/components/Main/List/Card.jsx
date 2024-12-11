import React, {useState} from 'react';

const Card = () => {
    const [expanded, setExpanded] = useState({
        title1: true,
        title2: false,
    });

    const toggleExpand = (section) => {
        setExpanded((prev) => ({
            ...prev,
            [section]: !prev[section],
        }));
    };

    return (
        <div className="container my-4" style={{ maxWidth: "1200px" }}>
            <div className="card shadow-sm">
                <div className="card-body">
                    {/* Titles at the Top */}
                    <div className="mb-4">
                        <h6 className="text-muted">Subtitle 1</h6>
                        <h4 className="mb-3">TITLE</h4>
                        <h6 className="text-muted">Subtitle 2</h6>
                    </div>

                    {/* Title 1 Section */}
                    <div className="mb-4">
                        <h4 className="mb-3">Parti</h4>
                        <div className="row">
                            {expanded.title1 && (
                                <>
                                    <div className="col-md-6">
                                        <div className="card mb-3">
                                            <div className="card-body d-flex">
                                                {/* Left Text Section */}
                                                <div className="flex-grow-1 pe-3 border-end">
                                                    <p className="card-text text-wrap">A A A A AA AAA AAAA A A A AAAAAAAAA AAAA</p>
                                                </div>

                                                {/* Right Text Section */}
                                                <div className="flex-grow-1 ps-3">
                                                    <p className="card-text text-muted">Smaller Text Section</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card mb-3">
                                            <div className="card-body d-flex">
                                                {/* Left Text Section */}
                                                <div className="flex-grow-1 pe-3 border-end">
                                                    <p className="card-text">Larger Text Section</p>
                                                </div>

                                                {/* Right Text Section */}
                                                <div className="flex-grow-1 ps-3">
                                                    <p className="card-text text-muted">Smaller Text Section</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card mb-3">
                                            <div className="card-body d-flex">
                                                {/* Left Text Section */}
                                                <div className="flex-grow-1 pe-3 border-end">
                                                    <p className="card-text text-wrap">A A A A AA AAA AAAA A A A AAAAAAAAA AAAA</p>
                                                </div>

                                                {/* Right Text Section */}
                                                <div className="flex-grow-1 ps-3">
                                                    <p className="card-text text-muted">Smaller Text Section</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="col-md-6">
                                        <div className="card mb-3">
                                            <div className="card-body d-flex">
                                                {/* Left Text Section */}
                                                <div className="flex-grow-1 pe-3 border-end">
                                                    <p className="card-text">Larger Text Section</p>
                                                </div>

                                                {/* Right Text Section */}
                                                <div className="flex-grow-1 ps-3">
                                                    <p className="card-text text-muted">Smaller Text Section</p>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )}
                            <div className="text-center">
                                <button
                                    className="btn btn-link"
                                    onClick={() => toggleExpand("title1")}
                                >
                                    {expanded.title1 ? "Collapse" : "Expand"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Title 2 Section */}
                    <div className="mb-4">
                        <h4 className="mb-3">Sedinte</h4>
                        <div className="row">
                            {expanded.title2 && (
                            <>
                                <div className="col-md-6">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            {/* First Text Section */}
                                            <div className="mb-3 pb-3 border-bottom">
                                                <h5 className="card-text">First Text Section</h5>
                                            </div>

                                            {/* Second Text Section */}
                                            <div className="mb-3 pb-3 border-bottom">
                                                <p className="card-text">Second Text Section</p>
                                            </div>

                                            {/* Button Section */}
                                            <div className="text-center">
                                                <button className="btn btn-primary">Big Button</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div className="col-md-6">
                                    <div className="card mb-3">
                                        <div className="card-body">
                                            {/* First Text Section */}
                                            <div className="mb-3 pb-3 border-bottom">
                                                <h5 className="card-text">First Text Section</h5>
                                            </div>

                                            {/* Second Text Section */}
                                            <div className="mb-3 pb-3 border-bottom">
                                                <p className="card-text">Second Text Section</p>
                                            </div>

                                            {/* Button Section */}
                                            <div className="text-center">
                                                <button className="btn btn-primary">Big Button</button>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </>
                            )}
                            <div className="text-center">
                                <button
                                    className="btn btn-link"
                                    onClick={() => toggleExpand("title2")}
                                >
                                    {expanded.title2 ? "Collapse" : "Expand"}
                                </button>
                            </div>
                        </div>
                    </div>

                    {/* Footer Section */}
                    <div className="mt-4">
                    <div className="d-flex justify-content-between align-items-center">
                        <div>
                        <button className="btn btn-secondary my-2 mr-2">Button 1</button>
                        <button className="btn btn-secondary my-2 mr-2">Button 2</button>
                        </div>
                        <div>
                        <p className="fst-italic mb-0">
                            This is an italic footer in the bottom-right corner.
                        </p>
                        </div>
                    </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Card;