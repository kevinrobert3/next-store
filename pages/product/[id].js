import { useRouter } from "next/router";
import AuthHoc from "../../components/hoc/authhoc";
import NavBar from "../../components/navbar";
import { loadDB } from "../../lib/config";

import { connect } from "react-redux";
import Cart from "../../components/cart";

export async function getServerSideProps(context) {
  let docID = context.query.key;

  // const router = useRouter();
  // console.log(router);
  let data = [];
  let db = loadDB().firestore();
  var docRef = db.collection("Products").doc(docID);
  await docRef
    .get()
    .then(function (doc) {
      if (doc.exists) {
        //console.log("Document data:", doc.data());
        data.push(doc.data());
        //return doc.data();
      } else {
        // doc.data() will be undefined in this case
        console.log("No such document!");
      }
    })
    .catch(function (error) {
      console.log("Error getting document:", error);
    });
  return {
    props: { data }, // will be passed to the page component as props
  };
}

const Post = ({ data, cartVisible, makeCartVisible}) => {
  // console.log(makeCartVisible);
  // console.log(cartVisible);

  const router = useRouter();
  //console.log(router);
  const { id } = router.query;
  const { key } = router.query;
  //console.log(id);
  //console.log(key);
  let className;
  //if (cartVisible===true){
    className="h-screen w-full bg-white py-0 px-8 lg:px-32 flex flex-col lg:flex-row"
  //}else{
    //className="h-screen w-full bg-white py-0 px-8 lg:px-32 flex flex-col lg:flex-row"
  //}

  return (
    <>
      <NavBar makeCartVisible={makeCartVisible} cartVisibility={cartVisible} />

      {cartVisible === true ? <Cart makeCartVisible={makeCartVisible} /> : null}

      <div className={className}>
        <div className="w-full h-screen lg:p-2 bg-white flex flex-col lg:flex-row">
          <div className="h-full w-full lg:w-3/5 bg-white flex flex-row">
            <img
              src={data[0].Image[0]}
              className="object-cover object-center h-full  lg:h-full w-3/4"
            ></img>

            <div className="mt-8 lg:mt-0 h-64 w-1/4 lg:h-full lg:w-2/5 bg-white py-2 px-3 lg:py-8 lg:px-20 flex flex-col overflow-y-auto custom-scroll">
              <div className="w-full h-auto lg:w-full lg:h-auto bg-teal-700 mb-2 lg:mb-3">
                <img src={data[0].Image}></img>
              </div>

              <div className="w-full h-auto lg:w-full lg:h-auto bg-teal-700 mb-2 lg:mb-3">
                <img src={data[0].Image}></img>
              </div>
            </div>
          </div>

          <div
            className="h-full w-full lg:w-2/5 bg-white px-1 py-4 lg:px-12 lg:py-12 flex flex-col"
            id="right-price-bar"
          >
            <span className="font-medium text-lg lg:text-xl mb-0 lg:mb-2">
              {data[0].Name}
            </span>
            <span className="mb-1 lg:mb-5">
              <span className="text-red-500 text-base lg:text-lg font-semibold mr-1">
                Kshs {data[0].Price}
              </span>
              <br></br>
              <span className="line-through font-medium mr-2">Kshs 6000</span>
              <span className="text-red-500 font-medium">
                You get 20% off today!
              </span>
            </span>

            <span className="mb-1 lg:mb-2">Color</span>
            <div className="flex flex-row mb-5">
              <div className="rounded-full h-5 w-5 lg:h-4 lg:w-4 bg-orange-400 mr-4 lg:mr-2 cursor-pointer"></div>
              <div className="rounded-full h-5 w-5 lg:h-4 lg:w-4 bg-red-400 mr-4 lg:mr-2 cursor-pointer"></div>
              <div className="rounded-full h-5 w-5 lg:h-4 lg:w-4 bg-teal-400 mr-4 lg:mr-2 cursor-pointer"></div>
            </div>
            <span className="mb-3">Size</span>
            <div className="flex flex-row flex-wrap lg:flex-no-wrap mb-16 justify-between lg:justify-between">
              <div className="px-5 py-1 text-center border border-gray-400 rounded text-gray-900">
                S
              </div>
              <div className="px-5 py-1 text-center border border-gray-400 rounded text-gray-900">
                M
              </div>
              <div className="px-5 py-1 text-center border border-gray-400 rounded text-gray-900">
                L
              </div>
              <div className="px-5 py-1 text-center border border-gray-400 rounded text-gray-900">
                XL
              </div>
              <div className="px-5 py-1 text-center border border-gray-400 rounded text-gray-900 mt-2 lg:mt-0">
                2XL
              </div>
            </div>
            <button className="w-full bg-black text-white py-2 rounded hidden lg:block">
              Add to Cart
            </button>
          </div>
        </div>
      </div>

      <div className="w-full h-auto bg-white shadow-2xl block lg:hidden fixed bottom-0 flex justify-center mobile-bottom-button-bar">
        <button className="bg-black text-white py-2 px-24 rounded my-2">
          Add to Cart
        </button>
      </div>
    </>
  );
};

const mapStateToProps = (state) => {
  return {
    cartVisible: state.cart.cartVisible,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    makeCartVisible: () => {
      dispatch({
        type: "MAKE_CART_VISIBLE",
      });
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthHoc(Post));
//export default Post;
