import React, { Fragment } from 'react';
import './Modal.css';

import Backdrop from '../Backdrop/Backdrop';
import Wrapper from '../Wrapper/Wrapper';


function Modal(props){
    return(

       <Wrapper>
           <Backdrop show={props.show}/>
            <div className="Modal"
                style={{
                    transform: props.show ? 'translateY(0)': 
                        'translateY(-100vh)'
                }}>
                    <div className="Child">
                        <div className="Loader"></div>
                        <p>{props.children}</p>
                    </div>
            </div>
       </Wrapper>
    );
}

export default Modal;