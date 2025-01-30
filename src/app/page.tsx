import Error from "@/components/Error/Error";
import FoodCategory from "@/components/FoodCategory";
import HeroExperience from "@/components/HeroExperience";
import HeroMenu from "@/components/HeroMenu";
import Landing from "@/components/Landing/Landing";
import MeetChef from "@/components/MeetChef";
import { client } from "@/sanity/lib/client";

const getData = async () => {
  return await client.fetch(`
    *[_type == "food"]{
      _id,
      category,
      name,
      price,
      description,
      "imageUrl": image.asset->url
    }
  `);
};

export default async function Home() {
  const foodItems = await getData();

  return (
    <>
      <Landing />
      <FoodCategory foodItems={foodItems} />
      <HeroMenu />
      <MeetChef />
      <HeroExperience />
      <Error />
    </>
  );
}
