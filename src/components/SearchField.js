import { Autocomplete, Button, Columns, Icon } from "@shopify/polaris";
import { SearchMinor } from "@shopify/polaris-icons";
import { Image } from "antd";
import { useState, useEffect } from "react";
import { productOptions, proSearch } from "../api/apiConstants";

function SearchField({setFilterChange }) {
  const [selectedOptions, setSelectedOptions] = useState([]);
  const [inputValue, setInputValue] = useState("");
  const [options, setOptions] = useState([]);

  const updateText = (value) => {
    setInputValue(value);
  };

  const restoreSession = (data)=>{
    let t = JSON.parse(sessionStorage.getItem('filter')) || {}
    t.query = [inputValue , data]
    sessionStorage.setItem('filter' , JSON.stringify(t))
  }

  const updateSelection = (data) => {
    setSelectedOptions(data);
    restoreSession(data[0])
    let t = []
    setFilterChange([...t])
  };

  const makeData = (pro, key) => {
    let result = {};
    pro.items.map((data) => {
      result.image = pro.main_image;
      result.brand = pro.brand;
      result.title = pro.title;
      result.product_type = pro.product_type;
      result.container_id = pro.container_id;
      result.sku = data.sku;
      result.match = key;
    });
    return result;
  };

  const changeOptions = () => {
    setLoading(true);
    fetch(proSearch(inputValue), productOptions)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          var garbage = 0;
          setLoading(false);
          // console.log(searchData);
          var temp = [];
          res.data.map((item) => {
            var result = {};
            if (item.brand.toLowerCase().includes(inputValue.toLowerCase()))
              temp.push(makeData(item, "brand"));
            if (item.title.toLowerCase().includes(inputValue.toLowerCase()))
              temp.push(makeData(item, "title"));
            if (
              item.product_type.toLowerCase().includes(inputValue.toLowerCase())
            )
              temp.push(makeData(item, "product_type"));
          });
          if (temp.length === 0) {
            setOptions([
              {
                key: "unique",
                value: null,
                label: (
                  <div>
                    {" "}
                    <Icon source={SearchMinor} color="base" />{" "}
                    <b>No Data Found</b>{" "}
                  </div>
                ),
              },
            ]);
            return;
          }
          setOptions(
            temp.map((item, i) => {
              return {
                key: i,
                value: [item.container_id,item.match],
                label: (
                  <Columns
                    spacing={{ xs: 2 }}
                    columns={{
                      xs: "1fr 3fr",
                      sm: "0.5fr 2fr",
                      md: "0.5fr 2fr",
                    }}
                  >
                    {" "}
                    <Image
                      src={item.image}
                      alt=""
                      fallback="https://upload.wikimedia.org/wikipedia/commons/thumb/d/d1/Image_not_available.png/640px-Image_not_available.png"
                    />{" "}
                    <div>
                      {" "}
                      {item.title} <br /> <b>Brand</b> : {item.brand} <br />{" "}
                      <b>Type</b> : {item.product_type} <br />{" "}
                    </div>{" "} 
                   
                    
                  </Columns>
                ),
              };
            })
          );
        } else alert(res.message);
      });
  };

  // const searchData = [];
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    let t = "";
    if (inputValue !== "") t = setTimeout(changeOptions, 500);

    return () => {
      clearTimeout(t);
    };
  }, [inputValue]);

  const textField = (
    <Autocomplete.TextField
      onChange={updateText}
      value={inputValue}
      prefix={<Icon source={SearchMinor} color="base" />}
      placeholder="Search"
    />
  );

  return (
    <div style={{ height: "225px" }}>
      <Autocomplete
        options={options}
        selected={selectedOptions}
        onSelect={updateSelection}
        textField={textField}
        loading={loading}
      />
    </div>
  );
}

export default SearchField;
