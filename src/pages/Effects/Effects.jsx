import React, { useState, useEffect } from 'react'
import { AxiosClient } from '../../apiClient';
import Cookies from 'js-cookie';

const thaiMonthNames = [
  'มกราคม', 'กุมภาพันธ์', 'มีนาคม', 'เมษายน', 'พฤษภาคม', 'มิถุนายน',
  'กรกฎาคม', 'สิงหาคม', 'กันยายน', 'ตุลาคม', 'พฤศจิกายน', 'ธันวาคม'
];

const formatThaiDate = (dateString) => {
  const date = new Date(dateString);
  const year = date.getFullYear() + 543; //ปีพศ
  const month = thaiMonthNames[date.getMonth()];
  const day = date.getDate();
  return `${day} ${month} ${year}`;
};

//หน้าประวัติผลข้างเคียง
const Effects =  () => {
  const [username, setUsername] = useState(null);
  const [history, setHistory] = useState([]);
  const [appointId, setAppointId] = useState(null);
  // const HN = '123456';
  // const appointId = 41;

  useEffect(() => {
    const user = Cookies.get('userName');
    if (user) {
      setUsername(user);
    }
  }, []);

  useEffect(() => {
    // This will log whenever the username changes
    console.log("username updated:", username);
  }, [username]);

  useEffect(() => {
    const fetchAppoint = async () => {
      console.log("1")
        try {
            const response = await AxiosClient.get(`/selectedappointId/${username}`);
            setAppointId(response.data);
        } catch (error) {
            console.error('Error fetching history:', error);
        }
    };
    if (username !== null) {
      fetchAppoint();
      console.log("appointId", appointId)
    }
}, [username]);

useEffect(() => {
  const fetchHistory = async () => {
    try {
      const response = await fetch(`http://localhost:8080/selectedFeedback2/${appointId}`);
      if (response.ok) {
        const data = await response.json(); // แปลง response เป็น JSON
        setHistory(data); // ใช้ข้อมูลที่แปลงแล้ว
      } else {
        console.error('Failed to fetch /selectedFeedback2/');
      }
    } catch (error) {
      console.error('Error fetching /selectedFeedback2/', error);
    }
  };
  
  if (appointId !== null && username !== null) {
    fetchHistory();
  }
}, [appointId]);

  return (
<div className='p-4'>
      <div className="pt-6">
        <h3 className='pb-4 text-center'>ประวัติการบันทึกผลข้างเคียง</h3>
        {/* <p>appointId: {appointId} username:{username}</p> */}
        {history.length > 0 ? (
          [...history].reverse().map((record, index) => (
            <div key={`${record.id}-${index}`} className="mt-4 box-sd">
              <div className="entry-left text-blue700 shadow-sm">
                <p className='text-sm text-center'>บันทึกครั้งที่</p>
                <h2 className='text-4xl text-blue700'>{history.length - index}</h2>
              </div>
              <div className='entry-right'>
                <h3 className='text-md font-bold'>
                  วันที่ {formatThaiDate(record.sendAt)}
                </h3>
                <p>{record.patientSideEffect}</p>
              </div>
            </div>
          ))
        ) : (
          <p>ไม่พบประวัติการบันทึกผลข้างเคียง</p>
        )}
    </div>   
    </div>
  )
}

export default Effects