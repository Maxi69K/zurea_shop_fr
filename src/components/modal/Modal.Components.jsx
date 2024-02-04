import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toggleModal } from '../../redux/modal.slicer';

const ModalComponents = ({children}) => {

    const { modal } = useSelector((store) => store.modalStore);
    const dispatch = useDispatch();

  return modal && (
    <div className='modal-wrapper'>
        <div className="modal-content d-flex justify-content-center align-items-center ">
          <button className='close btn btn-sm btn-outline-light' onClick={()=>dispatch(toggleModal(false))}>X</button>
            {children}
        </div>
    </div>
  )
};

export default ModalComponents;
