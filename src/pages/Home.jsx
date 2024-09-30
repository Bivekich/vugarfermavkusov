import "../styles/Home.css";
import Card from "../components/Card";
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
      <div className="product-grid">
        {/* <Card title="Брокколи" price="9999999" image="/broccoli.webp" />
        <Card title="Брокколи" price="9999999" image="/broccoli.webp" />
        <Card title="Брокколи" price="9999999" image="/broccoli.webp" />
        <Card title="Брокколи" price="9999999" image="/broccoli.webp" /> */}
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
