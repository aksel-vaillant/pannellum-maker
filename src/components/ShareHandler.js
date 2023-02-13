import React from "react";
import { EmailShareButton, EmailIcon, FacebookMessengerShareButton, FacebookMessengerIcon, LinkedinShareButton, LinkedinIcon, TwitterShareButton, TwitterIcon, FacebookShareButton, FacebookIcon } from 'react-share';
import Divider from "@material-ui/core/Divider";
import ClipboardCopy from "./design/CopyButton";

export default function ShareHandler(props){
    return(
        <>
        <div className="border border-black shadow-inner shadow-xl ml-40 w-1/4 bg-white shadow-lg rounded-2xl">
            <div className="mt-4 flex justify-center">
                <h1 className="mb-2 text-2xl font-medium text-gray-800">
                    Share on social
                </h1>
            </div>
            <div className="flex justify-center">
                <br></br>
                <p className="text-xs text-gray-400">
                    Tell your network about your pannellum
                </p>
            </div>
            <div className="my-4 flex justify-center">
                <FacebookShareButton
                url={'https://www.example.com'}
                quote={'Dummy text!'}
                >
                <FacebookIcon size={32} round />
                </FacebookShareButton>

                <TwitterShareButton 
                className="mx-4"
                url={'https://www.example.com'}
                quote={'Dummy text!'}
                >
                <TwitterIcon size={32} round />
                </TwitterShareButton>

                <LinkedinShareButton
                url={'https://www.example.com'}
                quote={'Dummy text!'}
                >
                <LinkedinIcon size={32} round />
                </LinkedinShareButton>
            </div>
            <div className="my-4 mx-14">
                <Divider />
            </div>
            <div className="flex justify-center">
                <h1 className="mb-2 text-2xl font-medium text-gray-800">
                    Or share to close friends
                </h1>
            </div>
            <div className="flex justify-center text-xs text-gray-400">
                <p className="text-center">
                    Your friends will see how much Pannellum Maker's<br></br> easy and fast to handle
                </p>
            </div>
            <div className="my-4 flex justify-center">
                <FacebookMessengerShareButton
                className="mr-2"
                url={'https://www.example.com'}
                quote={'Dummy text!'}
                >
                <FacebookMessengerIcon size={32} round />
                </FacebookMessengerShareButton>

                <EmailShareButton
                className="ml-2"
                url={'https://www.example.com'}
                quote={'Dummy text!'}
                >
                <EmailIcon size={32} round />
                </EmailShareButton>
            </div>
            <div className="my-4 flex justify-center">
                <ClipboardCopy copyText="Your link"/>
            </div>
        </div>
        </>
    );
}


