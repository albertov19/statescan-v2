import { StyledPanelTableWrapper } from "../components/styled/panel";
import BreadCrumb from "../components/breadCrumb";
import React, { useEffect, useState } from "react";
import { accountsHead } from "../utils/constants";
import Layout from "../components/layout";
import Table from "../components/table";
import Api from "../services/api";
import Pagination from "../components/pagination";
import { useLocation } from "react-router-dom";
import { getPageFromQuery, toPrecision } from "../utils/viewFuncs";
import { ColoredMonoLink } from "../components/styled/link";
import ValueDisplay from "../components/displayValue";
import { useSelector } from "react-redux";
import { chainSettingSelector } from "../store/reducers/settingSlice";

function Accounts() {
  const location = useLocation();
  const chainSetting = useSelector(chainSettingSelector);
  const [accounts, setAccounts] = useState(null);
  const [total, setTotal] = useState(0);
  const page = getPageFromQuery(location);
  const pageSize = 10;
  // todo : improve this

  useEffect(() => {
    setAccounts(null);
    Api.fetch(`/accounts`, {
      page: getPageFromQuery(location) - 1,
    }).then(({ result }) => {
      setAccounts(result?.items ?? []);
      setTotal(result?.total ?? 0);
    });
  }, [location]);

  const data =
    accounts?.map((account, index) => {
      return [
        `#${(parseInt(page) - 1) * pageSize + index + 1}`,
        <ColoredMonoLink to={`/account/${account?.address}`}>
          {account?.address}
        </ColoredMonoLink>,
        <ValueDisplay
          value={toPrecision(account?.data?.total, chainSetting?.decimals)}
          symbol={chainSetting?.symbol}
        />,
      ];
    }) ?? null;

  return (
    <Layout>
      <BreadCrumb data={[{ name: "Accounts" }]} />
      <StyledPanelTableWrapper>
        <Table heads={accountsHead} data={data} />
        <Pagination page={parseInt(page)} pageSize={10} total={total} />
      </StyledPanelTableWrapper>
    </Layout>
  );
}

export default Accounts;