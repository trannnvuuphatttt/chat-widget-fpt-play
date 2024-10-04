import { defineStore } from "pinia";
import { v4 as uuidv4 } from "uuid";
import axios from "axios";

export const useMessage = defineStore("message", {
  state: () => ({
    userInput: "",
    messagesArray: [],
    sessionID: "",
    responseData: [],
    newMessageArray: [
      {
        userMessage: "",
        botMessage: "",
        timeStamp: null,
        videos: [],
        images: [],
        contents: [],
        link: "",
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
        this.responseData = response.data;

        console.log(response.data.data.answer.text);
        this.messagesArray.push(this.responseData);
        this.newMessageArray.push({
          userMessage: this.responseData.data.query,
          botMessage: this.responseData.data.answer.text,
          timeStamp: this.responseData.data.timeStamp,
          videos: this.responseData.data.answer.videos,
          images: this.responseData.data.answer.images,
          contents: this.responseData.data.answer.contents,
          link: "",
          chatID: this.responseData.data.message_uuid,
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
        link: "",
        chatID: "",
      });
    },
    async getChatHistory(userID) {
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

        this.messagesArray = chatHistory.data.data.messages;
        console.log(this.messagesArray);
      } catch (error) {
        console.log("Lỗi khi gọi API:", error);
      }
    },
    async messageEvaluate(evaluate, evaMessage, botMessageID, userID) {
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
        console.log(this.messagesArray);
      } catch {}
    },
    setInput(input) {
      this.userInput = input;
    },
    emptyArray() {
      this.messagesArray = [];
    },
  },
});
