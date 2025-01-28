
import Error from "@/components/Error/Error";
import FoodCategory from "@/components/FoodCategory";
import HeroExperience from "@/components/HeroExperience";
import HeroMenu from "@/components/HeroMenu";
import Landing from "@/components/Landing/Landing";
import MeetChef from "@/components/MeetChef";
export default function Home() {
  return (
    <>
       <Landing />
       <FoodCategory />
       <HeroMenu />
       <MeetChef />
       <HeroExperience />
       <Error />  
    </>
  );
}
