import styled from "styled-components";

interface TableData {
  id: string;
  name: string;
  author?: string;
  pages?: number;
  author_id?: string;
  email?: string;
}

type ValidKeys = keyof TableData;

interface TableProps {
  data: TableData[]; 
  columns: ValidKeys[];
  onRowClick?: (row: TableData) => void; 
  onRemove?: (id: string) => void;
  onEdit?: (row: TableData) => void; 
}

const TableContainer = styled.table`
  width: 100%;
  border-collapse: collapse;
  margin-top: 1rem;

  @media (max-width: 768px) {
    display: block;
    overflow-x: auto;
    white-space: nowrap;
  }
`;

const TbodyMap = styled.tbody`
  width: 100%;

  @media (max-width: 768px) {
    display: block;
    width: 100%;
  }
`;

const TableHeader = styled.thead`
  background-color: #3b82f6;
  color: white;

  @media (max-width: 768px) {
    display: none;
  }
`;

const TableRow = styled.tr`
  &:hover {
    cursor: pointer;
  }

  @media (max-width: 768px) {
    display: block;
    border-bottom: 2px solid #e5e7eb;
    margin-bottom: 1rem;
  }
`;

const TableHeaderCell = styled.th`
  padding: 0.75rem;
  text-align: left;

  @media (max-width: 768px) {
    display: block;
    text-align: right;
    padding: 0.5rem;
    font-size: 0.875rem;
  }
`;

const TableCell = styled.td`
  padding: 0.75rem;
  border-bottom: 1px solid #e5e7eb;

  @media (max-width: 768px) {
    display: block;
    text-align: right;
    padding: 0.5rem;
    font-size: 0.875rem;
    border-bottom: 1px solid #e5e7eb;

    &::before {
      content: attr(data-label);
      float: left;
      font-weight: bold;
      text-transform: uppercase;
      color: #6b7280;
    }
  }
`;

const ActionButton = styled.button`
  padding: 0.5rem 1rem;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  margin-right: 0.5rem;

  @media (max-width: 768px) {
    padding: 0.4rem 0.8rem;
    font-size: 0.875rem;
  }
`;

const RemoveButton = styled(ActionButton)`
  background-color: #ef4444;
  color: white;
  &:hover {
    background-color: #dc2626;
  }
`;

const EditButton = styled(ActionButton)`
  background-color: #3b82f6;
  color: white;
  &:hover {
    background-color: #2563eb;
  }
`;

export function Table({
  data,
  columns,
  onRowClick,
  onRemove,
  onEdit,
}: TableProps) {
  return (
    <TableContainer>
      <TableHeader>
        <TableRow>
          {columns.map((col) => (
            <TableHeaderCell key={col}>{col}</TableHeaderCell>
          ))}
          {(onRemove || onEdit) && <TableHeaderCell>Ações</TableHeaderCell>}
        </TableRow>
      </TableHeader>
      <TbodyMap>
        {data.map((row, index) => (
          <TableRow key={index} onClick={() => onRowClick && onRowClick(row)}>
            {columns.map((col) => (
              <TableCell key={col} data-label={col}>
                {row[col]}
              </TableCell>
            ))}
            {(onRemove || onEdit) && (
              <TableCell data-label="Ações">
                {onEdit && (
                  <EditButton
                    onClick={(e) => {
                      e.stopPropagation();
                      onEdit(row);
                    }}
                  >
                    Editar
                  </EditButton>
                )}
                {onRemove && (
                  <RemoveButton
                    onClick={(e) => {
                      e.stopPropagation();
                      if (
                        window.confirm(
                          "Tem certeza que deseja remover este item?"
                        )
                      ) {
                        onRemove(row.id);
                      }
                    }}
                  >
                    Remover
                  </RemoveButton>
                )}
              </TableCell>
            )}
          </TableRow>
        ))}
      </TbodyMap>
    </TableContainer>
  );
}
