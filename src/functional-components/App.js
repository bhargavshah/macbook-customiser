import React, { useState, useEffect } from "react";

import { SelectProcessor } from "./components/ComponentSelectors";
import Summary from "./components/Summary";
import Price from "./components/Price";

const App = () => {
  const [loading, setLoading] = useState(false);
  const [processorList, setProcessorList] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const getMacComponents = () => {
      return fetch(`http://localhost:3004/components`)
        .then((response) => response.json())
        .then((data) => {
          const newData = [];
          for (let i = 0; i < data.length; i++) {
            if (data[i].type === "proe") {
              if (data[i].default === true) {
                data[i].selected = true;
              } else {
                data[i].selected = false;
              }
              newData.push(data[i]);
            }
          }
          setProcessorList(newData);
          setLoading(false);
        })
        .catch(() => {
          setError(new Error("could not fetch the customisable components"));
          setLoading(false);
        });
    };
    setLoading(true);
    getMacComponents();
  }, []);

  const setSelectedVariant = (variantSerialNo) => {
    const newArr = [];
    for (let i = 0; i < processorList.length; i++) {
      const variant = processorList[i];
      newArr.push({
        ...variant,
        selected: variant.serialNo === variantSerialNo,
      });
    }
    setProcessorList(newArr);
  };

  const getAddOnPrice = () => {
    let selectedProcessor = null;
    for (let i = 0; i < processorList.length; i++) {
      const variant = processorList[i];
      if (variant.selected) {
        selectedProcessor = variant;
        break;
      }
    }
    return selectedProcessor?.addOnPrice ?? 0;
  };

  return (
    <>
      <header>
        <div className="header__content">
          <a
            className="header__link"
            href="https://www.apple.com/in/macbook-pro"
          >
            <strong>MacBook Pro</strong>
          </a>
        </div>
      </header>
      <main>
        <div className="main__container">
          <div className="main__content">
            <section>
              <img
                className="macbook-img"
                alt="macbook pro"
                src="https://store.storeimages.cdn-apple.com/4668/as-images.apple.com/is/mbp16touch-space-select-201911?wid=1808&hei=1686&fmt=jpeg&qlt=80&.v=1572825197207"
              />
            </section>
            <section className="configuration">
              {loading ? (
                <h1>loading...</h1>
              ) : error ? (
                <h1>Something went wrong. Please try again later</h1>
              ) : (
                <>
                  <h1 className="mt-0">
                    Customise your 16‑inch MacBook Pro - Space Grey
                  </h1>
                  <Summary processorList={processorList} />
                  <SelectProcessor
                    variants={processorList}
                    onSelectVariant={setSelectedVariant}
                  />
                </>
              )}
            </section>
          </div>
        </div>
        <Price addOnPrice={getAddOnPrice()} />
      </main>
    </>
  );
};

export default App;
