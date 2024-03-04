import Beer from "../Beer/Beer";
import { TBeer } from "../../types";
import { useAppSelector } from "../../hooks";
import { Pagination } from "antd";
import { CardsContainer, RowWrapper, Wrapper } from "./FavoriteBeers.styles";
import { useEffect, useState } from "react";
import { FAV_BEERS_PER_PAGE } from "../../consts";
import RemoveAllButton from "./RemoveAllButton";

const FavoriteBeers = () => {
  const [page, setPage] = useState<number>(1);
  const [beers, setBeers] = useState<TBeer[]>([]);
  const favoriteBeers = useAppSelector((state) => state.beers.favoriteBeers);

  const getPageBeers = () => {
    const pageBeers: TBeer[] = [];
    for (let i = 0; i < favoriteBeers.length; i++) {
      if (
        i >= (page - 1) * FAV_BEERS_PER_PAGE &&
        i < page * FAV_BEERS_PER_PAGE
      ) {
        pageBeers.push(favoriteBeers[i]);
      }
    }
    setBeers(pageBeers);
  };

  useEffect(() => {
    getPageBeers();
  }, [page, favoriteBeers]);

  return (
    <>
      {favoriteBeers.length === 0 ? (
        "No Favorites yet..."
      ) : (
        <Wrapper>
          <RowWrapper>
            <RemoveAllButton />
            <Pagination
              current={page}
              onChange={(newPage) => setPage(newPage)}
              total={favoriteBeers.length}
              pageSize={FAV_BEERS_PER_PAGE}
              showSizeChanger={false}
            />
          </RowWrapper>
          <CardsContainer>
            {beers.map((beer: TBeer) => (
              <Beer
                key={beer.id}
                isFavorite={
                  favoriteBeers.findIndex((b) => b.id === beer.id) > -1
                }
                favoritesPage
                {...beer}
              />
            ))}
          </CardsContainer>
        </Wrapper>
      )}
    </>
  );
};

export default FavoriteBeers;
