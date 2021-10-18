import React, { useState, useEffect } from "react";
import { Checkbox, Table, Icon } from "semantic-ui-react";
import { TableComponent } from "./Table";

type TableRowProps = {
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
};

type ColType = {
	key: any;
	label: any;
	type: any;
	formatter: any;
	action: any;
	align: any;
	text: any;
	image: any;
};

const TableRow = ({
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

	return row ? (
		<React.Fragment>
			<Table.Row key={row.id} className="table_row">
				{checkBoxes ? (
					<Table.Cell>
						<Checkbox checked={check} onChange={handleCheck} />
					</Table.Cell>
				) : null}
				{col.map(
					({
						key,
						label,
						type,
						formatter,
						action,
						align,
						text,
						image,
					}: ColType) => {
						let result = row;
						let target = "";

						if (key.length) {
							const keys = key.split(".");
							keys.forEach((keyMain: string) => {
								result = result[keyMain] ? result[keyMain] : "-";
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
			</Table.Row>
			{collapsable && isOpen ? (
				<Table.Row>
					<Table.Cell
						colSpan={checkBoxes ? col.length + 2 : col.length + 1}
						style={{ background: "rgba(229,229,229,0.5)", padding: 20 }}
					>
						<TableComponent rows={subRows} columns={subCol} />
					</Table.Cell>
				</Table.Row>
			) : null}
		</React.Fragment>
	) : (
		<React.Fragment />
	);
};

export default TableRow;
