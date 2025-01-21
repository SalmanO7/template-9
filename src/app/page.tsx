import Checkout from "@/components/Checkout/Checkout";
import Error from "@/components/Error/Error";
import AboutUs from "@/components/Aboutus";
import FoodCategory from "@/components/FoodCategory";
import HeroExperience from "@/components/HeroExperience";
import HeroMenu from "@/components/HeroMenu";
import Landing from "@/components/Landing/Landing";
import MeetChef from "@/components/MeetChef";
export default function Home() {
  return (
    <>
       <Landing />
       <AboutUs />
       <FoodCategory />
       <HeroMenu />
       <MeetChef />
       <HeroExperience />
       <Checkout />
       <Error />  

    </>
  );
}
