interface INotificationOptions {
  body?: string;
  icon?: string;
  dir?: 'auto' | 'ltr' | 'rtl';
}

export function sendNotification(title: string, options: INotificationOptions) {
  if (!('Notification' in window)) {
    // alert('Ваш браузер не поддерживает HTML Notifications, его необходимо обновить.');
  } else if (Notification.permission === 'granted') {
    new Notification(title, options);
  } else if (Notification.permission !== 'denied') {
    Notification.requestPermission(function (permission) {
      if (permission === 'granted') {
        new Notification(title, options);
      } else {
        // alert('Вы запретили показывать уведомления'); 
      }
    });
  }
}
