<>
<div className={styles.results}>
                {!loadingResults ? <div className='table-responsive'>
                    <table className="table table-striped table-bordered">
                        <thead>
                            <tr>
                                <th>Numar Dosar</th>
                                <th>Institutie</th>
                                <th>Obiect</th>
                                <th>Data ultimei modificari</th>
                                <th>Actiuni</th>
                            </tr>
                        </thead>
                        <tbody>
                            {
                                dosare.map((dosar, index) => {
                                    return (
                                        <>
                                        <tr key={index}>
                                            <td>{dosar.numar}</td>
                                            <td>{dosar.institutie}</td>
                                            <td>{dosar.obiect}</td>
                                            <td>{new Date(dosar.dataModificare.replace("Z", "")).getDate() + " " + months[new Date(dosar.dataModificare.replace("Z", "")).getMonth()] + " " + new Date(dosar.dataModificare.replace("Z", "")).getFullYear() + " | " + ('0' + new Date(dosar.dataModificare.replace("Z", "")).getHours()).slice(-2) + ":" + ('0' + new Date(dosar.dataModificare.replace("Z", "")).getMinutes()).slice(-2)}</td>
                                            <td>
                                                <Button 
                                                    className='m-1'
                                                    variant="secondary"
                                                    onClick={() => {
                                                        var arr = open.slice();
                                                        arr[index] = !open[index];
                                                        setOpen(arr);
                                                    }} 
                                                    aria-expanded={open[index]} 
                                                    aria-controls={`${index}`}
                                                >Vezi Lista Parti</Button>
                                                <button className='btn btn-primary m-1' onClick={e => handlePush(e, dosar, index)}>{!pushed.state && index == pushed.index ? "Se adauga..." : "Adaugare in lista de dosare"}</button>
                                            </td>
                                        </tr>
                                        <tr>
                                            <td colSpan={5}>
                                                <Collapse in={open[index]}>
                                                {typeof dosar.parti != "undefined" ? <div className='table-responsive mt-3' id={`${index}`}>
                                                    <table className='table table-striped table-bordered'>
                                                        <thead>
                                                            <tr>
                                                                <th>Nume Parte</th>
                                                                <th>Calitate Parte</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {
                                                                dosar.parti.DosarParte.map((parte, index) => {
                                                                    return (
                                                                        <tr key={index}>
                                                                            <td>{parte.nume}</td>
                                                                            <td>{parte.calitateParte}</td>
                                                                        </tr>
                                                                    )
                                                                })
                                                            }
                                                        </tbody>
                                                    </table>
                                                </div> : <p>-</p>}
                                                </Collapse>
                                            </td>
                                        </tr>
                                        </>
                                    )
                                })
                            }
                        </tbody>
                    </table>
                </div> : <p>Loading...</p>}
            </div>


            {
                dosare.map((dosar, index) => {
                    return (
                        <>
                        <tr key={index}>
                            <td>{dosar.numar}</td>
                            <td>{dosar.institutie}</td>
                            <td>{dosar.obiect}</td>
                            <td>{new Date(dosar.dataModificare.replace("Z", "")).getDate() + " " + months[new Date(dosar.dataModificare.replace("Z", "")).getMonth()] + " " + new Date(dosar.dataModificare.replace("Z", "")).getFullYear() + " | " + ('0' + new Date(dosar.dataModificare.replace("Z", "")).getHours()).slice(-2) + ":" + ('0' + new Date(dosar.dataModificare.replace("Z", "")).getMinutes()).slice(-2)}</td>
                            <td>
                                <Button 
                                    className='m-1'
                                    variant="secondary"
                                    onClick={() => {
                                        var arr = open.slice();
                                        arr[index] = !open[index];
                                        setOpen(arr);
                                    }} 
                                    aria-expanded={open[index]} 
                                    aria-controls={`${index}`}
                                >Vezi Lista Parti</Button>
                                <button className='btn btn-primary m-1' onClick={e => handlePush(e, dosar, index)}>{!pushed.state && index == pushed.index ? "Se adauga..." : "Adaugare in lista de dosare"}</button>
                            </td>
                        </tr>
                        <tr>
                            <td colSpan={5}>
                                <Collapse in={open[index]}>
                                {typeof dosar.parti != "undefined" ? <div className='table-responsive mt-3' id={`${index}`}>
                                    <table className='table table-striped table-bordered'>
                                        <thead>
                                            <tr>
                                                <th>Nume Parte</th>
                                                <th>Calitate Parte</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {
                                                dosar.parti.DosarParte.map((parte, index) => {
                                                    return (
                                                        <tr key={index}>
                                                            <td>{parte.nume}</td>
                                                            <td>{parte.calitateParte}</td>
                                                        </tr>
                                                    )
                                                })
                                            }
                                        </tbody>
                                    </table>
                                </div> : <p>-</p>}
                                </Collapse>
                            </td>
                        </tr>
                        </>
                    )
                })
            }






<div className="container my-4" key="index">
            <div className="card shadow-sm">
                <div className="card-body">
                    {/* Titles at the Top */}
                    <div className="mb-4">
                        <h6 className="text-muted">{dosar.institutie}</h6>
                        <h3 className="mb-3">{`DOSAR NR. ${dosar.numar}`}</h3>
                        <h6 className="text-muted">{"Ultima modificare - " + new Date(dosar.dataModificare.replace("Z", "")).getDate() + " " + months[new Date(dosar.dataModificare.replace("Z", "")).getMonth()] + " " + new Date(dosar.dataModificare.replace("Z", "")).getFullYear() + " | " + ('0' + new Date(dosar.dataModificare.replace("Z", "")).getHours()).slice(-2) + ":" + ('0' + new Date(dosar.dataModificare.replace("Z", "")).getMinutes()).slice(-2)}</h6>
                    </div>

                    {/* Title 1 Section */}
                    <div className="mb-4">
                        <h4 className="mb-3">Parti</h4>
                        <div className="row">
                            {expanded.title1 && (
                                <>
                                    {typeof dosar.parti != "undefined" ? (
                                        <>
                                            {dosar.parti.DosarParte.map((parte, index) => {
                                                return (
                                                    <div key={index}>
                                                        <div className="card mb-3">
                                                            <div className="card-body d-flex items-center justify-between">
                                                                {/* Left Text Section */}
                                                                <div className="flex pe-3">
                                                                    <p className="card-text text-wrap">{parte.nume}</p>
                                                                </div>

                                                                {/* Right Text Section */}
                                                                <div className="flex ps-3">
                                                                    <p className="card-text text-muted">{parte.calitateParte}</p>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </div>
                                                )
                                            })}
                                        </>
                                    ) : <p>-</p>}
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

                    {/* Footer Section */}
                    <div className="mt-4">
                        <div className="d-flex justify-content-between align-items-center">
                            <div>
                                <button className="btn btn-primary my-2 mr-2" onClick={e => handlePush(e, dosar, index)}>{!pushed.state && index == pushed.index ? "Se adauga..." : "Adaugare in lista de dosare"}</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        </>