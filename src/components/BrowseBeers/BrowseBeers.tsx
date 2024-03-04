import { useEffect, useState } from "react";
import {
  CardsContainer,
  ErrorMessage,
  NoDataMessage,
  RowWrapper,
  SearchInput,
  Wrapper,
} from "./BrowseBeers.styles";
import axios from "axios";
import Beer from "../Beer/Beer";
import { TBeer } from "../../types";
import { useAppDispatch, useAppSelector } from "../../hooks";
import { setBeers } from "../../slices/beersSlice";
import {
  API_ENDPOINT,
  BEERS_PER_PAGE,
  BEERS_TOTAL,
  LOADER_BEERS,
} from "../../consts";
import { Pagination } from "antd";
import type { SearchProps } from "antd/es/input/Search";

const BrowseBeers = () => {
  const [page, setPage] = useState<number>(1);
  const [error, setError] = useState<string>("");
  const [loading, setLoading] = useState<boolean>(true);
  const [totalBeers, setTotalBeers] = useState<number>(BEERS_TOTAL);

  const dispatch = useAppDispatch();

  const beers = useAppSelector((state) => state.beers.beers);
  const favoriteBeers = useAppSelector((state) => state.beers.favoriteBeers);

  const getBeers = async () => {
    setLoading(true);
    await axios
      .get(`${API_ENDPOINT}?page=${page}&per_page=${BEERS_PER_PAGE}`)
      .then((res) => {
        dispatch(setBeers(res.data));
        setTotalBeers(BEERS_TOTAL);
      })
      .catch(() => {
        setError("There has been an error fetching the beers.");
        setTotalBeers(0);
      });
    setLoading(false);
  };

  const onSearch: SearchProps["onSearch"] = async (value) => {
    if (value === "") {
      return getBeers();
    }
    setLoading(true);
    setPage(1);
    const inputText = value.replaceAll(" ", "_");
    await axios
      .get(
        `${API_ENDPOINT}?page=1&per_page=${BEERS_PER_PAGE}&food=${inputText}`
      )
      .then((res) => {
        dispatch(setBeers(res.data));
        setTotalBeers(res.data?.length);
      })
      .catch(() => {
        setError("There has been an error fetching the beers.");
        setTotalBeers(0);
      });
    setLoading(false);
  };

  useEffect(() => {
    getBeers();
  }, [page]);

  const renderBeers = () => {
    if (error !== "") {
      return <ErrorMessage>{error}</ErrorMessage>;
    }
    if (loading) {
      return LOADER_BEERS.map((beer: TBeer) => (
        <Beer
          key={beer.id}
          loading={loading}
          isFavorite={favoriteBeers.findIndex((b) => b.id === beer.id) > -1}
          {...beer}
        />
      ));
    }
    if (beers.length === 0) {
      return <NoDataMessage>No beers matching...</NoDataMessage>;
    }
    return beers.map((beer: TBeer) => (
      <Beer
        key={beer.id}
        loading={loading}
        isFavorite={favoriteBeers.findIndex((b) => b.id === beer.id) > -1}
        {...beer}
      />
    ));
  };

  return (
    <Wrapper>
      <RowWrapper>
        <SearchInput
          placeholder="Search food"
          allowClear
          onSearch={onSearch}
          loading={loading}
        />
        {error === "" && totalBeers > 0 && (
          <Pagination
            current={page}
            onChange={(newPage) => setPage(newPage)}
            total={totalBeers}
            pageSize={BEERS_PER_PAGE}
            showSizeChanger={false}
          />
        )}
      </RowWrapper>
      <CardsContainer>{renderBeers()}</CardsContainer>
    </Wrapper>
  );
};

export default BrowseBeers;
