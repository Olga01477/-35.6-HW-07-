import { FunctionComponent, useState, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { fetchProducts, fetchFilteredProducts } from "@/redux/productsSlice";
import Layout from "../Layout/Layout";
import Loader from "../Loader/Loader";
import ListItem from "./ListItem/ListItem";

import "./ProductsList.css";

const ProductsList: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const products = useAppSelector(
    (state: { products: { products: any } }) => state.products.products
  );
  const loading = useAppSelector(
    (state: { products: { loading: any } }) => state.products.loading
  );
  const [filter, setFilter] = useState({
    title: "",
    description: "",
    priceFrom: 0,
    priceTo: 100000000000,
  });

  const handleFilterChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFilter((prevFilter) => ({
      ...prevFilter,
      [name]: value,
    }));
  };

  const handleFilterSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    dispatch(fetchFilteredProducts(filter));
  };

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

  useEffect(() => {
    console.log("Filter changed:", filter);
  }, [filter]);

  console.log("Products in app:", products);

  return (
    <Layout>
      <div className="container">
        <section className="productsList">
          <h1 className="title">Список товаров ({products.length})</h1>
          <form className="form" action="" onSubmit={handleFilterSubmit}>
            <input
              className="input"
              type="text"
              placeholder="Название товара"
              name="title"
              onChange={handleFilterChange}
            />
            <input
              className="input"
              type="text"
              placeholder="Описание товара"
              name="description"
              onChange={handleFilterChange}
            />
            <input
              className="input"
              type="number"
              placeholder="Цена от"
              name="priceFrom"
              onChange={handleFilterChange}
            />
            <input
              className="input"
              type="number"
              placeholder="Цена до"
              name="priceTo"
              onChange={handleFilterChange}
            />
            <button className="button">Поиск</button>
          </form>
          {loading && <Loader />}
          <ul className="list">
            {Array.isArray(products)
              ? products.map((product) => (
                  <ListItem key={product.id} product={product} />
                ))
              : "No products found"}
          </ul>
        </section>
      </div>
    </Layout>
  );
};

export default ProductsList;
