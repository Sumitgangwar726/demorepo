import React, { useCallback, useEffect, useState } from "react";
import {
  Card,
  Tabs,
  Badge,
  Frame,
  TextField,
  Button,
  Stack,
} from "@shopify/polaris";
import ProTable from "./product-table";
import StatusTabs from "./product-table/StatusTabs";
import SearchField from "../SearchField";
import Pooper from "../../utils/Pooper";
import ResourceListFilters from "../Filter";
import FilterFeature from "../filter-feature/FilterFeature";
import BulkUpdate from "../../utils/bulkupdate/BulkUpdate";
import TagView from "./product-table/TagsView";

const Listing = () => {
  const [serText, setSerText] = useState("");
  const [stab, setStab] = useState(0);
  const [filter, setFilter] = useState([]);

  const [isFilterChange , setFilterChange] = useState(false)

  const selectedTab = (data) => setStab(data);

  useEffect(()=>{
    setFilter(JSON.parse(sessionStorage.getItem('filter')))
  },[isFilterChange])

  return (
    <Frame>
      <Card>
        <Card.Section>
          <StatusTabs  setFilterChange={setFilterChange}/>
        </Card.Section>
        <Card.Section>
          <Stack>
            <SearchField setFilterChange={setFilterChange} />
            <FilterFeature setFilterChange={setFilterChange}/>
            <Pooper />
            <Button>Sync Status</Button>
            <Button>Amazon Lookup</Button>
            <BulkUpdate />
          </Stack>
          <TagView isFilterChange={isFilterChange}/>
        </Card.Section>
        <Card.Section>
          <ProTable currentTab={stab} />
        </Card.Section>
      </Card>
    </Frame>
  );
};

export default Listing;
