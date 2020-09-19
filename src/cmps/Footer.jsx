import { Instagram, WhatsApp } from '@material-ui/icons';
import React from 'react'
import { connect } from 'react-redux'
import { Link } from 'react-router-dom'
import {
    // EmailShareButton,
    FacebookShareButton,
    // InstapaperShareButton,
    // LineShareButton,
    LinkedinShareButton,
    // LivejournalShareButton,
    // MailruShareButton,
    // OKShareButton,
    // PinterestShareButton,
    // PocketShareButton,
    RedditShareButton,
    TelegramShareButton,
    // TumblrShareButton,
    TwitterShareButton,
    // ViberShareButton,
    // VKShareButton,
    WhatsappShareButton,
    // WorkplaceShareButton
  } from "react-share";

  import {
    // EmailIcon,
    FacebookIcon,
    // FacebookMessengerIcon,
    // InstapaperIcon,
    // LineIcon,
    LinkedinIcon,
    // LivejournalIcon,
    // MailruIcon,
    // OKIcon,
    // PinterestIcon,
    // PocketIcon,
    RedditIcon,
    TelegramIcon,
    // TumblrIcon,
    TwitterIcon,
    // ViberIcon,
    // VKIcon,
    // WeiboIcon,
    WhatsappIcon,
    // WorkplaceIcon
  } from "react-share";
  
export function Footer({loggedInUser}) {
    return (
        <footer className='mt10'>
            
        <div className="flex justify-around">
            <FacebookShareButton url='https://www.youtube.com/'>
                <FacebookIcon round={true}/>
            </FacebookShareButton>
            <WhatsappShareButton url='https://www.youtube.com/'>
                <WhatsappIcon round={true}/>
            </WhatsappShareButton>
            <LinkedinShareButton url='https://www.youtube.com/'>
                <LinkedinIcon round={true}/>
            </LinkedinShareButton>
            <RedditShareButton url='https://www.youtube.com/'>
                <RedditIcon round={true}/>
            </RedditShareButton>
            <TelegramShareButton url='https://www.youtube.com/'>
                <TelegramIcon round={true}/>
            </TelegramShareButton>
            <TwitterShareButton url='https://www.youtube.com/'>
                <TwitterIcon round={true}/>
            </TwitterShareButton>
        </div>
        <h2 className='mt10'>Coffee rights</h2>
        <p> Or Damari Tal Lahyani Nadav Samuel </p>
        </footer>

    )
}


