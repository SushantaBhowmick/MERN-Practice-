import { useRef, useState } from "react";
import { accordionData } from "../constant/data";
import { ChevronDown, ChevronUp } from "lucide-react";

const Accordion = () => {
  const [openItems, setOpenItems] = useState<number[]>([]);
  const ref = useRef<HTMLDivElement>(null);

  const handlerOpen = (id: number) => {
    setOpenItems((prev) =>
      prev.includes(id) ? prev.filter((item) => item !== id) : [...prev, id]
    );
  };


// useEffect(() => {
//   if (isOpen && ref.current) {
//     ref.current.scrollIntoView({ behavior: "smooth", block: "start" });
//   }
// }, [isOpen]);

  return (
    <div>
      <div className="min-h-screen flex justify-center mt-10" ref={ref}>
        <div>
          {accordionData &&
            accordionData.map((item) => {
              const isOpen = openItems.includes(item.id)
              return (
                <div className="flex flex-col  w-[600px]" key={item.id}>
                <div
                  onClick={() => handlerOpen(item.id)}
                  className=" flex border p-5 justify-between items-center mt-5  border-gray-300 rounded-lg  shadow-sm"
                >
                  <div className="w-full text-left px-4 py-3 bg-gray-100 hover:bg-gray-200 rounded-t-lg font-medium focus:outline-none">
                    {item.title}
                  </div>
                  <div className="">
                    <button className=" cursor-pointer">
                      {isOpen? <ChevronUp /> : <ChevronDown />}
                    </button>
                  </div>
                </div>
                <div 
               className={`transition-all overflow-hidden duration-400 ease-in-out px-4 bg-white rounded-b-lg border-t border-gray-200 ${
    isOpen ? 'max-h-40 py-3 opacity-100' : 'max-h-0 py-0 opacity-0'
  }`}
               >
                  {isOpen && item.content}
                </div>
              </div>
              )
            })}
        </div>
      </div>
    </div>
  );
};

export default Accordion;
