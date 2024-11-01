import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";
import { data } from "autoprefixer";

export const useMessage = defineStore("message", {
  state: () => ({
    isError: false,
    userInput: "",
    userComment: "",
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
      this.setSampleChatTime();
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
      this.userInput = "";
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
          botMessage: [
            "Xin chào 👋 ! Tôi là trợ lý thông minh của bạn.",
            "Tôi có thể giúp bạn tìm kiếm tất cả các nội dung liên quan đến FPT Play.",
            "Vậy tôi có thể giúp gì cho bạn?",
          ],

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
