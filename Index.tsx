import React,{ useState } from 'react';
import AddrModal from './modal/AddrModal';

function Index() {
    const [modalSet, setModalSet] = useState(false);
    const [zipCode, setZipCode] = useState('');
    const [addr, setAddr] = useState('');

    return (
        <div className="Index">
            <a onClick={()=>{
                setModalSet(true);
            }}>검색</a>
            <h1>우편번호 : {zipCode}</h1>
            <h1>주소 : {addr}</h1>
            <AddrModal open={modalSet} reSet={setModalSet} setZipCode={setZipCode} setAddr={setAddr} />
        </div>
    );
    
}

export default Index;
