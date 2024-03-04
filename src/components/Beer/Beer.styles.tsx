import { Card } from "antd";
import styled from "styled-components";

export const BeerCard = styled(Card)`
  overflow-wrap: break-word;
  cursor: pointer;
`;

export const CardContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
  align-items: center;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
  gap: 10px;
`;

export const Title = styled.div`
  display: flex;
  gap: 10px;
  align-items: center;
`;

export const Subtitle = styled.p`
  margin: 0;
  font-weight: 500;
`;

export const RowContainer = styled.div`
  display: flex;
  gap: 5px;
  flex-wrap: wrap;
`;
