import React, { useCallback, useEffect, useState } from "react";
import { Tabs, Badge } from "@shopify/polaris";
import { productOptions } from "../../../api/apiConstants";

const StatusTabs = ({ setFilterChange}) => {
  const [selected, setSelected] = useState(()=>{
    let t = JSON.parse(sessionStorage.getItem('filter'))
    let res = 0
    t?.tabSelected ? res = t.tabSelected[1][0] : res = 0
    console.log(res);
    return res
  })
  const [count , setCount] = useState({'Not Listed' : 0});

  const handleTabChange = useCallback((selectedTabIndex) => {
    sessionStorage.setItem("tab", selectedTabIndex);
    setSelected(selectedTabIndex);
  }, []);
  
  useEffect(()=>{
    // selectedTab(tabs[selected]?.id)
    if(tabs[selected].id){
      let t = JSON.parse(sessionStorage.getItem('filter'))
      t.tabSelected = ''
      t.tabSelected = [tabs[selected].id , [tabsName[tabs[selected].id]]]
      sessionStorage.setItem('filter' , JSON.stringify(t))
      let tt = []
      setFilterChange([...tt])
    }
    
  },[selected])

  const tabsName = {
    All : 0,
    'Not Listed' : 1,
    'Inactive' : 2,
    'Incomplete' : 3,
    'Active' : 4,
    'Error' : 5
  }

  const tabs = [
    {
      id: "All",
      content: <span>All</span>,
      accessibilityLabel: "All customers",
      panelID: "all",
    },
    {
      id: "Not Listed",
      content: (
        <span>
          Not Listed <Badge status="new">{count['Not Listed']}</Badge>
        </span>
      ),
      panelID: "not-listed",
    },
    {
      id: "Inactive",
      content: (
        <span>
          Inactive <Badge status="info">{count.Inactive}</Badge>
        </span>
      ),
      panelID: "inactive",
    },
    {
      id: "Incomplete",
      content: (
        <span>
          Incomplete <Badge status="warning">{count.Incomplete}</Badge>
        </span>
      ),
      panelID: "incomplete",
    },
    {
      id: "Active",
      content: (
        <span>
          Active <Badge status="success">{count.Active}</Badge>
        </span>
      ),
      panelID: "active",
    },
    {
      id: "Error",
      content: <span>Error</span>,
      panelID: "error",
    },
  ];

  useEffect(() => {
    fetch(
      "https://multi-account.sellernext.com/home/public/connector/product/getStatusWiseCount",
      productOptions
    )
      .then((res) => res.json())
      .then((res) => {
        if (res.success) {
          let t = {'Not Listed' : 0};
          res.data.map((item) => { 
            if(item._id===null || item._id==='Not Listed'){
              t['Not Listed']+= item.total
            }
            else t[item._id] = item.total
          });
          setCount({...t});
        } else alert(res.message);
      });
  }, []);
  return (
    <Tabs fitted tabs={tabs} selected={selected} onSelect={handleTabChange} />
  );
};

export default StatusTabs;
