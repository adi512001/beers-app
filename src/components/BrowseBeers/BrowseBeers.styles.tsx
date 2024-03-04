import styled from "styled-components";
import { Input } from "antd";

const { Search } = Input;

export const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  gap: 1rem;
  align-items: center;
`;

export const RowWrapper = styled.div`
  display: flex;
  flex-direction: row;
  gap: 1rem;
  justify-content: space-between;
  width: 90%;
`;

export const CardsContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 10px;
  width: 75vw;
  height: 82vh;
`;

export const ErrorMessage = styled.div`
  color: red;
  text-align: start;
`;

export const NoDataMessage = styled.div`
  text-align: start;
`;

export const SearchInput = styled(Search)`
  width: 200px;
`;
