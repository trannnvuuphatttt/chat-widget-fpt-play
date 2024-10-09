import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const useMessage = defineStore("message", {
  state: () => ({
    userInput: "",
    //messagesArray: [],
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

        timeStamp: null,
        videos: [],
        images: [],
        contents: [],
        urls: [],
      },
    ],
    botMessageID: "",
  }),
  actions: {
    async sendRequest(inputData, userID) {
      try {
        const response = await axios.post(
          "https://bigdata-local-staging.fptplay.net/hermes/v1/bot/messages/add",
          {
            query: inputData,
            profile_id: userID,
            session_uuid: userID,
          },
          {
            headers: {
              accept: "application/jsonL",
              "Client-Id": userID,

              "Content-Type": "application/json",
            },
          }
        );
        this.responseData = response.data.data;

        //console.log(response.data.data.answer.text);
        //this.messagesArray.push(this.responseData);

        this.newMessageArray.push({
          userMessage: inputData,
          botMessage: [this.responseData.answer.text],
          timestamp: this.responseData.timestamp,
          videos: this.responseData.answer.videos,
          images: this.responseData.answer.images,
          contents: this.responseData.answer.contents,
          urls: this.responseData.answer.urls,
          chatID: this.responseData.message_uuid,
        });
        console.log(this.newMessageArray);
        this.userInput = "";
      } catch (error) {
        console.log("Lỗi khi gọi API:", error);
      }
    },
    sendMessage(userChat, botChat) {
      this.newMessageArray.push({
        userMessage: userChat,
        botMessage: botChat,
        timeStamp: Date.now() / 1000,
        videos: [],
        images: [],
        contents: [],
        urls: [],
        chatID: "",
      });
      this.userInput = "";
    },
    async getChatHistory(userID) {
      console.log(userID);
      if (this.historyData.length === 0) {
        try {
          const chatHistory = await axios.put(
            "https://bigdata-local-staging.fptplay.net/hermes/v1/bot/messages/get",
            {
              limit: 3,
              offset: 0,
              profile_id: userID,
              session_uuid: userID,
            },
            {
              headers: {
                accept: "application/jsonL",
                "Client-Id": userID,

                "Content-Type": "application/json",
              },
            }
          );
          //this.newMessageArray = chatHistory.data.data.messages;
          this.historyData = chatHistory.data.data.messages;
          // console.log(this.historyData);
          // console.log(chatHistory.data.data.messages[0].query);
          // console.log(chatHistory.data.data.messages.length);
          // console.log(this.historyData[0].timestamp);
          for (let i = 0; i < this.historyData.length; i++) {
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
          console.log("Lỗi khi gọi API:", error);
        }
      }
    },
    async messageEvaluate(evaluate, evaMessage, botMessageID, userID) {
      console.log(evaluate, evaMessage, botMessageID, userID);
      try {
        await axios.put(
          "https://bigdata-local-staging.fptplay.net/hermes/v1/bot/messages/" +
            botMessageID +
            "/evaluate",
          {
            is_liked: evaluate,
            comment: evaMessage,
            profile_id: userID,
            session_uuid: userID,
          },
          {
            headers: {
              accept: "application/jsonL",
              "Client-Id": userID,

              "Content-Type": "application/json",
            },
          }
        );
      } catch (error) {
        console.log("Lỗi khi gọi API:", error);
      }
    },
    setInput(input) {
      this.userInput = input;
    },
    emptyArray() {
      this.newMessageArray = [
        {
          userMessage: "",
          botMessage: [
            "Xin chào 👋 ! Tôi là trợ lý thông minh của bạn.",
            "Tôi có thể giúp bạn tìm kiếm tất cả các nội dung liên quan đến FPT Play.",
            "Vậy tôi có thể giúp gì cho bạn?",
          ],

          timeStamp: null,
          videos: [],
          images: [],
          contents: [],
          link: [],
        },
      ];
    },
  },
});
