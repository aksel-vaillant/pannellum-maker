import React from "react";
import Gallery from "react-photo-gallery";
import { useState, useEffect } from "react";
import dropdownMenu from "../components/design/dropdownMenu";
import { Row } from "../components/design";
import Example from "../components/design/dropdownMenu";


export default function PanGallery(props){
  
  const photos = [
    {
      src: "https://source.unsplash.com/2ShvY8Lf6l0/800x599",
      width: 4,
      height: 3,
      favorite : "true"
    },
    {
      src: "https://source.unsplash.com/Dm-qxdynoEc/800x799",
      width: 1,
      height: 1
    },
    {
      src: "https://source.unsplash.com/qDkso9nvCg0/600x799",
      width: 3,
      height: 4
    },
    {
      src: "https://source.unsplash.com/iecJiKe_RNg/600x799",
      width: 3,
      height: 4
    },
    {
      src: "https://source.unsplash.com/epcsn8Ed8kY/600x799",
      width: 3,
      height: 4
    },
    {
      src: "https://source.unsplash.com/NQSWvyVRIJk/800x599",
      width: 4,
      height: 3
    },
    {
      src: "https://source.unsplash.com/zh7GEuORbUw/600x799",
      width: 3,
      height: 4
    },
    {
      src: "https://source.unsplash.com/PpOHJezOalU/800x599",
      width: 4,
      height: 3
    },
    {
      src: "https://source.unsplash.com/I1ASdgphUH4/800x599",
      width: 4,
      height: 3
    },
    {
      src: "https://source.unsplash.com/XiDA78wAZVw/600x799",
      width: 3,
      height: 4
    },
    {
      src: "https://source.unsplash.com/x8xJpClTvR0/800x599",
      width: 4,
      height: 3
    },
    {
      src: "https://source.unsplash.com/u9cG4cuJ6bU/4927x1000",
      width: 4927,
      height: 1000
    },
    {
      src: "https://source.unsplash.com/qGQNmBE7mYw/800x599",
      width: 4,
      height: 3
    },
    {
      src: "https://source.unsplash.com/NuO6iTBkHxE/800x599",
      width: 4,
      height: 3
    },
    {
      src: "https://source.unsplash.com/pF1ug8ysTtY/600x400",
      width: 4,
      height: 3
    },
    {
      src: "https://source.unsplash.com/A-fubu9QJxE/800x533",
      width: 4,
      height: 3
    },
    {
      src: "https://source.unsplash.com/5P91SF0zNsI/740x494",
      width: 4,
      height: 3
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

      {photoUpdate.length > 0 ? (<Gallery photos={photoUpdate} direction={"column"} margin={10}></Gallery>) : (<p className="w-full text-center mt-12">Sorry, there's no file corresponding to your search</p>)}           
    </>
  )
}