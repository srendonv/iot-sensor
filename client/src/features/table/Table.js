import React,{useState} from 'react';
import {useTable, useBlockLayout, useGlobalFilter, useSortBy, useAsyncDebounce} from 'react-table';
import scrollbarWidth from './scrollbarWidth';
import { FixedSizeList } from 'react-window';

const TWO_HUNDRED_MS = 100;

/*
 * Helper function as global filter
*/

function GlobalFilter({preGlobalFilteredRows, globalFilter,setGlobalFilter}){
  const [value, setValue] = useState(globalFilter);
  const onChange = useAsyncDebounce(value => {
    setGlobalFilter(value || undefined)
  }, TWO_HUNDRED_MS);
  return (
    <input  value={value || ""}
            onChange={e => {
                setValue(e.target.value);
                onChange(e.target.value);
              }}
    placeholder={`Search`}
  />);
}

/*
 * Table component function
*/
export function Table({ columns, data }){
  
  const defaultColumn = React.useMemo(
    () => ({
      width: 160,
    }),
    []
  )

  const scrollBarSize = React.useMemo(() => scrollbarWidth(), [])
    
  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    totalColumnsWidth,
    prepareRow,
    state: { globalFilter },
    visibleColumns,
    preGlobalFilteredRows,
    setGlobalFilter
  } = useTable({ columns, data, defaultColumn },useBlockLayout, useGlobalFilter, useSortBy);


  const RenderRow = React.useCallback(
    ({ index, style }) => {
      const row = rows[index]
      prepareRow(row)
      return (
        <tr
          {...row.getRowProps({
            style,
          })}
          className="tr"
        >
          {row.cells.map(cell => {
            return (
              <td {...cell.getCellProps()} className="td">
                {cell.render('Cell')}
              </td>
            )
          })}
        </tr>
      )
    },
    [prepareRow, rows]
  )

      return (
        <div>
        <table {...getTableProps()} sorting>
          <thead>
          <tr>
          <th colSpan={visibleColumns.length}>
            <GlobalFilter
            preGlobalFilteredRows={preGlobalFilteredRows}
            globalFilter={globalFilter}
            setGlobalFilter={setGlobalFilter}
            />
          </th>
        </tr>
            {headerGroups.map(headerGroup => (
              <tr {...headerGroup.getHeaderGroupProps()} >
                {headerGroup.headers.map(column => (
                  <th {...column.getHeaderProps(column.getSortByToggleProps())} >
                    {column.render('Header')}
                  </th>
                ))}
              </tr>
            ))}
          </thead>
    
          <tbody {...getTableBodyProps()}>
            <FixedSizeList
              height={500}
              itemCount={rows.length}
              itemSize={45}
              width={totalColumnsWidth+scrollBarSize}
            >
              {RenderRow}
            </FixedSizeList>
          </tbody>
        </table>
        </div>
      )
}
