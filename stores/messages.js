import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { data } from "autoprefixer";

export const useMessage = defineStore("message", {
  state: () => ({
    isError: false,
    userInput: "",
    userComment: "",
    ws: null,
    wsConnected: false,
    //messagesArray: [],
    sampleChatTimeStamp: null,
    sessionID: "",
    responseData: [],
    historyData: [],
    newMessageArray: [
      {
        userMessage: "",
        botMessage: [
          "Xin chào 👋 ! Tôi là trợ lý thông minh của bạn.",
          "Tôi có thể giúp bạn tìm kiếm tất cả các nội dung liên quan đến FPT Play.",
          "Vậy tôi có thể giúp gì cho bạn?",
        ],

        timestamp: null,
        videos: [],
        images: [],
        contents: [],
        urls: [],
      },
    ],
    botMessageID: "",
    isLoading: false,
  }),
  actions: {
    // async joinRoom() {
    //   try {
    //     // Cấu hình request với headers và body
    //     const response = await axios.post(
    //       'https://livechat-staging.fptplay.net/center/api/v1/web/Channel/c022b6027bdd4c258314c07a81986781/join',
    //       { 
    //         password: "" 
    //       },
    //       {
    //         headers: {
    //           'Content-Type': 'application/json',
    //           'platform': 'web',
    //           'token': '2795893ee633a1386de1150f7f70c4daeb5a6842df531e8ed9c77968b7d316cfd26c114f3d8d2a07655b26e2b3cb95948afff51596464b19b965a70457c3f2f58778b6c6c031a048ccb395f081bd5dc9fac8a2e769e35cbcb56f086b6cfb79b4859705e1945cb758a555ce82f121f418f28aa2dd473decb7b21de4e9a6218a23031dff7f9d292cd6cc9db5c6bb89c6a667987c832a6a4a7f0d3f85670321e734cf8a4d5fef466f5b81e7840b99308a47cf297d1fbc0cd6bef1b8a068569a711342d865a327a8c29e79403da24000ce8de3fe6ab8fa3a112612834054e435e4e80cb902eb48dd36b79fb1d4cb5a0b0e95',
    //         },
    //       }
    //     );
    
    //     if (response.data && response.data.roomData) {
    //       this.message = 'Joined room successfully!';
    //       this.data = response.data.roomData;
    
    //       // Kết nối WebSocket nếu URL được cung cấp trong response
    //       if (response.data.wsUrl) {
    //         this.initWebSocket(response.data.wsUrl);
    //       }
    //     } else {
    //       this.message = response.data.message || 'Failed to join room.';
    //     }
    //   } catch (error) {
    //     this.message = 'Error joining room.';
    //   }
    // },   

    // initWebSocket() {
    //   const wsUrl = 'wss://ws-livechat-staging.fptplay.net/livechat/c022b6027bdd4c258314c07a81986781?token=2795893ee633a1386de1150f7f70c4daeb5a6842df531e8ed9c77968b7d316cfd26c114f3d8d2a07655b26e2b3cb95948afff51596464b19b965a70457c3f2f58778b6c6c031a048ccb395f081bd5dc9fac8a2e769e35cbcb56f086b6cfb79b4859705e1945cb758a555ce82f121f418f28aa2dd473decb7b21de4e9a6218a23031dff7f9d292cd6cc9db5c6bb89c6a667987c832a6a4a7f0d3f85670321e734cf8a4d5fef466f5b81e7840b99308a47cf297d1fbc0cd6bef1b8a068569a711342d865a327a8c29e79403da24000ce8de3fe6ab8fa3a112612834054e435e4e80cb902eb48dd36b79fb1d4cb5a0b0e95';
    
    //   this.ws = new WebSocket(wsUrl);
    
    //   this.ws.onopen = () => {
    //     console.log('WebSocket connected');
    //   };
    
    //   this.ws.onclose = () => {
    //     console.log('WebSocket disconnected');
    //   };
    
    //   this.ws.onmessage = (event) => {
    //     const newData = JSON.parse(event.data);
    //     console.log('Received from WebSocket:', newData);
    
    //     // Xử lý dữ liệu nhận được từ WebSocket và cập nhật vào `data`
    //     this.data = newData;
    //   };
    // },

    // initWebSocket() {
    //   if (!this.ws || this.ws.readyState === WebSocket.CLOSED) {
    //     this.ws = new WebSocket('wss://ws-livechat-staging.fptplay.net/livechat/c022b6027bdd4c258314c07a81986781?token=2795893ee633a1386de1150f7f70c4daeb5a6842df531e8ed9c77968b7d316cfd26c114f3d8d2a07655b26e2b3cb95948afff51596464b19b965a70457c3f2f58778b6c6c031a048ccb395f081bd5dc9fac8a2e769e35cbcb56f086b6cfb79b4859705e1945cb758a555ce82f121f418f28aa2dd473decb7b21de4e9a6218a23031dff7f9d292cd6cc9db5c6bb89c6a667987c832a6a4a7f0d3f85670321e734cf8a4d5fef466f5b81e7840b99308a47cf297d1fbc0cd6bef1b8a068569a711342d865a327a8c29e79403da24000ce8de3fe6ab8fa3a112612834054e435e4e80cb902eb48dd36b79fb1d4cb5a0b0e95');
        
    //     this.ws.onopen = () => {
    //       console.log('WebSocket connected');
          
    //       // Gửi tin nhắn đầu tiên hoặc gọi hàm khác nếu cần
    //       this.sendMessage('Initial message');
    //     };
    
    //     this.ws.onmessage = (event) => {
    //       const newData = JSON.parse(event.data);
    //       console.log('Received from WebSocket:', newData);
    //       this.data = newData;
    //     };
    
    //     // this.ws.onclose = () => {
    //     //   console.log('WebSocket disconnected');
    //     // };
    //   } else {
    //     console.log('WebSocket is already initialized.');
    //   }
    // },
     
    async sendRequest(inputData, userID) {
      this.isError = false;
      this.isLoading = true;
      this.sendMessage(inputData, "");
      this.userInput = "";
      try {
        const response = await axios.post(
          "https://api-staging.fptplay.net/api/v7.1_w/bigdata/hermes/v1/bot/messages/add",
          {
            query: inputData,
            profile_id: userID,
            session_uuid: userID,
            tw_ws: true,
          },
          {
            headers: {
              accept: "application/jsonL",
              //"Client-Id": userID,

              "Content-Type": "application/json",
            },
          }
        );
        this.responseData = response.data.data;

        //this.messagesArray.push(this.responseData);
        //console.log(this.newMessageArray[this.newMessageArray.length - 1]);
        this.newMessageArray[this.newMessageArray.length - 1] = {
          userMessage: inputData,
          botMessage: [this.responseData.answer.text],
          timestamp: this.responseData.timestamp,
          videos: this.responseData.answer.videos,
          images: this.responseData.answer.images,
          contents: this.responseData.answer.contents,
          urls: this.responseData.answer.urls,
          chatID: this.responseData.message_uuid,
        };

        // if (this.ws) {
        //   console.log("WebSocket readyState:", this.ws.readyState);
        //   if (this.ws.readyState === WebSocket.OPEN) {
        //     this.ws.send(JSON.stringify(this.responseData));
        //     console.log("Data sent via WebSocket:", this.responseData);
        //   } else {
        //     console.warn("WebSocket is not open. Current state:", this.ws.readyState);
        //   }
        // } else {
        //   console.error("WebSocket has not been initialized.");
        // }

        this.userInput = "";
      } catch (error) {
        
        console.error("Lỗi khi gọi API:", error);
        this.isError = true;
      } finally {
        console.log("Dữ liệu trả về:", this.responseData);
        this.isLoading = false;
      }
    },

    sendMessage(userChat, botChat) {
      // this.setSampleChatTime();
      // if (this.ws && this.ws.readyState === WebSocket.OPEN) {
      //   this.ws.send(userChat, botChat);
        this.newMessageArray.push({
        userMessage: userChat,
        botMessage: [botChat],
        timestamp:this.sampleChatTimeStamp,
        videos: [],
        images: [],
        contents: [],
        urls: [],
        chatID: "",
      });
      // this.userInput = "";
      // } else {
      //   console.error('WebSocket has not been initialized or is not open.');
      //   // Có thể gọi lại initWebSocket nếu cần
      //   this.initWebSocket();
      // }
      
    },

    // sendMessage(userChat, botChat) {
    //   this.setSampleChatTime();
    //   this.newMessageArray.push({
    //     userMessage: userChat,
    //     botMessage: [botChat],
    //     timestamp:this.sampleChatTimeStamp,
    //     videos: [],
    //     images: [],
    //     contents: [],
    //     urls: [],
    //     chatID: "",
    //   });
    //   this.userInput = "";
      
    // },

    actions: {
      delayMessageInterval() {
        // Đặt độ trễ thời gian (ví dụ 1 giây)
        const delay = 1000; 
        setTimeout(() => {
          // Thực hiện các hành động cần thiết sau khi có độ trễ
          this.setSampleChatTime(); // Gọi hàm setSampleChatTime
          // Bạn có thể thêm các hành động khác ở đây
        }, 3000);
      },
      // Các hàm khác...
    },

    async getChatHistory(userID) {
      if (this.historyData.length === 0) {
        try {
          const chatHistory = await axios.put(
            "https://api-staging.fptplay.net/api/v7.1_w/bigdata/hermes/v1/bot/messages/get",
            {
              limit: 10,
              offset: 0,
              profile_id: userID,
              session_uuid: userID,
            },
            {
              headers: {
                accept: "application/jsonL",
                //"Client-Id": userID,

                "Content-Type": "application/json",
              },
            }
          );

          this.historyData = chatHistory.data.data.messages;
          console.log(this.historyData);

          for (let i = this.historyData.length - 1; i >= 0; i--) {
            this.newMessageArray.push({
              userMessage: this.historyData[i].query,
              botMessage: [this.historyData[i].answer.text],
              timestamp: this.historyData[i].timestamp,
              videos: this.historyData[i].answer.videos,
              images: this.historyData[i].answer.images,
              contents: this.historyData[i].answer.contents,
              urls: this.historyData[i].answer.urls,
              chatID: this.historyData[i].message_uuid,
            });
          }
          console.log(this.historyData);
        } catch (error) {
          console.error("Lỗi khi gọi API:", error);
        }
      }
    },

    async messageEvaluate(evaluate, botMessageID, userID) {
      try {
        await axios.put(
          "https://api-staging.fptplay.net/api/v7.1_w/bigdata/hermes/v1/bot/messages/" +
            botMessageID +
            "/evaluate",
          {
            is_liked: evaluate,
            comment: this.userComment,
            profile_id: userID,
            session_uuid: userID,
          },
          {
            headers: {
              accept: "application/jsonL",
              //"Client-Id": userID,

              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.error("Lỗi khi gọi API:", error);
      }
    },

    setInput(input) {
      this.userInput = input;
    },

    setSampleChatTime(){
      this.sampleChatTimeStamp = Date.now();
      console.log("Created", this.sampleChatTimeStamp);
    },

    emptyArray() {
      this.setSampleChatTime()
      this.newMessageArray = [
        {
          userMessage: "",
          botMessage: [],
          timestamp: this.sampleChatTimeStamp,
          videos: [],
          images: [],
          contents: [],
          link: [],
        },
      ];
    },

    loaderController(){
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false; 
      }, 2000)
    },
  },
});
