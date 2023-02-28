import React, { useCallback, useEffect, useState} from "react";
import Gallery from "react-photo-gallery";
import { Row, DropdownMenu } from "../components/design";

import FsLightbox from "fslightbox-react";
import PanoramaViewer from "../components/layout/PanoramaViewer";
import { getAllPannellum } from "../service/firebase_service";

//import Lottie from "lottie-react";
//import starAnimation from "../components/animation/star.json";

export default function PanGallery(props){

  /* INITIALIZING PICTURES */
  const [loading, setLoading] = useState();
  const [picture, setPicture] = useState([]);
  const [currentPhoto, setCurrentPhoto] = useState([]);

  const fetchData = async () => {
    setLoading(true);

    let res = await getAllPannellum();
    
    res.forEach(pan => {
      let randomSize = Math.floor(Math.random() * 100) > 50 ? [4, 3] : [1, 1] ;
      let randomFav = Math.floor(Math.random() * 100) < 50 ? 'true' : 'false' ;

      picture.push({
        src : pan.panSource,
        width : randomSize[0],
        height : randomSize[1],
        favorite : randomFav,
        json : pan.panConfig
      });
    });
     
    setLoading(false);
    console.log(picture);
    setCurrentPhoto(picture[0]);
  }
    
  useEffect(() => {
    fetchData();
  }, [picture]);

  /* INITIALIZING SEARCH */

  // Initialize the search function
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize the sort function
  const [userAction, setUserAction] = useState(0);

  // Initialize our sort functions
  const compareZToA = (a, b) => (a.src < b.src ? 1 : -1);
  const compareAToZ = (a, b) => (a.src > b.src ? 1 : -1);
  
  // Initialize our filter functions
  const compareFav = (a) => (a.favorite === "true" ? 1 : -1);

  let sort = [
    {
        id : 0,
        name : "A - Z",
        function :  compareAToZ
    },{
        id : 1,
        name : "Z - A",
        function :  compareZToA
    },{
        id : 2,
        name : "My favorites",
        function : compareFav
    }
  ];

  const handleSearchTerm = (e) => {
    let value = e.target.value;
    setSearchTerm(value);
  };

  const getData = (data) =>{
    console.log(sort[data].id + " " + sort[data].name);
    setUserAction(data);
  }  
  
  /* UPDATING PART */
  
  let photoUpdate = picture?.filter((photos) =>{
    return photos.src.includes(searchTerm);
  })
  // Filter
  .filter(sort[userAction].function)
  // Sort
  .sort(sort[userAction].function)

  /* VARIABLES */

  const [toggler, setToggler] = useState(false);
  const ref = React.createRef();

  const imageRenderer = useCallback(
    ({ index, left, top, key, photo }) => (
      <div className="mb-6 absolute" style={{height: photo.height, width: photo.width, top: top, left: left}} key={key} index={index}>
        <img alt={photo.title} src={photo.src} style={{height: photo.height, width: photo.width}}
          onClick={() => {
              setCurrentPhoto(photo);
              setToggler(!toggler);
            }
          }
        />
        <div className="absolute top-2 right-4 text-gray-100 text-base font-bold">
          {
            //<Lottie animationData={starAnimation} loop={true} style={{height: "30px", width :"30px"}} />;
          }

          {
            photo.favorite === "false" ? (
              <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={1.5} stroke="#ffff00" className="w-6 h-6">
                <path strokeLinecap="round" strokeLinejoin="round" d="M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.563.563 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.563.563 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z" />
              </svg>
            ) : (
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="#ffff00" className="w-6 h-6">
                <path fillRule="evenodd" d="M10.788 3.21c.448-1.077 1.976-1.077 2.424 0l2.082 5.007 5.404.433c1.164.093 1.636 1.545.749 2.305l-4.117 3.527 1.257 5.273c.271 1.136-.964 2.033-1.96 1.425L12 18.354 7.373 21.18c-.996.608-2.231-.29-1.96-1.425l1.257-5.273-4.117-3.527c-.887-.76-.415-2.212.749-2.305l5.404-.433 2.082-5.006z" clipRule="evenodd" />
              </svg>
            )
          }
        </div>
      </div>
  ), [toggler]);
  // Use the callback on toggler as the FsLightbox will update the value of it when its closed

  return(
    <>
      <h2 className="my-5 text-gray-800 text-3xl font-bold">Gallery</h2>
      <hr className="border-b-2 border-b-black "/>
      <Row justify="justify-between" gap="gap-2" className="my-5">
        <DropdownMenu onSubmit={getData} sort={sort} valueChangeCallback={getData}></DropdownMenu>
        <div className="flex">
          <input className="inline-flex w-96 px-4 py-2 items-center content-center rounded text-base leading-none text-black shadow-lg" type="text" name="searchBar" id="serachBar" placeholder="Search..." onChange={handleSearchTerm}></input>  
        </div>
      </Row>

      {
        !loading && picture.length > 0 ? (
            <Gallery 
              photos={photoUpdate} direction={"column"} margin={10} 
              renderImage={imageRenderer}
            />        
          ) : (
            <p className="w-full text-center mt-12">Sorry, there's no file corresponding to your search</p>
          )           
      }
      
      <FsLightbox
        toggler={toggler}
        sources={[
          <div style={{ width: "1000px", height: "600px" }}>
            <PanoramaViewer forwardedRef={ref} src={currentPhoto.src} config={currentPhoto.json}/>  
          </div>
        ]}
      />
    </>
  )
}