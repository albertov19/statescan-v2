import { blockEventsHead } from "../../../utils/constants";
import Table from "../../table";
import React from "react";
import { StyledPanelTableWrapper } from "../../styled/panel";
import Pagination from "../../pagination";
import { getPageFromQuery } from "../../../utils/viewFuncs";
import { useEffect, useState } from "react";
import Api from "../../../services/api";
import { useLocation } from "react-router-dom";
import { toEventTabTableItem } from "../../../utils/viewFuncs/toTableItem";

function EventsTable({ height }) {
  const location = useLocation();
  const [events, setEvents] = useState(null);
  const [total, setTotal] = useState(0);
  const page = getPageFromQuery(location);

  useEffect(() => {
    if (!height) {
      return;
    }
    setEvents(null);
    Api.fetch(`/blocks/${height}/events`, {
      page: getPageFromQuery(location) - 1,
    }).then(({ result }) => {
      setEvents(result?.items ?? []);
      setTotal(result?.total ?? 0);
    });
  }, [location, height]);

  return (
    <StyledPanelTableWrapper>
      <Table heads={blockEventsHead} data={toEventTabTableItem(events)} />
      <Pagination page={parseInt(page)} pageSize={10} total={total} />
    </StyledPanelTableWrapper>
  );
}

export default EventsTable;
