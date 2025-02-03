import React from 'react'
import PropTypes from 'prop-types'
import styles from "./styles.module.css"

const Sedinta = ({ data, changeView, numar, ora }) => {
    return (
        <div className={styles.container + " container px-auto py-4"}>
            <div style={{display: "flex", flexDirection: "row", justifyContent: "space-between", alignItems: "center", marginBottom: "1rem"}}>
                <h1>Lista de Sedinta</h1>
                <button className='btn btn-success my-1' onClick={() => changeView(false)}>Inapoi</button>
            </div>
            <div className='table-responsive'>
                <table className="table table-striped table-bordered">
                    <thead>
                        <tr>
                            <th style={{maxWidth: 10}}>#</th>
                            <th>Numar</th>
                            <th>Materie Juridica</th>
                            <th>Stadiu Procesual</th>
                            <th>Ora Estimata</th>
                        </tr>
                    </thead>
                    <tbody>
                        {
                            data.map((sedinta, index) => {
                                return (
                                    <tr key={index} className = {sedinta.numar == numar ? styles.boldrow : sedinta.ora == ora ? styles.outlined_row : ""}>
                                        <td>{sedinta.numar == numar ? <strong>{index + 1}</strong> : index + 1}</td>
                                        <td>{sedinta.numar == numar ? <strong>{sedinta.numar}</strong> : sedinta.numar}</td>
                                        <td>{sedinta.numar == numar ? <strong>{sedinta.categorieCazNume}</strong> : sedinta.categorieCazNume}</td>
                                        <td>{sedinta.numar == numar ? <strong>{sedinta.stadiuProcesualNume}</strong> : sedinta.stadiuProcesualNume}</td>
                                        <td>{sedinta.numar == numar ? <strong>{sedinta.ora}</strong> : sedinta.ora}</td>
                                    </tr>
                                )
                            })
                        }
                    </tbody>
                </table>
            </div>
        </div>
    )
}

Sedinta.propTypes = {
    data: PropTypes.array.isRequired,
    changeView: PropTypes.func.isRequired,
    numar: PropTypes.any.isRequired,
    ora: PropTypes.any.isRequired
}

export default Sedinta