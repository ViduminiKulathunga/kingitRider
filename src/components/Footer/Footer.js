import React, { Component, Fragment } from 'react';
import  Typography  from '@material-ui/core/Typography';
import "./Footer.css";

class Footer extends Component {
    render() {
        return (
            <Fragment>
                <div className="footer-container">
                    <Typography>
                    Knight Rider Cabs | Copyright © 2020 
                    </Typography>
                </div>
            </Fragment>
        )
    }
}

export default Footer;
