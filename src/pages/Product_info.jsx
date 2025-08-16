import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const ProductInfo = () => {
  let { id } = useParams();

  let [itemInfo, setItemInfo] = useState();

  async function handleProducInfo() {
    //   console.log(id)
    try {
      let data = await fetch(`http://localhost:3400/product/${id}`);
      let res = await data.json();
      console.log(res);
      if (res.received) {
        setItemInfo(res.data);
      }
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    handleProducInfo();
  }, []);
  return (
    <>
      {/* <link href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.2/css/all.min.css" rel="stylesheet"> */}
      {!itemInfo ? (
        <div className="text-center mt-5">
          <h3>Loading Product Info...</h3>{" "}
        </div>
      ) : (
        <div class="container py-5">
          <div class="row">
            <h1 className="text-center mb-5">More About The Procuct</h1>
            {/* <!-- Product Images --> */}
            <div class="col-md-6 mb-4">
              <div class="card">
    
                <img
                  src={`/server/assets/product/${itemInfo.image}`}
                  className="card-img-top"
                  alt="Product"
                  height="400px"
                />

                {/* <div class="card-body">
                    <div class="row g-2">
                        <div class="col-3">
                            <img src="https://images.unsplash.com/photo-1434056886845-dac89ffe9b56?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwyfHx3YXRjaHxlbnwwfDB8fHwxNzM0OTY1MTc4fDA&ixlib=rb-4.0.3&q=80&w=1080" class="img-thumbnail" alt="Thumbnail 1"/>
                        </div>
                        <div class="col-3">
                            <img src="https://images.unsplash.com/photo-1495857000853-fe46c8aefc30?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw2fHx3YXRjaHxlbnwwfDB8fHwxNzM0OTY1MTc4fDA&ixlib=rb-4.0.3&q=80&w=1080" class="img-thumbnail" alt="Thumbnail 2"/>
                        </div>
                        <div class="col-3">
                            <img src="https://images.unsplash.com/photo-1451859757691-f318d641ab4d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHw3fHx3YXRjaHxlbnwwfDB8fHwxNzM0OTY1MTc4fDA&ixlib=rb-4.0.3&q=80&w=1080" class="img-thumbnail" alt="Thumbnail 3"/>
                        </div>
                        <div class="col-3">
                            <img src="https://images.unsplash.com/photo-1490915785914-0af2806c22b6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w0NzEyNjZ8MHwxfHNlYXJjaHwzfHx3YXRjaHxlbnwwfDB8fHwxNzM0OTY1MTc4fDA&ixlib=rb-4.0.3&q=80&w=1080" class="img-thumbnail" alt="Thumbnail 4"/>
                        </div>
                    </div>
                </div> */}
              </div>
            </div>

            {/* <!-- Product Details --> */}
            <div class="col-md-6">
              <h1 class="h2 mb-3">{itemInfo.itemname}</h1>
              <div class="mb-3">
                <span class="h5 me-2"> Grs.wt : {itemInfo.gwt}</span>
                { itemInfo.itemgroup == "Diamond Jewellery" ?<span class="fs-5 ms-3"> Dia. wt:-{itemInfo.dwt}</span> : ""}
                <span class="badge bg-danger ms-3 fs-6">{itemInfo.purity}</span>
              </div>
              {/* 
            <div class="mb-3">
                <div class="d-flex align-items-center">
                    <div class="text-warning me-2">
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star"></i>
                        <i class="fas fa-star-half-alt"></i>
                    </div>
                    <span class="text-muted">(128 reviews)</span>
                </div>
            </div> */}

              <p class="mb-4">
                {itemInfo.description}
              </p>

              {/* <!-- Color Selection --> */}
              {/* <div class="mb-4">
                <h6 class="mb-2">Color</h6>
                <div class="btn-group" role="group">
                    <input type="radio" class="btn-check" name="color" id="silver" checked/>
                    <label class="btn btn-outline-secondary" for="silver">Silver</label>
                    <input type="radio" class="btn-check" name="color" id="gold"/>
                    <label class="btn btn-outline-secondary" for="gold">Gold</label>
                    <input type="radio" class="btn-check" name="color" id="black"/>
                    <label class="btn btn-outline-secondary" for="black">Black</label>
                </div>
            </div> */}

              {/* <!-- Quantity --> */}
              <div class="mb-4">
                <div class="d-flex align-items-center">
                  <label class="me-2">Quantity:</label>
                  <select class="form-select w-auto">
                    <option>1</option>
                    <option>2</option>
                    <option>3</option>
                    <option>4</option>
                    <option>5</option>
                  </select>
                </div>
              </div>

              {/* <!-- Actions --> */}
              <div class="d-grid gap-2">
                <button class="btn btn-primary" type="button">
                  Add to Cart
                </button>
                {/* <button class="btn btn-outline-secondary" type="button">
                  <i class="far fa-heart me-2"></i>Add to Wishlist
                </button> */}
              </div>

              {/* <!-- Additional Info --> */}
              {/* <div class="mt-4">
                <div class="d-flex align-items-center mb-2">
                    <i class="fas fa-truck text-primary me-2"></i>
                    <span>Free shipping on orders over $50</span>
                </div>
                <div class="d-flex align-items-center mb-2">
                    <i class="fas fa-undo text-primary me-2"></i>
                    <span>30-day return policy</span>
                </div>
                <div class="d-flex align-items-center">
                    <i class="fas fa-shield-alt text-primary me-2"></i>
                    <span>2-year warranty</span>
                </div>
            </div> */}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default ProductInfo;
