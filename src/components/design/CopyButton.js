import React from "react";
import { useState } from "react";

export default function ClipboardCopy({ copyText }) {
    const [isCopied, setIsCopied] = useState(false);
  
    async function copyTextToClipboard(text) {
      if ('clipboard' in navigator) {
        return await navigator.clipboard.writeText(text);
      } else {
        return document.execCommand('copy', true, text);
      }
    }
  
    // onClick handler function for the copy button
    const handleCopyClick = () => {
      // Asynchronously call copyTextToClipboard
      copyTextToClipboard(copyText)
        .then(() => {
          // If successful, update the isCopied state value
          setIsCopied(true);
          setTimeout(() => {
            setIsCopied(false);
          }, 1500);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  
    return (
      <div className="flex border border-black rounded-lg px-3 bg-slate-100" >
        <input className="bg-slate-100" type="text" value={copyText} readOnly />
        <button className="accent-pink-500" onClick={handleCopyClick}>
          <span>{isCopied ? 'Copied!' : 'Copy'}</span>
        </button>
      </div>
    );
  }