import { defineStore } from 'pinia';
import axios from 'axios';
import { v4 as uuidv4 } from 'uuid';

export const useMessage = defineStore('message', {
  state: () => ({
    isError: false,
    userInput: '',
    userComment: '',
    ws: null,
    wsConnected: false,
    //messagesArray: [],
    sampleChatTimeStamp: null,
    sessionID: '',
    responseData: [],
    historyData: [],
    newMessageArray: [
      {
        userMessage: '',
        botMessage: [
          'Xin chào 👋 ! Tôi là trợ lý thông minh của bạn.',
          'Tôi có thể giúp bạn tìm kiếm tất cả các nội dung liên quan đến FPT Play.',
          'Vậy tôi có thể giúp gì cho bạn?',
        ],
        timestamp: null,
        videos: [],
        images: [],
        contents: [],
        urls: [],
      },
    ],
    botMessageID: '',
    isLoading: false,
    isAlreadyJoinedChatRoom: false,
    isWaitingSocket: false,
  }),
  actions: {
    async handleSocket() {
      const channelId = localStorage.getItem('chatSession');
      if (!channelId) {
        return;
      }
      const parsed = JSON.parse(channelId);

      try {
        if (parsed?.value) {
          const ws = new WebSocket(
            `${
              import.meta.env.VITE_APP_WS_DOMAIN
            }/livechat/${parsed?.value.replaceAll('"', '')}?token=${
              import.meta.env.VITE_APP_WS_TOKEN
            }`,
          );

          ws.onopen = () => {
            this.isWaitingSocket = true;
          };

          // Event handler for when a message is received from the server
          ws.onmessage = async (event) => {
            console.log('Message socket: ', event.data);
            // if (typeof event.data === 'string') {
            //   const parsed = JSON.parse(event.data);
            //   if (parsed?.type === 'endAnswer') {
            //     ws.close();
            //   }
            // } else if (typeof event.data === 'object') {
            //   if (event.data?.type === 'endAnswer') {
            //     ws.close();
            //   } else {

            //   }
            // }
            const lastMassage = {
              ...this.newMessageArray[this.newMessageArray.length - 1],
            };
            console.log('lastMassage :>> ', lastMassage);

            await new Promise((resolve) => {
              setTimeout(() => {
                resolve();
              }, 10000);
            });

            // if (event?.data?.type)
            const parsed = JSON.parse(event.data);
            console.log('parsed :>> ', parsed);
            if (parsed) {
              // create-tạo mới/update-cập nhật/endAnswer-chatbot kết thúc câu trả lời
              console.log('this.newMessageArray :>> ', this.newMessageArray);
              this.newMessageArray = this.newMessageArray.map((item, index) => {
                if (index < this.newMessageArray.length - 1) {
                  return item;
                } else {
                  let msg = item.botMessage[0];
                  if (parsed?.type === 'create') {
                    msg = [parsed?.msg];
                  } else {
                    msg = [msg + parsed?.msg];
                  }
                  return { ...item, botMessage: [msg] };
                }
              });
              if (parsed?.type === 'endAnswer') {
                ws.close();
              }
            }
          };

          // Event handler for when the connection is closed
          ws.onclose = () => {
            console.log('WebSocket connection closed');
            this.isWaitingSocket = false;
          };

          // Event handler for errors
          ws.onerror = (error) => {
            console.error('WebSocket error:', error);
            ws.close();
            this.isWaitingSocket = false;
          };
        }
      } catch (error) {}
    },

    async sendRequest(inputData, pfID, ssID) {
      // add
      // join
      // socket
      this.isError = false;
      this.isLoading = true;
      this.sendMessage(inputData, '');
      this.userInput = '';

      try {
        const response = await axios.post(
          `${
            import.meta.env.VITE_APP_API_DOMAIN
          }/api/v7.1_w/bigdata/hermes/v1/bot/messages/add`,
          {
            query: inputData,
            profile_id: pfID,
            session_uuid: ssID,
            to_ws: true,
          },
          {
            headers: {
              accept: 'application/json',
              //"Client-Id": userID,

              'Content-Type': 'application/json',
            },
          },
        );
        this.responseData = response.data.data;

        //this.messagesArray.push(this.responseData);
        //console.log(this.newMessageArray[this.newMessageArray.length - 1]);
        // this.newMessageArray[this.newMessageArray.length - 1] = {
        //   userMessage: inputData,
        //   botMessage: [this.responseData.answer.text],
        //   timestamp: this.responseData.timestamp,
        //   videos: this.responseData.answer.videos,
        //   images: this.responseData.answer.images,
        //   contents: this.responseData.answer.contents,
        //   urls: this.responseData.answer.urls,
        //   chatID: this.responseData.message_uuid,
        // };

        this.newMessageArray = this.newMessageArray.map((item, index) => {
          if (index < this.newMessageArray.length - 1) {
            return item;
          } else {
            return {
              userMessage: inputData,
              botMessage: [this.responseData.answer.text],
              timestamp: this.responseData.timestamp,
              videos: this.responseData.answer.videos,
              images: this.responseData.answer.images,
              contents: this.responseData.answer.contents,
              urls: this.responseData.answer.urls,
              chatID: this.responseData.message_uuid,
            };
          }
        });

        this.userInput = '';

        this.handleSocket();
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
        this.isError = true;
      } finally {
        console.log('Dữ liệu trả về:', this.responseData);
        this.isLoading = false;
      }
    },

    sendMessage(userChat, botChat) {
      console.log('sendMessage :>> ', 1);
      this.newMessageArray.push({
        userMessage: userChat,
        botMessage: [botChat],
        timestamp: this.sampleChatTimeStamp,
        videos: [],
        images: [],
        contents: [],
        urls: [],
        chatID: uuidv4(),
      });
    },

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

    async getChatHistory(pID, userID) {
      if (this.historyData.length === 0) {
        try {
          const chatHistory = await axios.put(
            `${
              import.meta.env.VITE_APP_API_DOMAIN
            }/api/v7.1_w/bigdata/hermes/v1/bot/messages/get`,
            {
              limit: 10,
              offset: 0,
              profile_id: pID,
              session_uuid: userID,
            },
            {
              headers: {
                accept: 'application/jsonL',
                //"Client-Id": userID,

                'Content-Type': 'application/json',
              },
            },
          );

          this.historyData = chatHistory.data.data.messages;

          console.log('this.newMessageArray :>> ', this.newMessageArray);

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
        } catch (error) {
          console.error('Lỗi khi gọi API:', error);
        }
      }
    },

    async messageEvaluate(evaluate, botMessageID, userID) {
      try {
        await axios.put(
          `${
            import.meta.env.VITE_APP_API_DOMAIN
          }/api/v7.1_w/bigdata/hermes/v1/bot/messages/${botMessageID}/evaluate`,
          {
            is_liked: evaluate,
            comment: this.userComment,
            profile_id: userID,
            session_uuid: userID,
          },
          {
            headers: {
              accept: 'application/jsonL',
              //"Client-Id": userID,

              'Content-Type': 'application/json',
            },
          },
        );
      } catch (error) {
        console.error('Lỗi khi gọi API:', error);
      }
    },

    setInput(input) {
      this.userInput = input;
    },

    setSampleChatTime() {
      this.sampleChatTimeStamp = Date.now();
    },

    emptyArray() {
      this.setSampleChatTime();
      this.newMessageArray = [
        {
          userMessage: '',
          botMessage: [],
          timestamp: this.sampleChatTimeStamp,
          videos: [],
          images: [],
          contents: [],
          link: [],
        },
      ];
    },

    loaderController() {
      this.isLoading = true;
      setTimeout(() => {
        this.isLoading = false;
      }, 2000);
    },
  },
});
