import { useGetNotificationsQuery, useReadNotificationsMutation } from '@/redux/api/postsApiSlice';
import { useAppSelector } from '@/redux/hooks';
import React, { useState } from 'react'
import { ImFileEmpty } from 'react-icons/im';
import NotificationDropdownItem from './NotificationDropdownItem';
import { GrNotification } from 'react-icons/gr';

interface notificationType{
  id: string;
  message: string;
  is_read: boolean;
  date: Date;
  receiver: string;
  sender: {
    id:string,
    username: string;
    image: string
  };
  post: string
}
const Notifications = () => {
  const [notificationToggler, setNotificationToggler] = useState(false)
  const {id} = useAppSelector(state=>state.auth.user)
  const [notification_count, setNotifications] = useState<number>(0)
  const {data} = useGetNotificationsQuery({size:'10'}, {refetchOnFocus:true})
  const notificationsSocket = new WebSocket(`ws://127.0.0.1:8000/ws/notify/${id}/`)
  const [readNotifications] = useReadNotificationsMutation()
  notificationsSocket.onopen = function(e){
    console.log('ws connected');
  
  }
  notificationsSocket.onclose = function (e) {
    console.log('ws disconnected');
    
  };
  notificationsSocket.onmessage = function (e) {        
    setNotifications(notification_count + 1)
  };
  const handleReadNotification = () =>{
    setNotificationToggler(!notificationToggler)
    setNotifications(0)
    readNotifications({})
  }
  return (
    <>
      <button 
          onClick={handleReadNotification} 
          className="relative rounded-full p-4 transition-all cursor-pointer bg-gray-100 hover:bg-gray-200"
      >
        {
          notification_count ?
            <span className='absolute -mr-2 -mt-1 top-0 right-0 px-[7px] bg-red-600 rounded-full text-white text-sm'>{notification_count}</span>
          :null
        }
          <GrNotification />
      </button>
      {
        notificationToggler?
          <div className='absolute right-10 top-[60px] max-w-[40rem] bg-white rounded-md shadow-lg px-2 py-2 z-10 my-3 max-h-[70%] overflow-y-auto space-y-2'>
          {
            data && data?.notifications?.length?
                data.notifications.map((notification:notificationType)=>(
                    <NotificationDropdownItem notification={notification} key={notification.id} />
                ))
            :
            <div className='py-3 px-20'>
                <p className='text-lg font-bold flex gap-4 items-center'>
                    <ImFileEmpty /> 
                    No Notifications Available
                </p>
            </div>
          }
          </div>
        :null
      }
    </>
  )
}

export default Notifications
