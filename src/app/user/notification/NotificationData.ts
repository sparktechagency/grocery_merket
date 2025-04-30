import { 
    ImgNotificationOne, 
    ImgNotificationTwo, 
    ImgNotificationThree, 
    ImgNotificationFour, 
    ImgNotificationFive, 
    ImgNotificationSix
  } from "@/assets/images";
  
  export const notificationData = [
    {
      id: 1,
      image: ImgNotificationFour,
      title: "Shopper arrived.",
      description: "Our shopper has arrived in your location. Please receive your order.",
      time: "Today 10.00 AM",
      read: false,
      status: "arrived"
    },
    {
      id: 2,
      image: ImgNotificationOne,
      title: "Get 50% off on your first purchase",
      description: "Lorem ipsum dolor sit amet consectetur. Molestie amet a enim magna.",
      time: "Today 10.00 AM",
      read: true,
      status: "add"
    },
    {
      id: 3,
      image: ImgNotificationSix,
      title: "Your order has been picked up",
      description: "Lorem ipsum dolor sit amet consectetur. Molestie amet a enim magna.",
      time: "Today 10.00 AM",
      read: true,
      status: "pickUp"
    },
    {
      id: 4,
      image: ImgNotificationSix,
      title: "Your order has been picked up",
      description: "Your package is out for delivery. It will reach you soon.",
      time: "Today 11.30 AM",
      read: false,
      status: "pickUp"
    },
    {
      id: 5,
      image: ImgNotificationFive,
      title: "Welcome to our app!",
      description: "Thanks for joining us. Explore and enjoy amazing offers.",
      time: "Yesterday 5.00 PM",
      read: false,
      status: "add"
    },
    {
      id: 6,
      image: ImgNotificationFour,
      title: "Special weekend discounts!",
      description: "Don't miss exclusive discounts available this weekend only.",
      time: "Yesterday 3.00 PM",
      read: true,
      status: "arrived"
    },
    {
      id: 7,
      image: ImgNotificationTwo,
      title: "App Update Available",
      description: "A new version of the app is available. Update now for better experience.",
      time: "2 days ago",
      read: false,
      status: "add"
    },
    {
      id: 8,
      image: ImgNotificationThree,
      title: "Fresh Mangoes Now Available!",
      description: "Get the best quality mangoes at amazing prices today.",
      time: "2 days ago",
      read: true,
      status: "add"
    },
    {
      id: 9,
      image: ImgNotificationFour,
      title: "Shopper arrived.",
      description: "Your payment was successful. Thank you for your purchase!",
      time: "3 days ago",
      read: true,
      status: "add"
    },
    {
      id: 10,
      image: ImgNotificationOne,
      title: "Invite & Earn Rewards",
      description: "Invite your friends and earn exciting rewards!",
      time: "3 days ago",
      read: true,
      status: "add"
    }
  ];
  