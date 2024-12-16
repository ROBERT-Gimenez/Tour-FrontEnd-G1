import Swal from 'sweetalert2';

export const showErrorAlert = (message) => {
    Swal.fire({
      icon: 'error', 
      title: '¡Error!',
      text: message, 
      confirmButtonText: 'Aceptar',
    });
  };

export const showConfirm = (message) => {
    Swal.fire({
      icon: 'success', 
      title: '¡Confirmado!',
      text: message, 
      confirmButtonText: 'Aceptar',
    });
  };

export const handleClick = (acepted , cancel) => {
      Swal.fire({
        title: '¿Estás seguro?',
        text: '¿Quieres continuar con esta acción?',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonText: 'Sí',
        cancelButtonText: 'No',
        reverseButtons: true
      }).then((result) => {
        if (result.isConfirmed) {
            acepted()
          Swal.fire('¡Confirmado!', 'Has confirmado la acción.', 'success');
        } else if (result.isDismissed) {
            cancel()
          Swal.fire('Cancelado', 'La acción ha sido cancelada.', 'error');
        }
      });
    }

    export const spinner = (show) => {
      if (show) {
        Swal.fire({
          title: 'Cargando...',
          text: 'Por favor espera mientras se procesa la solicitud.',
          didOpen: () => {
            Swal.showLoading(); 
          },
          allowOutsideClick: false, 
          showConfirmButton: false,
        });
      }else{
        Swal.close();
      }
    };


export const handleReserve = (acepted , cancel , date) => {
  Swal.fire({
    title: `Estas por reservar la siguiente fecha : ${date.fecha}`,
    text: '¿Quieres continuar?',
    icon: 'warning',
    showCancelButton: true,
    confirmButtonText: 'Sí',
    cancelButtonText: 'No',
    reverseButtons: true
  }).then((result) => {
    if (result.isConfirmed) {
        acepted()
      Swal.fire('¡Confirmado!', 'Has confirmado la acción.', 'success');
    } else if (result.isDismissed) {
        cancel()
      Swal.fire('Cancelado', 'La acción ha sido cancelada.', 'error');
    }
  });
}