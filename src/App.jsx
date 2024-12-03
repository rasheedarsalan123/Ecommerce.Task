import { useEffect, useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";

import { stringify } from "postcss";

function App() {
  const [item, setItem] = useState([]);
  const [filteredItems, setFilteredItems] = useState([]);
const [toggleDarkMood,setToggleDarkMood] = useState(false)
  const [inputVal, setInputVal] = useState("");
  const [quary, setQuary] = useState("");
  const FetchDta = async () => {
    try {
      const res = await fetch("https://fakestoreapi.com/products");
      const data = await res.json();
      setItem(data);
      console.log('items' ,data);
      
      setFilteredItems(data)
    } catch (error) {
      console.log("error", error);
    }
  };
  useEffect(() => {
    FetchDta();
  }, []);

  const DarkMoodColor =()=>{
    setToggleDarkMood(!toggleDarkMood)
  }

  const handleSearch = (e) => {
    const value = e.target.value
    setQuary(e.target.value);

    if (value === '') {
      setFilteredItems(item); 
    } else {
      const filtered = item.filter((item) =>
        item.category.toLowerCase().includes(value)
      );
      setFilteredItems(filtered);
    }
  };
  const handletSort=(e)=>{
const sortLotoHi = e.target.value
if( sortLotoHi === 'lowToHight' ){
  const LowPrice = [...filteredItems].sort((a,b)=> a.price - b.price);
  setFilteredItems(LowPrice)
}
else if( sortLotoHi === 'HightToLow' ){
  const HightPrice = [...filteredItems].sort((a,b)=> b.price - a.price);
  setFilteredItems(HightPrice)
}
   }
  return (
    <>
    <div className={` h-full w-full  ${toggleDarkMood && 'dark'}`}>
      <div className=' dark:bg-gray-400  flex items-center justify-center p-3 text-center'>
       <div className=" flex text-center w-[100px] px-1"> <button onClick={DarkMoodColor}>{toggleDarkMood ?'Light Mood':"Dark Mood"}</button> </div>
        <div class="container  h-auto gap-8  flex justify-center items-center px-4 sm:px-6 lg:px-8">
          <div class="relative border border-gray-400 border-opacity-15">
            <input
              onChange={handleSearch}
              type="search"
              class="h-14 w-96 pr-8 pl-5 rounded z-0 focus:shadow focus:outline-none"
              placeholder="Search anything..."
            />

            
          </div>
          <select onChange={handletSort} className="border border-black">
              <option value="">Sort</option>
              <option value="lowToHight">Low To Hight</option>
              <option value="HightToLow">Hight To Low</option>
            </select>
        </div>
        
      </div>

      <div className=" dark:bg-gray-400 flex justify-between gap-10  flex-wrap ">
        {filteredItems.map((item, index) => (
          <div key={index} className="">
            <div
              class="h-screen w-full flex   items-center justify-center 
           dark:bg-gray-800"
            >
              <article class="max-w-sm w-full bg-white rounded-lg shadow-lg overflow-hidden dark:bg-gray-700">
                <div>
                  <img
                    src={item.image}
                    alt=""
                    className=" w-[300px] h-[200px] object-contain " 
                  />
                </div>

                <div class="flex flex-col gap-1 mt-4 px-4">
                  <h2 class="text-lg font-semibold text-gray-800 dark:text-gray-50">
                    {item.category}
                  </h2>
                  <span class="font-normal text-gray-600 dark:text-gray-300">
                    High Top (Lemon Yellow)
                  </span>
                  <span class="font-semibold text-gray-800 dark:text-gray-50">
                    ${item.price}
                  </span>
                </div>

                <div class="flex gap-4 mt-4 px-4">
                  <span class="sr-only">Colors available</span>

                  <button
                    aria-label="Yellow"
                    class="p-1 border border-gray-200 dark:border-gray-500 rounded-full cursor-pointer bg-yellow-500 dark:bg-yellow-400"
                  ></button>

                  <button
                    aria-label="Red"
                    class="p-1 border border-gray-200 dark:border-gray-500 rounded-full cursor-pointer bg-red-500 dark:bg-red-400"
                  ></button>

                  <button
                    aria-label="Blue"
                    class="p-1 border border-gray-200 dark:border-gray-500 rounded-full cursor-pointer bg-blue-500 dark:bg-blue-400"
                  ></button>

                  <button
                    aria-label="Black"
                    class="p-1 border border-gray-200 dark:border-gray-500 rounded-full cursor-pointer bg-gray-800 dark:bg-gray-600"
                  ></button>
                </div>

                <div class="mt-4 p-4 border-t border-gray-200 dark:border-gray-500">
                  <button class="w-full flex justify-between items-center font-bold cursor-pointer hover:underline text-gray-800 dark:text-gray-50">
                    <span class="text-base">Add to Cart</span>
                    <svg
                      class="h-6 w-6"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        stroke-linecap="round"
                        stroke-linejoin="round"
                        stroke-width="2"
                        d="M12 6v6m0 0v6m0-6h6m-6 0H6"
                      />
                    </svg>
                  </button>
                </div>
              </article>
            </div>
          </div>
        ))}
      </div>
      </div>
    </>
  );
}

export default App;
