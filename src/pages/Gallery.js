import React from "react";
import Gallery from "react-photo-gallery";
import { useState, useEffect, useRef } from "react";
import dropdownMenu from "../components/design/dropdownMenu";
import { Row } from "../components/design";
import Example from "../components/design/dropdownMenu";
import StackGrid from "react-stack-grid";


export default function PanGallery(props){

  let newGrid;
  const firstUpdate = useRef(true);

  const gridRefFunction = (grid) => {
    if (firstUpdate.current) {
      firstUpdate.current = false;
      return;
  }if(newGrid){
        newGrid = grid;
    console.log(newGrid);
    newGrid.updateLayout();
  }
  };

  
  const photos = [
    {
      src: "../test2.jpeg",
      favorite : "true"
    },
    {
      src: "../coop.jpg",
      favorite : "true"
    },
    {
      src: "../test2.jpeg",
      favorite : "true"
    },
    {
      src: "../test2.jpeg",
      favorite : "true"
    },
    {
      src: "../coop.jpg",
      favorite : "true"
    }
  ];

  // Initialize the search function
  const [searchTerm, setSearchTerm] = useState("");

  // Initialize the sort function
  const [userAction, setUserAction] = useState(0);

  // Initialize our sort functions
  const compareZToA = (a, b) => (a.src < b.src ? 1 : -1);
  const compareAToZ = (a, b) => (a.src > b.src ? 1 : -1);
  
  // Initialize our filter functions
  const compareFav = (a) => (a.favorite ? true : false);

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
  
  let photoUpdate = photos.filter((photos) =>{
    return photos.src.includes(searchTerm);
  })
  // First, we realize a filter
  .filter(sort[userAction].function)
  // Then, we sort the result
  .sort(sort[userAction].function)
      
  return(
    <>
      <h1 className="text-2xl">Gallery</h1> <hr className="border-black my-5"/>
      <Row justify="justify-between" gap="gap-2" className="my-5">
        <Example onSubmit={getData} sort={sort} valueChangeCallback={getData}></Example>

        <div className="flex">
          <input className="inline-flex w-96 items-center content-center rounded pr-2.5 h-35 text-base leading-none text-black shadow-lg" type="text" name="searchBar" id="serachBar" placeholder="Recherchez..." onChange={handleSearchTerm}></input>  
        </div>
      </Row>

      {//photoUpdate.length > 0 ? (<Gallery photos={photoUpdate} direction={"column"} margin={10}></Gallery>) : (<p className="w-full text-center mt-12">Sorry, there's no file corresponding to your search</p>)}           
      }<StackGrid gridRef={gridRefFunction} columnWidth={"33.33%"} gutterWidth={20} gutterHeight={20}>
        {photoUpdate.map((photo, index) =>{(
          <figure className="block m-0" key={index}>
          <img src={photo.src}></img>
          <figcaption>{photo.src}</figcaption>
          </figure>
          );
        newGrid ? newGrid.updateLayout() : "";
        })}
        </StackGrid>
    </>
  )
}