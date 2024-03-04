import { TBeerProps } from "../../types";
import { Avatar, Modal, Select, Tag } from "antd";
import { AlertFilled, HeartFilled, HeartOutlined } from "@ant-design/icons";
import { useAppDispatch } from "../../hooks";
import { setFavoriteBeers, setBeerRank } from "../../slices/beersSlice";
import {
  BeerCard,
  CardContent,
  Content,
  RowContainer,
  Subtitle,
  Title,
} from "./Beer.styles";
import { useState } from "react";
import { RANK_VALUES } from "../../consts";

const Beer = (props: TBeerProps) => {
  const {
    loading,
    name,
    id,
    image_url,
    isFavorite,
    description,
    food_pairing,
    brewers_tips,
    favoritesPage,
    rank,
  } = props;

  const { Option } = Select;
  const dispatch = useAppDispatch();

  const [isModalOpen, setIsModalOpen] = useState(false);

  const onRankClick = (value: number) => {
    dispatch(setBeerRank({ beerId: id, rank: value }));
  };

  const renderItems = () =>
    RANK_VALUES.map((val, index) => {
      return (
        <Option key={val + index} value={val}>
          {val}
        </Option>
      );
    });

  const handleFavorite = (
    e: React.MouseEvent<HTMLSpanElement, MouseEvent>,
    value: boolean
  ) => {
    e.stopPropagation();
    dispatch(setFavoriteBeers({ beer: { ...props }, favoriteValue: value }));
  };

  return (
    <>
      <BeerCard
        onClick={() => setIsModalOpen(true)}
        loading={loading}
        title={name}
        actions={[
          isFavorite ? (
            <HeartFilled onClick={(e) => handleFavorite(e, false)} />
          ) : (
            <HeartOutlined onClick={(e) => handleFavorite(e, true)} />
          ),
        ]}
      >
        <CardContent>
          {image_url && <Avatar src={image_url} size="large" />}
          {favoritesPage && (
            <Select
              placeholder="Rank"
              defaultValue={rank && rank}
              onClick={(e) => e.stopPropagation()}
              onSelect={(val) => onRankClick(val)}
              dropdownStyle={{ textAlign: "center" }}
            >
              {renderItems()}
            </Select>
          )}
        </CardContent>
      </BeerCard>
      <Modal
        title={
          <Title>
            {image_url && <Avatar src={image_url} size="large" />}
            {name}
          </Title>
        }
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        destroyOnClose
        footer={null}
      >
        <Content>
          {description && description}
          <Subtitle>Food Pairings:</Subtitle>
          <RowContainer>
            {food_pairing?.map((food, index) => (
              <Tag bordered={false} color="blue" key={food + index}>
                {food}
              </Tag>
            ))}
          </RowContainer>
          {brewers_tips && (
            <RowContainer>
              <AlertFilled />
              <Subtitle>{`Tip: `}</Subtitle>
              <span>{brewers_tips}</span>
            </RowContainer>
          )}
        </Content>
      </Modal>
    </>
  );
};

export default Beer;
