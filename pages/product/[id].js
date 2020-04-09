import { useRouter } from "next/router";
import AuthHoc from "../../components/hoc/authhoc";
import NavBar from "../../components/navbar";
import { loadDB } from "../../lib/config";

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

const Post = ({ data }) => {
  console.log(data[0]);
  const router = useRouter();
  //console.log(router);
  const { id } = router.query;
  const { key } = router.query;
  //console.log(id);
  //console.log(key);

  return (
    <>
      <NavBar />
      <div className="h-screen w-full bg-gray-100 py-6 px-8 lg:px-32 flex flex-col lg:flex-row">
        <p>{data[0].Name}</p>
      </div>
    </>
  );
};

export default Post;
