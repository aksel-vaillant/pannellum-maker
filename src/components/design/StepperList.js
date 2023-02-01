export default function StepperList(props){
    return(
        <ol className="mb-10 flex items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
            {props.children}
        </ol>
    )
}