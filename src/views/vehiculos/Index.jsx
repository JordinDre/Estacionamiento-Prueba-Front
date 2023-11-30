import React, { useState, useEffect } from "react";
import axioss from "../../utils/axios";
import { abreviar, formatearDinero } from "../../helpers";
import Formulario from './Formulario';
import Toast from '../../components/Toast';
import Icon from '../../components/Icon';
import DataTable from "../../components/DataTable/DataTable";
import Permiso from "../../components/Permiso";
import Badge from "../../components/Badge";
import Modal from "../../components/Modal";
import Title from '../../components/Title';

export default function Index() {
  const [vehiculos, setVehiculos] = useState([]);
  const [mensaje, setMensaje] = useState("");
  const [refresh, setRefresh] = useState(false);
  const [page, setPage] = useState(1);
  const [paginationData, setPaginationData] = useState({});
  const [isLoading, setIsLoading] = useState(true);

  function Accions(props) {
    return (
      <div className='flex'>
        <Modal title={`Información de placa ${props.row.placa}`} button={<Icon icon='ver' />} tooltip="Ver" size='sm' color='primary'>
          <Formulario {...props.row} accion={1} setMensaje={setMensaje} />
        </Modal>

        <Modal title={`Editar placa ${props.row.placa}`} button={<Icon icon='editar' />} tooltip="Editar" size='sm' color='warning'>
          <Formulario  {...props.row} accion={2} setMensaje={setMensaje} setRefresh={setRefresh} refresh={refresh} />
        </Modal>

        <Modal title={`Eliminar placa ${props.row.placa}`} button={<Icon icon='eliminar' />} tooltip="Eliminar" size='xs' color='danger'>
          <Formulario  {...props.row} accion={3} setMensaje={setMensaje} setRefresh={setRefresh} refresh={refresh} />
        </Modal>
      </div>
    );
  }

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
    axioss.get("vehiculos", { params })
      .then(function (res) {
        setVehiculos(res.data.data.data);
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
        <Title>Vehículos</Title>
        <Modal title='Agregar Vehículo' button='Agregar Vehículo' size='sm' color='primary'>
          <Formulario accion={0} setMensaje={setMensaje} setRefresh={setRefresh} refresh={refresh} />
        </Modal>
      </div>
      <DataTable
        columns={[
          { header: 'ID', field: 'id' },
          { header: 'Placa', field: 'placa' },
          { header: 'Estado', field: 'estado' },
          { header: 'Tipo de Vehículo', field: 'tipo_vehiculo' },
          { header: 'Tarifa', field: 'tarifa' },
          { header: 'Acciones', field: 'acciones' }
        ]}
        rows={vehiculos?.map((item) => ({
          id: item.id,
          placa: item.placa,
          estado: item.estado ? <Badge label={"✓"} color="success" /> : <Badge label={"X"} color="danger" />,
          tipo_vehiculo: item?.tipo_vehiculo?.tipo_vehiculo,
          tarifa: formatearDinero(item?.tipo_vehiculo?.tarifa),
          acciones: <Accions row={item} />
        }))}
        fetchData={fetchData}
        initialPage={page}
        paginationData={paginationData}
        isLoading={isLoading}
      />
    </>
  );
}
