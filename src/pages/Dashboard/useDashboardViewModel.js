import { useState, useEffect } from "react";
import httpClient from "../../services/axios";

export default function useDashboardViewModel() {
  const [page, setPage] = useState(1);
  const [users, setUsers] = useState([]);
  const [totalPages, setTotalPage] = useState(1);
  const perPage = 2;

  function changePage(pageNumber) {
    if (pageNumber > 0 && pageNumber <= totalPages) {
      setPage(pageNumber);
    }
  }

  async function getUsers() {
    const token = localStorage.getItem("token");
    const headers = { headers: { Authorization: `Bearer ${token}` } };
    const response = await httpClient.get(
      `/users?page=${page}&perPage=${perPage}`,
      headers
    );
    setUsers(response.data.users);
    setTotalPage(response.data.numberOfPages);
  }

  useEffect(() => {
    getUsers();
  }, [page]);

  return {
    page,
    users,
    totalPages,
    setPage,
    setUsers,
    setTotalPage,
    changePage,
  };
}
