import { Filters, Select, TextField } from "@shopify/polaris";
import React, { useEffect, useMemo, useState } from "react";
import { filterHeaders, filterUrl } from "../../api/apiConstants";

const FilterFeature = ({setFilterChange}) => {
  const [filterOptions, setFilterOptions] = useState({
    vendor: [],
    status: [],
    variant: [],
    parent_type: [],
  });
  // console.log(filterOptions);
  const [filterData, setFilterData] = useState({
    title: {
      value: "title",
      textValue: "",
      selectValue: "3",
      change: false,
    },
    Inventory: {
      value: "items.quantity",
      textValue: "",
      selectValue: "1",
      change: false,
    },
    SKU: {
      value: "items.sku",
      textValue: "",
      selectValue: "3",
      change: false,
    },
    Tags: {
      value: "tags",
      textValue: "",
      selectValue: "3",
      change: false,
    },
    "Product type": {
      value: "product_type",
      textValue: "",
      selectValue: "3",
      change: false,
    },
    Vendor: {
      value: "brand",
      textValue: "",
      selectValue: "1",
      change: false,
    },
    "Template name": {
      value: "profile.profile_name",
      textValue: "",
      selectValue: "1",
      change: false,
    },
    "Product Status": {
      value: "items.status",
      textValue: "",
      selectValue: "1",
      change: false,
    },
    "Variant attributes": {
      value: "variant_attributes",
      textValue: "",
      selectValue: "1",
      change: false,
    },
    Activity: {
      value: "cif_amazon_multi_activity",
      textValue: "",
      selectValue: "1",
      change: false,
    },
    Type: {
      value: "type",
      textValue: "",
      selectValue: "1",
      change: false,
    },
  });
  const inventoryOptions = [
    { label: "Equals", value: "equals" },
    { label: "Not Equals", value: "not equals" },
    { label: "Greater Than or Equals to", value: "greater than or equals to" },
    { label: "Less Than or Equals to", value: "less than or equals to" },
  ];

  const skuOptions = [
    { label: "Equals", value: "equals" },
    { label: "Not Equals", value: "not equals" },
    { label: "Contains", value: "contains" },
    { label: "Does not Contains", value: "does not contains" },
    { label: "Ends With", value: "starts with" },
    { label: "Ends With", value: "ends with" },
  ];
  const vendorOptions = [
    { label: "Equals", value: "equals" },
    { label: "Not Equals", value: "not equals" },
  ];
  useEffect(() => {
    fetch(filterUrl, filterHeaders)
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          let dt = res.data;
          let vendor = dt.filter((item) => item.title === "Vendor" );
          let status = dt.filter((item) => item.title === "Product status");
          let variant = dt.filter(
            (item) => item.title === "Variant attributes"
          );
          let parent_type = dt.filter((item) => item.title === "Type");
          // console.log({ vendor, status, variant, parent_type });
          setFilterOptions({ vendor, status, variant, parent_type });
        } else alert(res.message);
      });
  }, []);



  const filters = [
    {
      key: "inventory",
      label: "Inventory",
      filter: (
        <>
          <Select
            options={inventoryOptions}
            value={filterData.Inventory.selectValue}
            onChange={(value) => {
              filterData.Inventory.selectValue = value;
              
              setFilterData({ ...filterData });
            }}
          />
          <TextField
            label="Tagged with"
            value={filterData.Inventory.textValue}
            type={"number"}
            onChange={(value) => {
                filterData.Inventory.textValue = value;
                filterData.Inventory.change = value ? true  : false
                setFilterData({ ...filterData });
            }}
            autoComplete="off"
            labelHidden
          />
        </>
      ),
    },
    {
      key: "sku",
      label: "SKU",
      filter: (
        <>
          <Select
            options={skuOptions}
            value={filterData.SKU.selectValue}
            onChange={(value) => {
                filterData.SKU.selectValue = value;
                setFilterData({ ...filterData });
            }}
          />
          <TextField
            label="Tagged with"
            value={filterData.SKU.textValue}
            onChange={(value) => {
                filterData.SKU.textValue = value;
                filterData.SKU.change = value ? true  : false
                setFilterData({ ...filterData });
            }}
            autoComplete="off"
            labelHidden
          />
        </>
      ),
    },
    {
      key: "tags",
      label: "Tags",
      filter: (
        <>
          <TextField
            label="Tagged with"
            value={filterData.Tags.textValue}
            onChange={(value) => {
                filterData.Tags.change = value ? true  : false
                filterData.Tags.textValue = value;
                setFilterData({ ...filterData });
            }}
            autoComplete="off"
            labelHidden
          />
        </>
      ),
    },
    {
      key: "product_type",
      label: "Product Type",
      filter: (
        <>
          <TextField
            label="Tagged with"
            value={filterData["Product type"].textValue}
            onChange={(value) => {
                filterData['Product type'].change = value ? true  : false
                filterData["Product type"].textValue = value;
                setFilterData({ ...filterData });
            }}
            autoComplete="off"
            labelHidden
          />
        </>
      ),
    },
    {
      key: "vendor",
      label: "Vendor",
      filter: (
        <>
          <Select 
          options={vendorOptions}
          value={filterData.Vendor.selectValue}
          onChange={(value) => {
            filterData.Vendor.selectValue = value;
            setFilterData({...filterData})
          }}
           />
          <Select 
            options={filterOptions.vendor}
            value={filterData.Vendor.textValue}
            onChange={(value) =>{
                filterData.Vendor.change = value ? true  : false
                filterData.Vendor.textValue = value;
                setFilterData({...filterData})
            }} 
        />
        </>
      ),
    },
    {
      key: "template",
      label: "Template Name",
      filter: (
        <Select 
            value="No template found"
            disabled
        />
      ),
    },
    {
      key: "product_status",
      label: "Product Status",
      filter: <Select 
        options={filterOptions.status} 
        value={filterData["Product Status"].selectValue}
        onChange={(value)=>{
            filterData["Product Status"].change = value ? true  : false
            filterData["Product Status"].selectValue = value
            setFilterData({...filterData})
        }}
        />,
    },
    {
      key: "variant",
      label: "Variant Attributes",
      filter: <Select 
      options={filterOptions.variant} 
      value={filterData["Variant attributes"].selectValue}
      onChange={(value)=>{
        filterData["Variant attributes"].change = value ? true  : false
        filterData["Variant attributes"].selectValue = value
        setFilterData({...filterData})
    }}
      />,
    },
    {
      key: "activity",
      label: "Activity",
      filter: (
        <>
          <TextField
            label="Tagged with"
            value={filterData.Activity.textValue}
            onChange={(value) => {
                filterData.Activity.change = true
                filterData.Activity.textValue = value;
                setFilterData({ ...filterData });
            }}
            autoComplete="off"
            labelHidden
          />
        </>
      ),
    },
    {
      key: "type",
      label: "Type",
      filter: <Select options={filterOptions.parent_type} 
        value={filterData.Type.selectValue}
        onChange={(value)=>{
            filterData.Type.change = value
            filterData.Type.selectValue = value
            setFilterData({...filterData})
        }}

      />,
    },
  ];

  const removeFilter = (key) =>{
    console.log('clearAll');
    filterData[key].change = false
    filterData[key].textValue = ''
    console.log(filterData[key]);
    setFilterData({...filterData})
  }
  const removeAllFilter = () =>{
    Object.keys(filterData).map((item)=>{
        filterData[item].change = false
        filterData[item].textValue = ''
    })
    setFilterData({...filterData})
  }
  const appliedFilters = useMemo(()=>{
    let t = []
    Object.keys(filterData).map(item =>{
        if(filterData[item].change){
            t.push( {
                key : filterData[item].value,
                label : disambiguateLabel(item , filterData[item].searchvalue , filterData[item].textValue),
                onRemove : ()=>removeFilter(item)
            })
        }
    })
    return t
  },[filterData])

  useEffect(()=>{
    let t = JSON.parse(sessionStorage.getItem('filter'))
    sessionStorage.setItem('filter' , JSON.stringify({...t , ...filterData}))
    let tt = []
    setFilterChange([...tt])
  },[filterData])
  return (
    <>
    <Filters 
        filters={filters || []}
        // appliedFilters={[...appliedFilters]}
        onClearAll={removeAllFilter}
        hideQueryField
    >
    </Filters>
    </>
    
  )
  function disambiguateLabel(key, select , text) {
    return `${key} ${select} ${text}`
  }
};

export default FilterFeature;
