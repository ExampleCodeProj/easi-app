/* eslint-disable react/prop-types */

import React, { FunctionComponent, useMemo } from 'react';
import { useTranslation } from 'react-i18next';
import { Link } from 'react-router-dom';
import { useSortBy, useTable } from 'react-table';
import { Link as UswdsLink, Table } from '@trussworks/react-uswds';
import classnames from 'classnames';
import { DateTime } from 'luxon';
import { GetAccessibilityRequests_accessibilityRequests_edges_node as AccessibilityRequests } from 'queries/types/GetAccessibilityRequests';

import formatDate from 'utils/formatDate';

// import cmsDivisionsAndOffices from 'constants/enums/cmsDivisionsAndOffices';

type AccessibilityRequestsTableProps = {
  requests: AccessibilityRequests[];
};

const AccessibilityRequestsTable: FunctionComponent<AccessibilityRequestsTableProps> = ({
  requests
}) => {
  const { t } = useTranslation('accessibility');
  const columns: any = useMemo(() => {
    return [
      {
        Header: t('requestTable.header.requestName'),
        accessor: 'requestName',
        Cell: ({ row, value }: any) => {
          return (
            <UswdsLink asCustom={Link} to={`/508/requests/${row.original.id}`}>
              {value}
            </UswdsLink>
          );
        },
        maxWidth: 350
      },
      {
        Header: t('requestTable.header.submissionDate'),
        accessor: 'submittedAt',
        Cell: ({ value }: any) => {
          if (value) {
            return formatDate(value);
          }
          return '';
        }
      },
      {
        Header: t('requestTable.header.businessOwner'),
        accessor: 'businessOwner'
      },
      {
        Header: t('requestTable.header.testDate'),
        accessor: 'relevantTestDate',
        Cell: ({ value }: any) => {
          if (value) {
            return formatDate(value);
          }
          return t('requestTable.emptyTestDate');
        }
      }
      // {
      //   Header: t('requestTable.header.status'),
      //   accessor: 'status',
      //   Cell: ({ row, value }: any) => {
      //     const date = DateTime.fromISO(row.original.updatedAt).toLocaleString(
      //       DateTime.DATE_FULL
      //     );
      //     return (
      //       <>
      //         <strong>{value}</strong>
      //         <br />
      //         <span>{`${t('requestTable.lastUpdated')} ${date}`}</span>
      //       </>
      //     );
      //   }
      // }
    ];
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const data = useMemo(() => {
    const tableData = requests.map(request => {
      const submittedAt = request.submittedAt
        ? DateTime.fromISO(request.submittedAt)
        : null;
      const businessOwner = `${request.system.businessOwner.name}, ${request.system.businessOwner.component}`;
      const testDate = request.relevantTestDate?.date
        ? DateTime.fromISO(request.relevantTestDate?.date)
        : null;

      return {
        id: request.id,
        requestName: request.name,
        submittedAt,
        businessOwner,
        relevantTestDate: testDate
      };
    });

    return tableData;
  }, [requests]);

  const {
    getTableProps,
    getTableBodyProps,
    headerGroups,
    rows,
    prepareRow
  } = useTable(
    {
      columns,
      data,
      sortTypes: {
        alphanumeric: (rowOne, rowTwo, columnName) => {
          const rowOneElem = rowOne.values[columnName];
          const rowTwoElem = rowTwo.values[columnName];

          // If item is a string, enforce capitalization (temporarily) and then compare
          if (typeof rowOneElem === 'string') {
            return rowOneElem.toUpperCase() > rowTwoElem.toUpperCase() ? 1 : -1;
          }

          // If item is a DateTime, convert to Number and compare
          if (rowOneElem instanceof DateTime) {
            return Number(rowOneElem) > Number(rowTwoElem) ? 1 : -1;
          }

          // If neither string nor DateTime, return bare comparison
          return rowOneElem > rowTwoElem ? 1 : -1;
        }
      },
      requests,
      initialState: {
        sortBy: [{ id: 'submittedAt', desc: true }]
      }
    },
    useSortBy
  );

  const getHeaderSortIcon = (isDesc: boolean | undefined) => {
    return classnames('margin-left-1', {
      'fa fa-caret-down': isDesc,
      'fa fa-caret-up': !isDesc
    });
  };

  const getColumnSortStatus = (
    column: any
  ): 'descending' | 'ascending' | 'none' => {
    if (column.isSorted) {
      if (column.isSortedDesc) {
        return 'descending';
      }
      return 'ascending';
    }

    return 'none';
  };

  return (
    <Table bordered={false} {...getTableProps()} fullWidth>
      <caption className="usa-sr-only">{t('requestTable.caption')}</caption>
      <thead>
        {headerGroups.map(headerGroup => (
          <tr {...headerGroup.getHeaderGroupProps()}>
            {headerGroup.headers.map(column => (
              <th
                {...column.getHeaderProps(column.getSortByToggleProps())}
                aria-sort={getColumnSortStatus(column)}
                style={{ whiteSpace: 'nowrap' }}
              >
                {column.render('Header')}
                {column.isSorted && (
                  <span className={getHeaderSortIcon(column.isSortedDesc)} />
                )}
              </th>
            ))}
          </tr>
        ))}
      </thead>
      <tbody {...getTableBodyProps()}>
        {rows.map(row => {
          prepareRow(row);
          return (
            <tr {...row.getRowProps()}>
              {row.cells.map((cell, i) => {
                if (i === 0) {
                  return (
                    <th
                      {...cell.getCellProps()}
                      scope="row"
                      style={{ maxWidth: '16rem' }}
                    >
                      {cell.render('Cell')}
                    </th>
                  );
                }
                return (
                  <td {...cell.getCellProps()} style={{ maxWidth: '16rem' }}>
                    {cell.render('Cell')}
                  </td>
                );
              })}
            </tr>
          );
        })}
      </tbody>
    </Table>
  );
};

export default AccessibilityRequestsTable;
