import React from "react";
import { Checkbox, Pagination, Table } from "semantic-ui-react";

import RenderTableRow from "./TableRow";
import { Loader } from "../utils";
import createIndex from "../helpers/createIndex";

type TableProps = {
  columns: Array<any>;
  rows: Array<any>;
  rowsloading?: boolean;
  checkBoxes?: boolean;
  setArrayOfChecked?: any;
  arrayOfChecked?: Array<any>;
  setAllChecked?: any;
  allChecked?: boolean;
  pagination?: boolean;
  totalPages?: string | number;
  currentPage?: number;
  setCurrentPage?: any;
  url?: string;
  collapsable?: boolean;
  subCol?: any;
  subRowKey?: string;
  handleRowClick?: any;
  overFlowX?: string;
  overFlowY?: string;
};

export const TableComponent = ({
  columns,
  rows,
  rowsloading = false,
  checkBoxes = false,
  setArrayOfChecked,
  arrayOfChecked = [],
  setAllChecked,
  allChecked = false,
  pagination = false,
  totalPages,
  currentPage = 1,
  setCurrentPage,
  url = "",
  collapsable = false,
  subCol = [],
  subRowKey = "",
  handleRowClick = null,
  overFlowX = "",
  overFlowY = "",
}: TableProps): JSX.Element => {
  const allCheckHandler = () => {
    if (!allChecked) {
      setArrayOfChecked([]);
      rows.forEach((item) =>
        setArrayOfChecked((prev: any) => [...prev, item.id])
      );
    } else {
      setArrayOfChecked([]);
    }
    setAllChecked(!allChecked);
  };

  const onPageChange = (event: any, { activePage }: any) => {
    setCurrentPage(activePage);
    console.log(event);
  };

  const stylesObject: any = {
    ...(overFlowX !== "" && { overflowX: overFlowX }),
    ...(overFlowY !== "" && { overflowY: overFlowY }),
  };

  return (
    <div
      style={{
        width: "100%",
        margin: "0 auto",
      }}
    >
      <div style={stylesObject}>
        <Table celled>
          <Table.Header>
            <Table.Row>
              {checkBoxes ? (
                <Table.HeaderCell>
                  <Checkbox checked={allChecked} onChange={allCheckHandler} />
                </Table.HeaderCell>
              ) : null}

              {columns.map((column) => (
                <Table.HeaderCell
                  key={column.key}
                  colSpan={column.colSpan || 1}
                >
                  {column.label}
                </Table.HeaderCell>
              ))}
            </Table.Row>
          </Table.Header>
          <Table.Body>
            {!rowsloading ? (
              <>
                {rows && rows.length > 0 ? (
                  <>
                    {rows.map((row, index) => (
                      <RenderTableRow
                        index={createIndex({ currentPage, rows, index })}
                        row={row}
                        col={columns}
                        checkBoxes={checkBoxes}
                        allChecked={allChecked}
                        setAllChecked={setAllChecked}
                        setArrayOfChecked={setArrayOfChecked}
                        arrayOfChecked={arrayOfChecked}
                        url={url}
                        collapsable={collapsable}
                        subCol={subCol}
                        subRowKey={subRowKey}
                        handleRowClick={handleRowClick}
                      />
                    ))}
                  </>
                ) : (
                  <div className="no-user-header">
                    <h3>No Data</h3>
                  </div>
                )}
              </>
            ) : (
              <Loader />
            )}
          </Table.Body>
        </Table>
      </div>

      {pagination && totalPages ? (
        <div style={{ marginTop: "20px" }}>
          <Pagination
            onPageChange={onPageChange}
            lastItem={null}
            firstItem={null}
            activePage={currentPage}
            totalPages={totalPages}
          />
        </div>
      ) : null}
    </div>
  );
};
