import React, { useState, useEffect } from "react";
import { TableComponent } from "./Table";

// import { Checkbox, Table, Icon } from "semantic-ui-react";
import { Collapse, Table } from 'antd';
const { Panel } = Collapse;



type TableRowProps = {
  index: any;
  row: any;
  col: any;
  allChecked?: boolean;
  setAllChecked?: any;
  arrayOfChecked?: Array<any>;
  setArrayOfChecked?: any;
  checkBoxes?: boolean;
  url?: string;
  collapsable?: boolean;
  subCol?: any;
  subRowKey?: string;
  handleRowClick?: any;
};

type ColType = {
  key: any;
  keys?: Array<any>;
  label: any;
  type: any;
  formatter: any;
  action: any;
  align: any;
  text: any;
  image: any;
  showSerialNumber?: any;
};

const TableRow = ({
  index,
  row,
  col,
  allChecked = false,
  setAllChecked,
  arrayOfChecked = [],
  setArrayOfChecked,
  checkBoxes = false,
  url = "",
  collapsable = false,
  subCol = [],
  subRowKey = "",
  handleRowClick = null,
}: TableRowProps): JSX.Element => {
  const [check, setCheck] = useState(false);
  const [rowUrl, setRowUrl] = useState(url);
  const [isOpen, setOpen] = useState(false);
  const [subRows, setSubRows] = useState([]);

  const handleCheck = () => {
    if (check) {
      setArrayOfChecked(arrayOfChecked.filter((value) => value !== row.id));
    } else {
      setArrayOfChecked([...arrayOfChecked, row.id]);
    }
    setCheck(!check);
    setAllChecked(false);
  };

  useEffect(() => {
    if (allChecked) {
      setCheck(allChecked);
    } else {
      const index = arrayOfChecked.indexOf(row.id);
      setCheck(index >= 0);
    }
  }, [allChecked, JSON.stringify(arrayOfChecked)]);

  useEffect(() => {
    if (url?.length) {
      const temp = url.split("{");
      const id = temp[1].split("}");
      setRowUrl(temp[0] + row[id[0]]);
    }

    if (collapsable) {
      const keys = subRowKey.split(".");
      let result = row;
      keys.forEach((keyMain: string) => {
        result = result[keyMain] ? result[keyMain] : "-";
      });
      if (typeof result === "object") {
        setSubRows(result);
      }
    }
  }, []);

  // const dataSources = [
  //   {
  //     key: row.id,
  //     className: "table_row",
  //     render: () => {
  //       onclick={handleRowClick && (() => handleRowClick(row.id))},
  //     }
  //   }
  // ]

  function NestedTable() {
    const expandedRowRender = () => {
    const data =[
      {
        render: ()=> {
          return <TableComponent rows={subRows}  />
        }
      }
    ]

    const columns = [
      {
        render: ()=> {
          return <TableComponent columns={subCol} />
        }
      }
    ]
    
    return <Table
    dataSource={data}
    columns= {columns}
    pagination={false}
    renderCell={()=> {
      return {
        // colSpan={rowSelection ? col.length + 2 : col.length + 1},
            style:{  background: "rgba(229,229,229,0.5)",
            padding: 20,
            minWidth: "150px",}
      }
    }}
    
    />
  }
  
  
     return (
        row ? (
      <React.Fragment>
      <Table
      expandable={{ expandedRowRender }}
      onRow={() => {
        return {
          key: row.id,
          className: "table_row",
          onClick: ()=>{handleRowClick && (() => handleRowClick(row.id))}
        }
      }
      }
      onCell = {()=> {
        return {
          style:{ minWidth: "150px" },
          onClick:() => {
                      if (rowUrl.length && type !== "link") {
                        window.open(rowUrl, "_blank");
                      }
                      if (type === "link" && target.length) {
                        window.open(target, "_blank");
                      }
                      if (type === "action" && action) {
                        action(target);
                      }
                      
                    },
                    // textAlign={align || "left"}
        }

         }} />

   
        
      
      {/* <Table.Row
        key={row.id}
        className="table_row"
        onClick={handleRowClick && (() => handleRowClick(row.id))}
      >
        {checkBoxes ? (
          <Table.Cell style={{ minWidth: "150px" }}>
            <Checkbox checked={check} onChange={handleCheck} />
          </Table.Cell>
        ) : null}

        {col.map(
          ({
            key,
            keys,
            label,
            type,
            formatter,
            action,
            align,
            text,
            image,
            showSerialNumber,
          }: ColType) => {
            let result = row;
            const resultObj = {};
            let target = "";

            if (key?.length) {
              const keys = key.split(".");
              keys.forEach((keyMain: any) => {
                if (showSerialNumber) {
                  result = keyMain in result ? result[keyMain] : index + 1;
                } else if (
                  typeof result[keyMain] === "boolean" ||
                  result[keyMain] === 0
                ) {
                  result = result[keyMain].toString();
                } else {
                  result = keyMain in result ? result[keyMain] : "-";
                }
              });
            }

            if (keys) {
              keys.forEach((key) => {
                resultObj[key] = result[key] ? result[key] : "";
              });
            }

            if (type === "link" || type === "action") {
              target = result;
              result = label;
            }

            const getTableCellText = () => {
              if (result) {
                if (formatter) return formatter(result);
                if (image) return image(target);
                if (text) return text;
                return result;
              }

              return "-";
            };


            return (

              <Table.Cell
                style={{ minWidth: "150px" }}
                onClick={() => {
                  if (rowUrl.length && type !== "link") {
                    window.open(rowUrl, "_blank");
                  }
                  if (type === "link" && target.length) {
                    window.open(target, "_blank");
                  }
                  if (type === "action" && action) {
                    action(target);
                  }
                  if (type === "collapsable") {
                    setOpen((open) => !open);
                  }
                }}
                textAlign={align || "left"}
              >
                {getTableCellText()}
                {type === "collapsable" ? (
                  isOpen ? (
                    <Icon name="angle up" />
                  ) : (
                    <Icon name="angle down" />
                  )
                ) : null}
              </Table.Cell>
            );
          }
        )}
       </Table.Row> */}
      {/* {collapsable && isOpen ? (
        <Table.Row>
          <Table.Cell
            colSpan={checkBoxes ? col.length + 2 : col.length + 1}
            style={{
              background: "rgba(229,229,229,0.5)",
              padding: 20,
              minWidth: "150px",
            }}
          >
            <TableComponent rows={subRows} columns={subCol} />
          </Table.Cell>
        </Table.Row>
      ) : null} */}
    </React.Fragment>
  ) : (
    <React.Fragment />
     ));
    }  
};

export default TableRow;
