import React, { useEffect, useState } from "react";
import Loader from "./Loader";

const Image = () => {
  const [images, setImages] = useState([]);
  const [loading, setLoading] = useState();
  const [bookmark,setBookmark]=useState()
  const imgApiHit = async () => {
    try {
    setLoading(true)
      const res = await fetch("https://picsum.photos/v2/list?page=7&limit=50");
      const data = await res.json();
      setImages(data);
    } catch (error) {
      console.log(error);
    } finally{
        setLoading(false)
    }
  };
  useEffect(() => {
    imgApiHit();
    if (images.count < 1) setLoading(!loading);
  }, []);
  return (
    <div className="w-full h-screen">
      {loading ? 
      <Loader/>   :   images.map((elem) => {
          return (
            <div
              key={elem.id}
              className="p-2 group rounded-2xl m-2 shadow-xl break-inside-avoid bg-white relative "
            >
              <img
                className="object-center rounded-2xl"
                src={elem.download_url}
              ></img>
              <div className=" absolute top-5 right-5 text-xl text-white rounded-2xl md:group-hover:opacity-100 opacity-0 duration-200">
                <i onClick={()=>{setBookmark(!bookmark)}} className={`ri-bookmark-${bookmark?"fill":"line"}`}></i>
              </div>
              <div className="h-0 overflow-hidden duration-400 group-hover:h-7">{elem.author}</div>
            </div>
          );
        })
      }
    </div>
  );
};

export default Image;
