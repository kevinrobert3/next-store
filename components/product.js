import React from "react";
import { useRouter } from "next/router";
import Link from "next/link";

function Product({ products }) {
  return (
    <div className="flex flex-col w-full lg:flex-row">
      {products &&
        products.map((product) => {
          return (
            <div
              className="w-full h-full mb-3 lg:w-64 lg:h-64 bg-white rounded flex flex-col shadow border border-gray-300  lg:mr-5"
              key={product.id}
            >
              <div className="bg-white rounded flex-1">
                {/* <img
                  title={product.Name}
                  className="w-full h-64 object-cover object-center rounded-t cursor-pointer"
                  alt={product.Name}
                  src={product.Image[0]}
                ></img> */}
              </div>
              <div className="bg-white rounded-b flex flex-col py-4 pl-2 leading-relaxed lg:py-0">
                <Link
                  href={{
                    pathname: "/product/" + `${product.slug_name}`,
                    query: { key: `${product.id}` },
                  }}
                  // as={`/product/${product.slug_name}`}
                >
                  <a className="cursor-pointer hover:underline font-medium text-base mb-1 ml-1">
                    {product.Name}
                  </a>
                </Link>

                <span className="text-sm mb-2 ml-1">Kshs {product.Price}</span>
                <div className="flex flex-row ml-1">
                  <div className="rounded-full h-2 w-2 lg:h-3 lg:w-3 bg-orange-400 mr-1"></div>
                  <div className="rounded-full h-2 w-2 lg:h-3 lg:w-3 bg-red-400 mr-1"></div>
                  <div className="rounded-full h-2 w-2 lg:h-3 lg:w-3 bg-teal-400 mr-1"></div>
                </div>
              </div>
            </div>
          );
        })}
    </div>
  );
}

export default Product;
