import {
  FunctionComponent,
  JSXElementConstructor,
  Key,
  ReactElement,
  ReactNode,
  ReactPortal,
  useEffect,
  useState,
} from "react";
import { Link, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "../../utils/hooks";
import { fetchProductById, saveComment } from "@/redux/productsSlice";
import Layout from "../Layout/Layout";
import Loader from "../Loader/Loader";
import "./ProductDetail.css";

const ProductDetail: FunctionComponent = () => {
  const { id } = useParams<{ id: string }>();
  const dispatch = useAppDispatch();
  const product = useAppSelector(
    (state: { products: { productById: any } }) => state.products.productById
  );
  const loading = useAppSelector(
    (state: { products: { loading: any } }) => state.products.loading
  );
  const {
    title,
    description,
    price,
    thumbnail,
    comments,
    images,
    similarProducts,
  } = product;
  const [comment, setComment] = useState({
    name: "",
    email: "",
    body: "",
  });

  const handleCommentSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (id !== undefined) {
      const commentSet = { ...comment, productId: id };
      dispatch(saveComment(commentSet));
      setComment({
        name: "",
        email: "",
        body: "",
      });
      dispatch(fetchProductById(id));
    }
  };

  const handleCommentChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setComment((prevComment) => ({
      ...prevComment,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (id !== undefined) dispatch(fetchProductById(id));
  }, [id, dispatch]);

  return (
    <Layout>
      <div className="container">
        {loading && <Loader />}
        <section className="productDetail">
          <h2 className="title">{title ? title : "Untitled"}</h2>
          <img
            className="mainImg"
            src={thumbnail ? thumbnail.url : "/product-placeholder.png"}
            alt="product image"
          />
          <ul className="listImg">
            {images &&
              images.map((image: { url: Key | null | undefined }) => (
                <li key={image.url}>
                  <img
                    className="smallImg"
                    src={image.url ? image.url : "/product-placeholder.png"}
                    alt="product image"
                  />
                </li>
              ))}
          </ul>
          <p>{description ? description : "No description"}</p>
          <p className="price">{price ? price : "No price"} &#8381;</p>
          {similarProducts && similarProducts.length > 0 && (
            <div>
              <h3 className="titleSimilar">Similar Products</h3>
              <ul className="listSimilar">
                {similarProducts.map(
                  (product: {
                    id: Key | null | undefined;
                    title:
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactPortal
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                    price:
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactPortal
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                  }) => (
                    <li key={product.id}>
                      <Link className="similarProduct" to={`/${product.id}`}>
                        <p>{product.title}</p>
                        <p className="price">
                          {product.price ? product.price : "No price"} &#8381;
                        </p>
                      </Link>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
          {comments && comments.length > 0 && (
            <div>
              <h3 className="titleComments">Comments</h3>
              <ul className="listComments">
                {comments.map(
                  (comment: {
                    id: Key | null | undefined;
                    name:
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactPortal
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                    email:
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactPortal
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                    body:
                      | string
                      | number
                      | bigint
                      | boolean
                      | ReactElement<
                          unknown,
                          string | JSXElementConstructor<any>
                        >
                      | Iterable<ReactNode>
                      | ReactPortal
                      | Promise<
                          | string
                          | number
                          | bigint
                          | boolean
                          | ReactPortal
                          | ReactElement<
                              unknown,
                              string | JSXElementConstructor<any>
                            >
                          | Iterable<ReactNode>
                          | null
                          | undefined
                        >
                      | null
                      | undefined;
                  }) => (
                    <li key={comment.id} className="commentContainer">
                      <p>
                        <span>Name:</span> {comment.name}
                      </p>
                      <p>
                        <span>Email:</span> {comment.email}
                      </p>
                      <p>{comment.body}</p>
                    </li>
                  )
                )}
              </ul>
            </div>
          )}
          <form className="form" onSubmit={handleCommentSubmit}>
            <input
              className="input"
              type="text"
              name="name"
              placeholder="Имя"
              onChange={handleCommentChange}
              value={comment.name}
            />
            <input
              className="input"
              type="text"
              name="email"
              placeholder="Email"
              onChange={handleCommentChange}
              value={comment.email}
            />
            <textarea
              className="textarea"
              name="body"
              placeholder="Ваш комментарий"
              onChange={handleCommentChange}
              value={comment.body}
            />
            <button className="button">Сохранить</button>
          </form>
        </section>
      </div>
    </Layout>
  );
};

export default ProductDetail;
