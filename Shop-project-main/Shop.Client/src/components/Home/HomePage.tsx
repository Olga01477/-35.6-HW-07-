import { FunctionComponent, useEffect } from "react";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { fetchInfo } from "@/redux/productsSlice";
import { Link } from "react-router-dom";
import Layout from "../Layout/Layout";
import Loader from "../Loader/Loader";
import "./HomePage.css";

const HomePage: FunctionComponent = () => {
  const dispatch = useAppDispatch();
  const overview = useAppSelector(
    (state: { products: { overview: any } }) => state.products.overview
  );
  const loading = useAppSelector(
    (state: { products: { loading: any } }) => state.products.loading
  );

  useEffect(() => {
    dispatch(fetchInfo());
  }, [dispatch]);

  return (
    <Layout>
      <div className="container">
        {loading && <Loader />}
        <section className="homePage">
          <h1 className="title">Shop.Client</h1>
          <p className="text">
            В базе данных находится{" "}
            <b className="textBold">{overview?.count} товаров</b> общей
            стоимостью <b className="textBold">{overview?.sum} &#8381;</b>
          </p>
          <Link to="/products-list" className="link">
            Перейти к списку товаров
          </Link>
          <Link to="/admin/auth/login" className="link" target="_blank">
            Перейти в систему администрирования
          </Link>
        </section>
      </div>
    </Layout>
  );
};

export default HomePage;
