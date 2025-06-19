import Link from "next/link";
import { FaRegCalendar } from "react-icons/fa";

import KiswahiliBlogComponent from "components/blog/main";

const Home = () => {
  return (
    <div className="bg-body min-h-screen">
      <section className="section banner relative pb-0 pt-0 mt-4">
        <KiswahiliBlogComponent />
      </section> 
    </div>
  );
};

export default Home;