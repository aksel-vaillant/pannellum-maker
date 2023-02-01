function StepperSeparator(){
    return(
        <span className="hidden sm:inline-flex sm:ml-2"></span>    
    )
}

export default function StepperItem(props){

    let validatedColor = props.validated ? `text-blue-500 dark:text-blue-500` : "";
    let validatedIcon = props.validated ? <svg aria-hidden="true" className="w-4 h-4 mr-2 sm:w-5 sm:h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd"></path></svg> : <span className="mr-2">{props.number}</span>
    let lastLi = props.isLast ? "" : `md:w-full after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700`;
    let lastSpan = props.isLast ? "" : `after:content-['/'] sm:after:hidden after:mx-2 after:font-light after:text-gray-200 dark:after:text-gray-500`;
    
    let current = props.current ? `text-black font-bold` : validatedColor;

    let separatedText = props.name.split(" ").map(function(value) {
        return (
            <>{value}<StepperSeparator/></>  
        )
    })

    return(
        <li className={`flex items-center ${current} ${lastLi}`}>
            <span className={`flex items-center ${lastSpan}`}>
                {validatedIcon}
                {separatedText}
            </span>
        </li>
    )
}