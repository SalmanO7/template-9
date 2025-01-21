import Dessert from '@/components/Dessert/Dessert'
import Drink from '@/components/Drinks/Drinks'
import Experience from '@/components/Experience/Experience'
import Hero from '@/components/Hero'
import Navbar from '@/components/Landing/Landing'
import MainCours from '@/components/MainCours/MainCourse'
import PartnersAndClients from '@/components/pattnerClient/pattnerClient'
import StarterMenu from "@/components/Menu/StartMenu";

const page = () => {
  return (
    <>
    <Navbar />
    <Hero/>
    <StarterMenu/>
    <MainCours/>
    <Experience/>
    <Dessert/>
    <Drink/>	
    <PartnersAndClients/></>
  )
}

export default page