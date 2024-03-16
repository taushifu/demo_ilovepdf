import React from 'react';
import './Home.css';
import mergeSS from '../../assets/mergeSS.png'
import splitSS from '../../assets/splitSS.png'
import compressSS from '../../assets/compressSS.png'
import Navbar from '../Navbar/Navbar';
import { Link } from "react-router-dom";

export default function Home() {
    return (
        <>
            <Navbar />
            <div className="container text-center home-container" style={{ marginTop: '35px' }}>
                <div className="row">
                    <div className="col" style={{ gap: "10px" }}>
                        <div className="card" style={{ width: '18rem' }}>
                            <Link to='/merge_pdf'><img src={mergeSS} className="card-img-top" alt="Text1" /></Link>
                        </div>
                    </div>
                    <div className="col" style={{ gap: "10px" }}>
                        <div className="card" style={{ width: '18rem' }}>
                            <Link to='/404'><img src={splitSS} className="card-img-top" alt="Text2" /></Link>
                        </div>
                    </div>
                    <div className="col" style={{ gap: "10px" }}>
                        <div className="card" style={{ width: '18rem' }}>
                            <Link to='/404'><img src={compressSS} className="card-img-top" alt="Text3" /></Link>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
}
