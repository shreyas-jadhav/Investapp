import { app, auth } from "./firebase.js";
import {
  collection,
  addDoc,
  getFirestore,
  query,
  where,
  getDocs,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-firestore.js";
import { onAuthStateChanged } from "https://www.gstatic.com/firebasejs/9.10.0/firebase-auth.js";
import {
  getStorage,
  ref,
  uploadBytes,
  getDownloadURL,
} from "https://www.gstatic.com/firebasejs/9.10.0/firebase-storage.js";

const db = getFirestore(app);
const postButton = document.getElementById("post-product");
if (postButton) postButton.onclick = post;
// on clicking post, get title and description and add to firebase collection
async function post() {
  postButton.innerText = "Posting...";
  const title = document.getElementById("title").value;
  const description = document.getElementById("description").value;
  const file = document.getElementById("file").files[0];

  const data = {
    title: title,
    description: description,
    createdBy: auth.currentUser.uid,
    uploadedByName: auth.currentUser.displayName,
    createdAt: Date.now(),
  };

  if (file) {
    const storage = getStorage(app);
    const storageRef = ref(storage, auth.currentUser.uid + "/" + file.name);
    const uploadedSnapshot = await uploadBytes(storageRef, file);
    data.image = await getDownloadURL(uploadedSnapshot.ref);
  }

  try {
    // add to firebase collection
    await addDoc(collection(db, "products"), data);
    // clear the form
    document.getElementById("title").value = "";
    document.getElementById("description").value = "";
    alert(`Successfully posted your product!`);
    refreshList();
  } catch (e) {
    alert("Error: " + JSON.stringify(e.code));
  } finally {
    postButton.innerText = "Post";
  }
}

const productsList = document.getElementById("products-list");
productsList.innerHTML = "Loading Products...";
export async function refreshList(all = false) {
  // query products where created by current user

  const products = (
    await getDocs(
      all
        ? collection(db, "products")
        : query(
            collection(db, "products"),
            where("createdBy", "==", auth.currentUser.uid)
          )
    )
  ).docs.map((d) => d.data());

  const productsList = document.getElementById("products-list");
  productsList.innerHTML = "";
  products.forEach((product) => {
    const productElement = document.createElement("div");
    productElement.innerHTML = `
        <div class="ui one column grid">
              <div class="column">
                <div
                  class="ui segment"
                  style="
                    background-color: rgb(236, 236, 236, 0.2);
                    border: none;
                    border-radius: 10px;
                  "
                >
                  <div
                    class=""
                    style="
                      position: relative;
                      bottom: 40px;
                      margin-bottom: -40px;
                    "
                  >
                    <img
                      class="ui avatar image"
                      src="img/3.png"
                      alt=""
                      style="
                        width: 48px;
                        height: 48px;
                        border: 2px solid #ffffff;
                      "
                    />
                    <span style="position: relative; top: 15px"
                      >${product.uploadedByName} -
                      <i style="font-weight: lighter; font-style: normal"
                        >${Math.floor(
                          (Date.now() - +product.createdAt) / 100 / 60 / 60
                        )}h ago</i
                      ></span
                    >
                    <a href="#" style="float: right; margin-top: 25px"
                      ><span
                        ><i
                          class="ui large black ellipsis horizontal icon"
                        ></i></span
                    ></a>
                  </div>
                  <a
                    class="ui orange right ribbon label"
                    style="border-radius: 15px 0 0 15px"
                    >Project</a
                  >
                  <h2>${product.title}</h2>
                  <p
                    style="
                      font-family: Barlow;
                      font-size: 16px;
                      font-weight: lighter;
                    "
                  >
                    ${product.description}
                  </p>

                  <div class="ui divider"></div>

                  ${
                    product.image
                      ? `<div>
                  <img src="${product.image}" height="400px"  alt="" style="width: 100%; object-fit: contain;" />
                    </div>`
                      : ``
                  }
                  <div class="ui grid container">
                    <div class="three column grid">
                      <div class="ui relaxed horizontal list">
                        <div class="item">
                          <a href="#"
                            ><i
                              class="ui blue thumbs up icon"
                              style="color: #108ed7"
                              ><span style="font-size: 14px; color: #108ed7">
                                50k</span
                              ></i
                            ></a
                          >
                        </div>
                        <div class="item">
                          <a href="#"
                            ><i class="icon ion-md-text" style="color: #088728"
                              ><span style="font-size: 14px; color: #088728"
                                >5k</span
                              ></i
                            ></a
                          >
                        </div>
                        <div class="item">
                          <a href="#"
                            ><i class="icon ion-md-share" style="color: #d79a10"
                              ><span style="font-size: 14px; color: #d79a10"
                                >12k</span
                              ></i
                            ></a
                          >
                        </div>
                      </div>
                    </div>
                  </div>
                  <div class="ui divider"></div>
                  <div class="ui grid container">
                    <div
                      id=""
                      class="ui very relaxed horizontal list"
                      style="margin: auto; display: inline-block; padding: 10px"
                    >
                      <a class="item">
                        <img
                          class="ui avatar image"
                          src="emoji/like.png"
                          style="border-radius: 0px"
                        />
                        <div class="content">
                          <span class="header" style="font-family: Barlow"
                            >Like</span
                          >
                        </div>
                      </a>
                      <a class="item">
                        <img
                          class="ui avatar image"
                          src="emoji/comment (1).png"
                          style="border-radius: 0px"
                        />
                        <div class="content">
                          <span class="header" style="font-family: Barlow"
                            >Comment</span
                          >
                        </div>
                      </a>
                      <a class="item">
                        <img
                          class="ui avatar image"
                          src="emoji/share.png"
                          style="border-radius: 0px"
                        />
                        <div class="content">
                          <span class="header" style="font-family: Gudea"
                            >Share</span
                          >
                        </div>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>
        `;
    productsList.appendChild(productElement);
  });
}
console.log(`Loading products`);
