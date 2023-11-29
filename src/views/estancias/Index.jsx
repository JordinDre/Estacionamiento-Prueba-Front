import React, { useState, useEffect } from "react";
import axioss from "../../utils/axios";
import { abreviar, formatearDinero, restarHoras } from "../../helpers";
import Toast from '../../components/Toast';
import Icon from '../../components/Icon';
import DataTable from "../../components/DataTable/DataTable";
import Permiso from "../../components/Permiso";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";
import Title from '../../components/Title';

export default function Index() {
  const [estancias, setEstancias] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    fetchData(page, "");
  }, [refresh, page]);

  const fetchData = (page, searchTerm, sortField = null, sortOrder = null) => {
    setIsLoading(true);
    const params = {
      page: page,
      search: searchTerm,
      sortField: sortField,
      sortOrder: sortOrder,
    };
    axioss.get("estancias", { params })
      .then(function (res) {
        setEstancias(res.data.data.data);
        setPaginationData({
          currentPage: res.data.data.current_page,
          lastPage: res.data.data.last_page,
          total: res.data.data.total,
        });
        setIsLoading(false)
      })
      .catch(function (error) {
        console.error(error);
        setIsLoading(false)
      });
  };

  return (
    <>
      {mensaje && <Toast color="success">{mensaje}</Toast>}
      <div className='flex justify-between my-2'>
        <Title>Estancias</Title>
      </div>
      <DataTable
        columns={[
          { header: 'ID', field: 'id' },
          { header: 'Placa', field: 'placa' },
          { header: 'Entrada', field: 'entrada' },
          { header: 'Salida', field: 'salida' },
          { header: 'Tipo de Vehículo', field: 'tipo_vehiculo' },
          { header: 'Tarifa', field: 'tarifa' },
        ]}
        rows={estancias?.map((item) => ({
          id: item.id,
          placa: item.vehiculo.placa,
          entrada: item?.entrada,
          salida: item?.salida,
          tipo_vehiculo: item?.vehiculo?.tipo_vehiculo?.tipo_vehiculo,
          tarifa: formatearDinero(item?.vehiculo?.tipo_vehiculo?.tarifa),
        }))}
        fetchData={fetchData}
        initialPage={page}
        paginationData={paginationData}
        isLoading={isLoading}
      />
    </>
  );
}
