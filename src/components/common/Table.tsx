import React, { useEffect, useState } from 'react';
import "../../styles.css"; 
import {
    Column, useExpanded, useGlobalFilter, usePagination, useRowSelect, useSortBy, useTable
} from 'react-table';
import MuiTable from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import ArrowUpwardIcon from '@material-ui/icons/ArrowUpward';
import { GlobalFilter } from './GlobalFilter';

const SortIcon = ({ isSorted, isSortedDesc }: { isSorted: boolean, isSortedDesc: boolean | undefined }) => {
    if (isSorted === undefined) { return null; }
    if (isSorted) {
      return isSortedDesc
        ? <ArrowDownwardIcon
        style={{
            fontSize: 14,
            paddingLeft: 5
        }}
    />
        : <ArrowUpwardIcon
        style={{
            fontSize: 14,
            paddingLeft: 5
        }}
    />;
    }
    return null;
  };
 
export interface TableProps { 
    columns: Column<object>[];
    data: object[];
    canSort?: boolean;
    canSearch?: boolean;
    pagination?: boolean;
    canExpand?: boolean;
    hiddenColumns?: string[];
    getRowProps?: (row: any) => void;
    getCellProps?: (cell: any) => void;
    renderRowSubComponent?: (row: any) => React.ReactNode;
    onSelectedRows?: (rows: any[]) => void;
} 

// Create a default prop getter
const defaultPropGetter = () => ({})
 
export const Table: React.FC<TableProps> = ({
    columns,
    data,
    canSearch = false,
    canSort = false,
    canExpand = false,
    pagination = false,
    hiddenColumns,
    getRowProps = defaultPropGetter,
    getCellProps = defaultPropGetter,
    renderRowSubComponent,
    onSelectedRows
}) => {
    const [records, setRecords] = useState(data);
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
        state,
        preGlobalFilteredRows,
        setGlobalFilter,
        setHiddenColumns,
        visibleColumns,
        selectedFlatRows,
        state: { selectedRowIds },
        page,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable(
        {
            columns,
            data: records,
            autoResetExpanded: false,
                initialState: { pageIndex: 0 }
        },
        canSearch ? useGlobalFilter : () => { },
        canSort ? useSortBy : () => { },
        canExpand ? useExpanded : () => { },
        pagination ? usePagination : () => { },
        useRowSelect
    );
    
    useEffect(() => {
        onSelectedRows && onSelectedRows(selectedFlatRows);
    }, [selectedFlatRows]);
    
    useEffect(() => {
        setRecords(data);
        if (hiddenColumns) {
            setHiddenColumns(hiddenColumns);
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [data, hiddenColumns]);

    const renderHead = () => {
        return (
            <TableHead>
                {headerGroups.map(headerGroup => (
                    <TableRow {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map(column => {
                            const headerProps = canSort
                                ? column.getHeaderProps(
                                    column.getSortByToggleProps({
                                        title: undefined
                                    })
                                )
                                : column.getHeaderProps();

                            return (
                                <TableCell
                                    {...headerProps}
                                    style={{
                                        width: column.width,
                                        maxWidth: column.maxWidth,
                                        minWidth: column.minWidth
                                    }}
                                    className={
                                        column.canSort
                                            ? "clickable"
                                            : ""
                                    }
                                >
                                    <span>{column.render("Header")}</span>
                                    {canSort && (
                                        <span>
                                            <SortIcon isSorted={column.isSorted} isSortedDesc={column.isSortedDesc} />
                                        </span>
                                    )}
                                </TableCell>
                            );
                        })}
                    </TableRow>
                ))}
            </TableHead>
        );
    }

    const renderRow = (
        row: any
    ) => {
        return (
            <React.Fragment key={row.id}>
                <TableRow
                    {...row.getRowProps(getRowProps(row))}
                >
                    {row.cells.map((cell: any) => (
                        <TableCell
                            {...cell.getCellProps(getCellProps(cell))}
                        >
                            {cell.render("Cell")}
                        </TableCell>
                    ))}
                </TableRow>
                {
                    row.isExpanded && renderRowSubComponent ? (
                        <TableRow>
                            <TableCell colSpan={visibleColumns.length}>
                                {renderRowSubComponent && renderRowSubComponent({ row })}
                            </TableCell>
                        </TableRow>
                    ) : null
                }
            </React.Fragment>
        );
    };

    const renderBody = () => {
        return (
            <TableBody {...getTableBodyProps()}>
                {
                    pagination ?
                        page.map((row: any) => {
                            prepareRow(row);
                            return renderRow(row);
                        }) :
                        rows.map((row: any) => {
                            prepareRow(row);
                            return renderRow(row);
                        })}
            </TableBody>
        );
    };

    const renderTable = () => {
        return (
            <MuiTable {...getTableProps()}>
                {renderHead()}
                {renderBody()}
            </MuiTable>
        );
    };


    return (
        <>  
            <GlobalFilter
                globalFilter={state.globalFilter}
                setGlobalFilter={setGlobalFilter}
            />      
            {renderTable()}
        </>
    )
};