import React,{ useState, useEffect } from 'react';
import axios from 'axios';
import Box from '@mui/material/Box';
import Modal from '@mui/material/Modal';
import Loader from '../utils/Loader'
import './AddrModal.scss';

function AddrModal(props:{[key : string] : any}) {
    // 모달 베이스 스타일
    const style = {
        position: 'absolute' as 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: '500px',
        height: '300px',
        bgcolor: '#fff',
        border: '1px solid #004a87',
        boxShadow: 24,
    };
    
    // 우편번호 값 관리
    const [zipCode, setZipCode] = useState('');
    const handleZipCode = (e :any) => {
        setZipCode(e.target.value);
    }
    
    // 주소 리턴 값
    const [addr_1, setAddr_1] = useState('');
    const [addr_2, setAddr_2] = useState('');
    const [addr_3, setAddr_3] = useState('');
    
    // 모달 및 로딩 컨트롤
    const [open, setOpen] = useState(false);
    const [loading, setLoading] = useState(false);
    const handleClose = () => {
        reSet();
        setOpen(false);
    };
    
    // 값 리셋
    const reSet = () => {
        setZipCode('');
        setAddr_1('');
        setAddr_2('');
        setAddr_3('');
    };
    
    // 주소 검색
    const addrSeach = () => {
        if(zipCode.length != 6){
            alert("Please enter a 6-digit postal code");
            return;
        }
        setLoading(true);
        axios({
            url: 'https://global-address.p.rapidapi.com/V3/WEB/GlobalAddress/doGlobalAddress',
            method: 'get',
            params: {
                ctry          : 'SG', 
                postal        : zipCode,
                format        : 'json', 
                DeliveryLines : 'Off', 
            },
            headers: {
                'x-rapidapi-host' : 'global-address.p.rapidapi.com',
                'x-rapidapi-key'  : '~~~~~~~~~~' // 유저 키 값
            }
        }).then(res => { 
            setLoading(false);
            if(res.data && res.data.Records[0]){ 
                if(res.data.Records[0].AddressLine1 == ''){
                    alert("No results were found for your search.");
                    reSet();
                    return;
                }
                setAddr_1(res.data.Records[0].AddressLine1); 
                setAddr_2(res.data.Records[0].AddressLine2); 
                setAddr_3(res.data.Records[0].AddressLine3);
            }
        }).catch(function (error) {
            console.error(error);
        });
    }
    
    // 부모 모달 제어
    useEffect(() => {
        if(props.open){
            setOpen(props.open);
        }
        props.reSet(false);
    }, [props.open]);

    return (
        <div className="postalCodeModal">
            <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
            >
                <Box className="postalCodeCon" sx={style}>
                    <Loader loading={loading} />
                    <div className="findPostalBox">
                        <input type="number" className="findPostal" placeholder="Please Enter your 6-digit Postal Code" onChange={handleZipCode} value={zipCode}   
                            onKeyPress={(e) => {
                                if(e.key == 'Enter'){
                                    addrSeach();
                                }
                            }} />
                        <img className="suchIcon" src="/images/user/such_icon.png" onClick={addrSeach}/>
                    </div>
                    <div className="postalCodeBtmCon">
                        <div className="postalCodeList">
                            <p>{addr_1}</p>
                            <span>{addr_2}</span>
                            <span>{addr_3}</span>
                            { addr_1 != ''
                            ?   <div className="postalSelectBt" onClick={()=>{
                                    let fullAddr = addr_1 + (addr_2 != '' ? " " + addr_2 : "") + (addr_3 != '' ? " " + addr_3 : "");
                                    props.setZipCode(zipCode);
                                    props.setAddr(fullAddr);
                                    handleClose();
                                }}>
                                    Select
                                </div>
                            :   null
                            }
                        </div>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}

export default AddrModal;
