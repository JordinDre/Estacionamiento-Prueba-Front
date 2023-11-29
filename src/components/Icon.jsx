import React from 'react'
import DeleteIcon from '@mui/icons-material/Delete';
import VisibilityIcon from '@mui/icons-material/Visibility';
import EditIcon from '@mui/icons-material/Edit';
import HomeIcon from '@mui/icons-material/Home';
import PersonIcon from '@mui/icons-material/Person';
import AddIcon from '@mui/icons-material/Add';
import CheckIcon from '@mui/icons-material/Check';
import CloseIcon from '@mui/icons-material/Close';
import AssignmentTurnedInIcon from '@mui/icons-material/AssignmentTurnedIn';
import PercentIcon from '@mui/icons-material/Percent';
import LaunchIcon from '@mui/icons-material/Launch';
import SettingsIcon from '@mui/icons-material/Settings';
import GarageIcon from '@mui/icons-material/Garage';
import InputIcon from '@mui/icons-material/Input';
import LogoutIcon from '@mui/icons-material/Logout';
import DirectionsCarIcon from '@mui/icons-material/DirectionsCar';

export default function Icon(props) {

    const { icon, size } = props;

    const iconStyles = {
        fontSize: size || 20,
    };

    const icons = {
        home: <HomeIcon style={iconStyles} />,
        eliminar: <DeleteIcon style={iconStyles} />,
        editar: <EditIcon style={iconStyles} />,
        ver: <VisibilityIcon style={iconStyles} />,
        user: <PersonIcon style={iconStyles} />,
        agregar: <AddIcon style={iconStyles} />,
        confirmar: <CheckIcon style={iconStyles} />,
        anular: <CloseIcon style={iconStyles} />,
        finalizar: <AssignmentTurnedInIcon style={iconStyles} />,
        excel: <PercentIcon style={iconStyles} />,
        redirect: <LaunchIcon style={iconStyles} />,
        configuracion: <SettingsIcon style={iconStyles} />,
        tipo_vehiculo: <GarageIcon style={iconStyles} />,
        entrada: <InputIcon style={iconStyles} />,
        salida: <LogoutIcon style={iconStyles} />,
        vehiculo: <DirectionsCarIcon style={iconStyles} />,
    };

    return icons[icon] || <HomeIcon style={iconStyles} />
}
