import { Instagram, WhatsApp } from '@material-ui/icons';
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import FacebookIcon from '@material-ui/icons/Facebook';
import WhatsAppIcon from '@material-ui/icons/WhatsApp';
import LinkedInIcon from '@material-ui/icons/LinkedIn';
import CopyrightIcon from '@material-ui/icons/Copyright';

import {
    FacebookShareButton,
    LinkedinShareButton,
    WhatsappShareButton,
} from "react-share";
import { Timer } from './Timer';


export function Footer({ loggedInUser }) {


    return (


        <footer className='flex justify-between align-center'>
            <div className="flex">
                <FacebookShareButton url='https://www.youtube.com/'>
                    <FacebookIcon/>
                </FacebookShareButton>
                <WhatsappShareButton url='https://www.youtube.com/'>
                    <WhatsAppIcon  />
                </WhatsappShareButton>
                <LinkedinShareButton url='https://www.youtube.com/'>
                    <LinkedInIcon  />
                </LinkedinShareButton>
               
            </div>
            <p className='flex align-center'><CopyrightIcon/> <span>Tal Lahyani Nadav Samuel Or Damari</span>  </p>
           {/* <Timer/> */}
        </footer>

    )
}


