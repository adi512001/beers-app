import { Button, Modal } from "antd";
import { useState } from "react";
import { useAppDispatch } from "../../hooks";
import { removeAllFavoriteBeers } from "../../slices/beersSlice";

const RemoveAllButton = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  const dispatch = useAppDispatch();

  const removeAllFavorites = async () => {
    await dispatch(removeAllFavoriteBeers());
    setIsModalOpen(false);
  };

  return (
    <>
      <Button onClick={() => setIsModalOpen(true)}>Remove All</Button>
      <Modal
        title="Remove All Favorites"
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        okText="Remove"
        okButtonProps={{ danger: true }}
        onOk={removeAllFavorites}
        destroyOnClose
      >
        Are you sure you want to remove all favorite beers?
      </Modal>
    </>
  );
};

export default RemoveAllButton;
