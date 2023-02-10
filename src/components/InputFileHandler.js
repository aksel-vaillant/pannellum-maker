import React, {useState} from 'react';

export default function InputFileHandler({parentCallback}){

    const [selectedFile, setSelectedFile] = useState();
	const [isSelected, setIsSelected] = useState(false);

	const changeHandler = (event) => {
        let myFile = event.target.files[0];
		setIsSelected(true);

        let fileToURL = URL.createObjectURL(myFile);

        setSelectedFile(fileToURL);
        parentCallback(fileToURL);
	};

    async function changeURLHandler (e) {
        let myURL = e.target.value;
        setIsSelected(true);

        let response = await fetch(e.target.value);
        let data = await response.blob();
        console.log(data);
        let fileToURL = new File([data], "image", {type : data.type, size : data.size});        
        
        setSelectedFile(URL.createObjectURL(fileToURL));        
        parentCallback(myURL);
    }

	/*const handleSubmission = () => {
        // Permet de gérer l'envoie en BDD -- bibliothèque axios
	};*/

    return (
        <>
            <div className="mt-4 mx-auto flex flex-col justify-center items-center gap-y-4 text-black text-center">
                <h1 className="text-3xl text-bold mb-6 flex flex-row gap-x-1 justify-center">Import your 36
            
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-6 h-6 mt-2">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M2.036 12.322a1.012 1.012 0 010-.639C3.423 7.51 7.36 4.5 12 4.5c4.638 0 8.573 3.007 9.963 7.178.07.207.07.431 0 .639C20.577 16.49 16.64 19.5 12 19.5c-4.638 0-8.573-3.007-9.963-7.178z" />
                    <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                photos
                </h1>

                <label htmlFor="upload" className="w-56 flex flex-row justify-center gap-x-1 py-2 px-2 text-center rounded-full hover:cursor-pointer bg-gray-800 hover:bg-gray-900 text-white font-medium">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="currentColor" className="w-5 h-5 mt-0.5">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M3 16.5v2.25A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75V16.5M16.5 12L12 16.5m0 0L7.5 12m4.5 4.5V3" />
                    </svg>
                    Upload file
                </label>
                <input id="upload" type="file" accept="image/*" className="block opacity-0 absolute" onChange={changeHandler}/>

                <p className='text-center'>----------- OR -----------</p>

                <input type="text" id="with-email" onChange={changeURLHandler} className="w-56 rounded-full appearance-none border border-gray-300 py-2 px-4 bg-white text-gray-700 placeholder-gray-400 placeholder:text-center shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-600 focus:border-transparent" name="url" placeholder="Enter your image's URL"/>
            
                {isSelected ? (
                        <img className='max-h-64' src={selectedFile} />                        
                    ) : (
                        ""
                    )
                }
            </div>
        </>
    )
}
