import React from 'react';
import './Golf.css';   
    
const ParHeader = ({par}) => {
    return(
        <div id="par-header">
            <div className="name"> Hole </div>
            {/* <div className="name"> Par </div> */}
            {
                par !== undefined ?
                    par.map((score, idx) => {
                        return(
                            <div key={idx} className="hole-number-container">
                                <div className="hole-number">
                                    {idx !== 18 ?
                                        idx+1
                                        :
                                        <div>Tot</div>}
                                </div>
                                <div className="par">
                                    {score}
                                </div>
                            </div>
                        )
                    }) : null
        }
        </div>
    );
}

export default ParHeader;