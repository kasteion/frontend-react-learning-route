import React, { useEffect, useState } from "react";
import { withRouter } from "react-router-dom";
import PageLoading from "../components/PageLoading";
import PageError from "../components/PageError";
import BadgeDetails from "../components/BadgeDetails";
import api from "../api";

const BadgeDetailsContainer = (props) => {
  const [status, setStatus] = useState({ loading: false, error: null });
  const [modalIsOpen, setModalIsOpen] = useState(false);
  const [data, setData] = useState({ data: undefined });

  const getData = async () => {
    try {
      setStatus({ loading: true, error: null });
      //console.log(props.match.params.badgeId);
      const response = await api.badges.read(props.match.params.badgeId);
      setData(response);
      setStatus({ loading: false, error: null });
    } catch (err) {
      setStatus({ loading: false, error: err });
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const handleCloseModal = (e) => {
    setModalIsOpen(false);
  };

  const handleOpenModal = (e) => {
    setModalIsOpen(true);
  };

  const handleDeleteBadge = async (e) => {
    try {
      setStatus({ loading: true, error: null });
      await api.badges.remove(props.match.params.badgeId);
      props.history.push("/badges");
      setStatus({ loading: false, error: null });
    } catch (err) {
      setStatus({ loading: false, error: err });
    }
  };

  if (status.loading) {
    return <PageLoading></PageLoading>;
  }
  if (status.error) {
    return <PageError error={status.error}></PageError>;
  }
  if (!status.loading && !status.error) {
    return (
      <BadgeDetails
        onCloseModal={handleCloseModal}
        onOpenModal={handleOpenModal}
        onDeleteBadge={handleDeleteBadge}
        modalIsOpen={modalIsOpen}
        badge={data}
      />
    );
  }
};

export default withRouter(BadgeDetailsContainer);
