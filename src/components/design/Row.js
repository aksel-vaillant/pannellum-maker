export default function Row(props) {
    return(
        <>
            <div className={`flex flex-row justify-between gap-7 mb-10 items-center ` + props.className}>
                {props.children}
            </div>
        </>
    );
}