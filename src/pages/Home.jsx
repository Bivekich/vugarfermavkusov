import CatCard from "../components/CatCard";
import { getCategories } from "../sanityclient";
import { useState, useEffect } from "react";
import Banner from "../components/Banner";
const Home = () => {
  const [categories, setCategories] = useState([]); // State to hold categories

  useEffect(() => {
    const fetchCategories = async () => {
      const categories_ = await getCategories(); // Fetch categories
      setCategories(categories_); // Set categories state
    };

    fetchCategories();
  }, []);

  console.log(categories);

  return (
    <>
      <Banner />
      <div className="flex flex-row gap-5 p-4 justify-center w-fit">
        {categories.map((item) => (
          <CatCard
            title={item.title}
            image={item.imageSrc}
            to={`/search/?category=${item._id}`}
          />
        ))}
      </div>
    </>
  );
};
export default Home;
