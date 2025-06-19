


import { getListPage, getSinglePage } from "@lib/contentParser";
import { getTaxonomy } from "@lib/taxonomyParser";
import dateFormat from "@lib/utils/dateFormat";
import {sortByDate} from "@lib/utils/sortFunctions";
import { markdownify } from "@lib/utils/textConverter";
import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";

import KiswahiliBlogComponent from "components/blog/main";








const Home = () => {
 
  


  return (
   
     
       <section className="section banner relative pb-0 pt-0 mt-4">
      

        <KiswahiliBlogComponent />
         
     
      </section> 

   
   
  );
};

export default Home;


